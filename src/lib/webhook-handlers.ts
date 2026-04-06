/**
 * Webhook processing service — handles Stripe webhook events to create
 * and update students, enrollments, billing profiles, and payment records.
 *
 * All record creation/updates happen here (not from client redirects).
 */

import Stripe from 'stripe';
import prisma from '@/lib/prisma';
import { COURSE_CONFIG } from '@/lib/course-config';
import { attachSubscriptionSchedule } from '@/lib/stripe-checkout';

// ─── Idempotency ────────────────────────────────────────────────────────────

export async function isEventProcessed(stripeEventId: string): Promise<boolean> {
  const existing = await prisma.processedWebhookEvent.findUnique({
    where: { stripeEventId },
  });
  return !!existing;
}

async function markEventProcessed(stripeEventId: string, eventType: string) {
  await prisma.processedWebhookEvent.create({
    data: { stripeEventId, eventType },
  });
}

// ─── Helpers ────────────────────────────────────────────────────────────────

function addMonths(date: Date, months: number): Date {
  const result = new Date(date);
  result.setMonth(result.getMonth() + months);
  return result;
}

function getCustomerName(session: Stripe.Checkout.Session): string {
  // Try custom_fields first (our 'full_name' field)
  const nameField = session.custom_fields?.find((f) => f.key === 'full_name');
  if (nameField?.text?.value) return nameField.text.value;

  // Fallback to customer_details
  if (session.customer_details?.name) return session.customer_details.name;

  return 'Unknown';
}

/**
 * Extract subscription ID from a Stripe Invoice (v22 / basil API).
 * In newer Stripe versions, subscription is under parent.subscription_details.
 */
function getSubscriptionIdFromInvoice(invoice: Stripe.Invoice): string | null {
  const subDetails = invoice.parent?.subscription_details;
  if (!subDetails?.subscription) return null;
  return typeof subDetails.subscription === 'string'
    ? subDetails.subscription
    : subDetails.subscription.id;
}

// ─── Checkout Session Completed ─────────────────────────────────────────────

