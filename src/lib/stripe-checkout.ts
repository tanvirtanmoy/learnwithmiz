/**
 * Stripe Checkout service — creates secure checkout sessions for both
 * one-time payment and 3-month installment flows.
 */

import stripe from '@/lib/stripe';
import { COURSE_CONFIG } from '@/lib/course-config';

const APP_BASE_URL = process.env.APP_BASE_URL || 'http://localhost:3000';

interface CreateCheckoutOptions {
  paymentOption: 'full_payment' | 'installment_3_month';
  locale?: string;
  customerEmail?: string;
}

/**
 * Create a Stripe Checkout Session for one-time full payment.
 */
async function createFullPaymentSession(opts: CreateCheckoutOptions) {
  const priceId = process.env.STRIPE_PRICE_ID_FULL_PAYMENT;
  if (!priceId) throw new Error('STRIPE_PRICE_ID_FULL_PAYMENT is not configured');

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    payment_method_types: ['card', 'ideal'],
    line_items: [{ price: priceId, quantity: 1 }],
    customer_email: opts.customerEmail || undefined,
    locale: (opts.locale === 'ja' ? 'ja' : 'auto') as 'ja' | 'auto',
    billing_address_collection: 'auto',
    metadata: {
      course_code: COURSE_CONFIG.code,
      instructor: COURSE_CONFIG.instructor,
      payment_option: 'full_payment',
      locale: opts.locale || 'ja',
    },
    success_url: `${APP_BASE_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${APP_BASE_URL}/checkout/cancel`,
    custom_fields: [
      {
        key: 'full_name',
        label: { type: 'custom', custom: opts.locale === 'en' ? 'Full Name' : 'お名前（フルネーム）' },
        type: 'text',
      },
    ],
  });

  return session;
}

/**
 * Create a Stripe Checkout Session for the 3-month installment subscription.
 * After checkout, we attach a subscription schedule that auto-cancels after 3 months.
 */
async function createInstallmentSession(opts: CreateCheckoutOptions) {
  const priceId = process.env.STRIPE_PRICE_ID_MONTHLY_INSTALLMENT;
  if (!priceId) throw new Error('STRIPE_PRICE_ID_MONTHLY_INSTALLMENT is not configured');

  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    payment_method_types: ['card', 'ideal'],
    line_items: [{ price: priceId, quantity: 1 }],
    customer_email: opts.customerEmail || undefined,
    locale: (opts.locale === 'ja' ? 'ja' : 'auto') as 'ja' | 'auto',
    billing_address_collection: 'auto',
    subscription_data: {
      metadata: {
        course_code: COURSE_CONFIG.code,
        instructor: COURSE_CONFIG.instructor,
        payment_option: 'installment_3_month',
        locale: opts.locale || 'ja',
        installment_limit: String(COURSE_CONFIG.pricing.installment.months),
      },
    },
    metadata: {
      course_code: COURSE_CONFIG.code,
      instructor: COURSE_CONFIG.instructor,
      payment_option: 'installment_3_month',
      locale: opts.locale || 'ja',
    },
    success_url: `${APP_BASE_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${APP_BASE_URL}/checkout/cancel`,
    custom_fields: [
      {
        key: 'full_name',
        label: { type: 'custom', custom: opts.locale === 'en' ? 'Full Name' : 'お名前（フルネーム）' },
        type: 'text',
      },
    ],
  });

  return session;
}

/**
 * After a subscription checkout succeeds, create a subscription schedule
 * that limits the subscription to exactly 3 billing cycles and then cancels.
 */
export async function attachSubscriptionSchedule(subscriptionId: string) {
  // Retrieve the subscription to get current details
  const subscription = await stripe.subscriptions.retrieve(subscriptionId);

  const priceId = process.env.STRIPE_PRICE_ID_MONTHLY_INSTALLMENT;
  if (!priceId) throw new Error('STRIPE_PRICE_ID_MONTHLY_INSTALLMENT is not configured');

  // Create a schedule from the existing subscription
  const schedule = await stripe.subscriptionSchedules.create({
    from_subscription: subscriptionId,
  });

  // Calculate the end date: 3 months from subscription start
  const startDate = subscription.start_date;
  if (!startDate) throw new Error('Subscription has no start_date');

  // Phase 1: active for 3 months, then cancel
  // Calculate 3 months from start_date as unix timestamp
  const startDateObj = new Date(startDate * 1000);
  const endDateObj = new Date(startDateObj);
  endDateObj.setMonth(endDateObj.getMonth() + COURSE_CONFIG.pricing.installment.months);
  const endTimestamp = Math.floor(endDateObj.getTime() / 1000);

  // Update the schedule: single phase that ends after 3 months
  const updatedSchedule = await stripe.subscriptionSchedules.update(schedule.id, {
    end_behavior: 'cancel', // auto-cancel when schedule ends
    phases: [
      {
        items: [{ price: priceId, quantity: 1 }],
        start_date: startDate,
        end_date: endTimestamp,
      },
    ],
  });

  return updatedSchedule;
}

/**
 * Main entry point to create a checkout session.
 */
export async function createCheckoutSession(opts: CreateCheckoutOptions) {
  if (opts.paymentOption === 'full_payment') {
    return createFullPaymentSession(opts);
  }
  return createInstallmentSession(opts);
}

/**
 * Create a Stripe Customer Portal session for billing management.
 */
export async function createCustomerPortalSession(stripeCustomerId: string) {
  const portalConfigId = process.env.STRIPE_CUSTOMER_PORTAL_CONFIGURATION_ID;

  const session = await stripe.billingPortal.sessions.create({
    customer: stripeCustomerId,
    return_url: `${APP_BASE_URL}/billing`,
    ...(portalConfigId ? { configuration: portalConfigId } : {}),
  });

  return session;
}
