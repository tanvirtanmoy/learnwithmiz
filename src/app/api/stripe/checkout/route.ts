/**
 * POST /api/stripe/checkout
 * Creates a Stripe Checkout Session for either full payment or installment plan.
 */

import { NextRequest } from 'next/server';
import { createCheckoutSession } from '@/lib/stripe-checkout';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { paymentOption, locale, customerEmail } = body;

    if (!paymentOption || !['full_payment', 'installment_3_month'].includes(paymentOption)) {
      return Response.json(
        { error: 'Invalid payment option. Must be "full_payment" or "installment_3_month".' },
        { status: 400 }
      );
    }

    const session = await createCheckoutSession({
      paymentOption,
      locale: locale || 'ja',
      customerEmail,
    });

    return Response.json({ url: session.url, sessionId: session.id });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return Response.json(
      { error: 'Failed to create checkout session.' },
      { status: 500 }
    );
  }
}
