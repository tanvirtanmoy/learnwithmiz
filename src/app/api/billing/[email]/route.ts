/**
 * GET /api/billing/[email]
 * Returns billing summary for a given student email.
 */

import { NextRequest } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ email: string }> }
) {
  const { email } = await params;
  const decodedEmail = decodeURIComponent(email);

  try {
    const student = await prisma.student.findUnique({
      where: { email: decodedEmail },
      include: {
        enrollments: {
          orderBy: { createdAt: 'desc' },
          take: 1,
        },
        billingProfile: true,
        paymentRecords: {
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    if (!student) {
      return Response.json({ error: 'Student not found.' }, { status: 404 });
    }

    const enrollment = student.enrollments[0] || null;
    const billing = student.billingProfile;

    return Response.json({
      student: {
        name: student.name,
        email: student.email,
        locale: student.locale,
      },
      enrollment: enrollment
        ? {
            id: enrollment.id,
            paymentOption: enrollment.paymentOption,
            status: enrollment.status,
            courseStartDate: enrollment.courseStartDate,
            courseExpiryDate: enrollment.courseExpiryDate,
            totalLessons: enrollment.totalLessons,
            lessonsUsed: enrollment.lessonsUsed,
            lessonsRemaining: enrollment.totalLessons - enrollment.lessonsUsed,
          }
        : null,
      billing: billing
        ? {
            paymentStatus: billing.paymentStatus,
            installmentsPaidCount: billing.installmentsPaidCount,
            installmentLimit: billing.installmentLimit,
            hasStripeCustomer: !!billing.stripeCustomerId,
          }
        : null,
      payments: student.paymentRecords.map((p: typeof student.paymentRecords[number]) => ({
        id: p.id,
        amount: p.amount,
        currency: p.currency,
        type: p.type,
        status: p.status,
        paidAt: p.paidAt,
      })),
    });
  } catch (error) {
    console.error('Error fetching billing:', error);
    return Response.json({ error: 'Failed to fetch billing data.' }, { status: 500 });
  }
}
