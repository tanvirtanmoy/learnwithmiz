/**
 * POST /api/stripe/portal
 * Creates a Stripe Customer Portal session for billing management.
 */

import { NextRequest } from 'next/server';
import { createCustomerPortalSession } from '@/lib/stripe-checkout';
import prisma from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return Response.json({ error: 'Email is required.' }, { status: 400 });
    }

    // Find student and billing profile
    const student = await prisma.student.findUnique({
      where: { email },
      include: { billingProfile: true },
    });

    if (!student?.billingProfile?.stripeCustomerId) {
      return Response.json(
        { error: 'No billing profile found for this email.' },
        { status: 404 }
      );
    }

    const session = await createCustomerPortalSession(
      student.billingProfile.stripeCustomerId
    );

    return Response.json({ url: session.url });
  } catch (error) {
    console.error('Error creating portal session:', error);
    return Response.json(
      { error: 'Failed to create billing portal session.' },
      { status: 500 }
    );
  }
}