export async function handleCheckoutSessionCompleted(event: Stripe.Event) {
  const session = event.data.object as Stripe.Checkout.Session;
  const eventId = event.id;

  if (await isEventProcessed(eventId)) return;

  const email = session.customer_details?.email;
  if (!email) {
    console.error('Checkout session has no customer email', session.id);
    return;
  }

  const name = getCustomerName(session);
  const locale = session.metadata?.locale || 'ja';
  const paymentOption = session.metadata?.payment_option as 'full_payment' | 'installment_3_month';
  const now = new Date();
  const courseExpiryDate = addMonths(now, COURSE_CONFIG.validityMonths);

  // Upsert student
  const student = await prisma.student.upsert({
    where: { email },
    update: { name, locale, updatedAt: now },
    create: { name, email, locale },
  });

  // Check for existing active enrollment for same course (prevents duplicates)
  const existingEnrollment = await prisma.enrollment.findFirst({
    where: {
      studentId: student.id,
      courseCode: COURSE_CONFIG.code,
      status: { in: ['active', 'completed'] },
    },
  });

  if (existingEnrollment) {
    console.warn(`Student ${student.email} already has an active enrollment. Skipping duplicate.`);
    await markEventProcessed(eventId, event.type);
    return;
  }

  if (session.mode === 'payment' && paymentOption === 'full_payment') {
    // ── One-time payment ──────────────────────────────────────────────
    const enrollment = await prisma.enrollment.create({
      data: {
        studentId: student.id,
        courseCode: COURSE_CONFIG.code,
        instructorName: COURSE_CONFIG.instructor,
        paymentOption: 'full_payment',
        status: 'active',
        courseStartDate: now,
        courseExpiryDate,
        totalLessons: COURSE_CONFIG.totalLessons,
        lessonsUsed: 0,
        refundPolicyVersion: COURSE_CONFIG.refundPolicyVersion,
      },
    });

    // Create billing profile
    const stripeCustomerId = typeof session.customer === 'string'
      ? session.customer
      : session.customer?.id || null;

    await prisma.billingProfile.upsert({
      where: { studentId: student.id },
      update: {
        stripeCustomerId,
        stripeCheckoutSessionId: session.id,
        paymentStatus: 'paid_in_full',
      },
      create: {
        studentId: student.id,
        stripeCustomerId,
        stripeCheckoutSessionId: session.id,
        paymentStatus: 'paid_in_full',
        installmentsPaidCount: 0,
        installmentLimit: 1,
        currency: 'eur',
      },
    });

    // Payment record
    const paymentIntentId = typeof session.payment_intent === 'string'
      ? session.payment_intent
      : session.payment_intent?.id || null;

    await prisma.paymentRecord.create({
      data: {
        studentId: student.id,
        enrollmentId: enrollment.id,
        stripeEventId: eventId,
        stripePaymentIntentId: paymentIntentId,
        amount: session.amount_total || COURSE_CONFIG.pricing.fullPayment.amount,
        currency: 'eur',
        type: 'one_time',
        status: 'paid',
        paidAt: now,
        rawMetadata: session.metadata as Record<string, string>,
      },
    });

  } else if (session.mode === 'subscription' && paymentOption === 'installment_3_month') {
    // ── Subscription (installment) ────────────────────────────────────
    const stripeCustomerId = typeof session.customer === 'string'
      ? session.customer
      : session.customer?.id || null;

    const subscriptionId = typeof session.subscription === 'string'
      ? session.subscription
      : session.subscription?.id || null;

    const enrollment = await prisma.enrollment.create({
      data: {
        studentId: student.id,
        courseCode: COURSE_CONFIG.code,
        instructorName: COURSE_CONFIG.instructor,
        paymentOption: 'installment_3_month',
        status: 'active',
        courseStartDate: now,
        courseExpiryDate,
        totalLessons: COURSE_CONFIG.totalLessons,
        lessonsUsed: 0,
        refundPolicyVersion: COURSE_CONFIG.refundPolicyVersion,
      },
    });

    // Attach subscription schedule for auto-cancel after 3 months
    let scheduleId: string | null = null;
    if (subscriptionId) {
      try {
        const schedule = await attachSubscriptionSchedule(subscriptionId);
        scheduleId = schedule.id;
      } catch (err) {
        console.error('Failed to create subscription schedule:', err);
        // Continue — the subscription exists, we can handle this manually if needed
      }
    }

    await prisma.billingProfile.upsert({
      where: { studentId: student.id },
      update: {
        stripeCustomerId,
        stripeSubscriptionId: subscriptionId,
        stripeSubscriptionScheduleId: scheduleId,
        stripeCheckoutSessionId: session.id,
        paymentStatus: 'installment_active',
        installmentsPaidCount: 1, // First payment collected at checkout
      },
      create: {
        studentId: student.id,
        stripeCustomerId,
        stripeSubscriptionId: subscriptionId,
        stripeSubscriptionScheduleId: scheduleId,
        stripeCheckoutSessionId: session.id,
        paymentStatus: 'installment_active',
        installmentsPaidCount: 1,
        installmentLimit: COURSE_CONFIG.pricing.installment.months,
        currency: 'eur',
      },
    });

    // Payment record for first installment
    await prisma.paymentRecord.create({
      data: {
        studentId: student.id,
        enrollmentId: enrollment.id,
        stripeEventId: eventId,
        amount: COURSE_CONFIG.pricing.installment.amountPerMonth,
        currency: 'eur',
        type: 'installment',
        status: 'paid',
        paidAt: now,
        rawMetadata: session.metadata as Record<string, string>,
      },
    });
  }

  await markEventProcessed(eventId, event.type);
}

// ─── Invoice Paid (recurring) ───────────────────────────────────────────────

export async function handleInvoicePaid(event: Stripe.Event) {
  const invoice = event.data.object as Stripe.Invoice;
  const eventId = event.id;

  if (await isEventProcessed(eventId)) return;

  // Skip the first invoice (already handled in checkout.session.completed)
  if (invoice.billing_reason === 'subscription_create') {
    await markEventProcessed(eventId, event.type);
    return;
  }

  const subscriptionId = getSubscriptionIdFromInvoice(invoice);

  if (!subscriptionId) {
    await markEventProcessed(eventId, event.type);
    return;
  }

  // Find billing profile by subscription ID
  const billingProfile = await prisma.billingProfile.findFirst({
    where: { stripeSubscriptionId: subscriptionId },
    include: { student: { include: { enrollments: true } } },
  });

  if (!billingProfile) {
    console.error('No billing profile found for subscription:', subscriptionId);
    await markEventProcessed(eventId, event.type);
    return;
  }

  // Increment installments paid
  const newCount = billingProfile.installmentsPaidCount + 1;
  await prisma.billingProfile.update({
    where: { id: billingProfile.id },
    data: {
      installmentsPaidCount: newCount,
      paymentStatus: newCount >= billingProfile.installmentLimit
        ? 'paid_in_full'
        : 'installment_active',
    },
  });

  // Find the active enrollment for payment record
  const enrollment = billingProfile.student.enrollments.find(
    (e: { courseCode: string; status: string }) => e.courseCode === COURSE_CONFIG.code && e.status === 'active'
  );

  if (enrollment) {
    await prisma.paymentRecord.create({
      data: {
        studentId: billingProfile.studentId,
        enrollmentId: enrollment.id,
        stripeEventId: eventId,
        stripeInvoiceId: invoice.id,
        amount: invoice.amount_paid || 0,
        currency: 'eur',
        type: 'installment',
        status: 'paid',
        paidAt: new Date(),
        rawMetadata: (invoice.metadata as Record<string, string>) ?? undefined,
      },
    });
  }

  await markEventProcessed(eventId, event.type);
}

// ─── Invoice Payment Failed ─────────────────────────────────────────────────

export async function handleInvoicePaymentFailed(event: Stripe.Event) {
  const invoice = event.data.object as Stripe.Invoice;
  const eventId = event.id;

  if (await isEventProcessed(eventId)) return;

  const subscriptionId = getSubscriptionIdFromInvoice(invoice);

  if (!subscriptionId) {
    await markEventProcessed(eventId, event.type);
    return;
  }

  const billingProfile = await prisma.billingProfile.findFirst({
    where: { stripeSubscriptionId: subscriptionId },
    include: { student: { include: { enrollments: true } } },
  });

  if (billingProfile) {
    // Mark payment issue — do NOT auto-revoke enrollment
    await prisma.billingProfile.update({
      where: { id: billingProfile.id },
      data: { paymentStatus: 'payment_failed' },
    });

    // Also mark enrollment for admin visibility
    const enrollment = billingProfile.student.enrollments.find(
      (e: { courseCode: string; status: string }) => e.courseCode === COURSE_CONFIG.code && e.status === 'active'
    );
    if (enrollment) {
      await prisma.enrollment.update({
        where: { id: enrollment.id },
        data: { status: 'payment_issue' },
      });
    }

    // Record the failed payment
    const enrollmentId = enrollment?.id || billingProfile.student.enrollments[0]?.id;
    if (enrollmentId) {
      await prisma.paymentRecord.create({
        data: {
          studentId: billingProfile.studentId,
          enrollmentId,
          stripeEventId: eventId,
          stripeInvoiceId: invoice.id,
          amount: invoice.amount_due || 0,
          currency: 'eur',
          type: 'installment',
          status: 'failed',
          rawMetadata: (invoice.metadata as Record<string, string>) ?? undefined,
        },
      });
    }
  }

  await markEventProcessed(eventId, event.type);
}

// ─── Subscription Updated ───────────────────────────────────────────────────

export async function handleSubscriptionUpdated(event: Stripe.Event) {
  const subscription = event.data.object as Stripe.Subscription;
  const eventId = event.id;

  if (await isEventProcessed(eventId)) return;

  const billingProfile = await prisma.billingProfile.findFirst({
    where: { stripeSubscriptionId: subscription.id },
  });

  if (billingProfile) {
    // Update payment status based on subscription status
    let paymentStatus = billingProfile.paymentStatus;

    if (subscription.status === 'past_due') {
      paymentStatus = 'past_due';
    } else if (subscription.status === 'canceled') {
      // Check if all installments were paid
      if (billingProfile.installmentsPaidCount >= billingProfile.installmentLimit) {
        paymentStatus = 'paid_in_full';
      } else {
        paymentStatus = 'canceled';
      }
    } else if (subscription.status === 'active') {
      paymentStatus = 'installment_active';
    }

    await prisma.billingProfile.update({
      where: { id: billingProfile.id },
      data: { paymentStatus },
    });
  }

  await markEventProcessed(eventId, event.type);
}

// ─── Subscription Deleted ───────────────────────────────────────────────────

export async function handleSubscriptionDeleted(event: Stripe.Event) {
  const subscription = event.data.object as Stripe.Subscription;
  const eventId = event.id;

  if (await isEventProcessed(eventId)) return;

  const billingProfile = await prisma.billingProfile.findFirst({
    where: { stripeSubscriptionId: subscription.id },
    include: { student: { include: { enrollments: true } } },
  });

  if (billingProfile) {
    const allPaid = billingProfile.installmentsPaidCount >= billingProfile.installmentLimit;

    await prisma.billingProfile.update({
      where: { id: billingProfile.id },
      data: {
        paymentStatus: allPaid ? 'paid_in_full' : 'canceled',
      },
    });

    // If not all paid, mark enrollment but don't revoke
    if (!allPaid) {
      const enrollment = billingProfile.student.enrollments.find(
        (e: { courseCode: string; status: string }) => e.courseCode === COURSE_CONFIG.code && e.status === 'active'
      );
      if (enrollment) {
        await prisma.enrollment.update({
          where: { id: enrollment.id },
          data: { status: 'payment_issue' },
        });
      }
    }
  }

  await markEventProcessed(eventId, event.type);
}
