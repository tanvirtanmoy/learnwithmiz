'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useLanguage } from '@/i18n';

function SuccessContent() {
  const { dictionary: d } = useLanguage();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');

  // We show the success info but do NOT trust this page for activation.
  // Activation only happens via webhooks.

  return (
    <section className="py-16 md:py-24 bg-bg-warm min-h-[60vh]">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Success Icon */}
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
          <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="text-3xl font-semibold text-brown-primary mb-2">
          {d.checkoutSuccess.title}
        </h1>
        <p className="text-lg text-brown-secondary mb-8">
          {d.checkoutSuccess.subtitle}
        </p>

        <p className="text-brown-secondary/70 mb-10">
          {d.checkoutSuccess.description}
        </p>

        {/* Next Steps */}
        <div className="bg-bg-white rounded-2xl p-6 md:p-8 shadow-sm text-left mb-8">
          <h2 className="text-lg font-semibold text-brown-primary mb-4">
            {d.checkoutSuccess.nextSteps.title}
          </h2>
          <ol className="space-y-4">
            {d.checkoutSuccess.nextSteps.steps.map((step: string, i: number) => (
              <li key={i} className="flex items-start gap-4">
                <span className="w-7 h-7 rounded-full bg-brown-accent text-brown-primary flex items-center justify-center text-sm font-semibold flex-shrink-0">
                  {i + 1}
                </span>
                <span className="text-brown-secondary pt-0.5">{step}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* Validity Note */}
        <div className="bg-bg-section rounded-2xl p-4 mb-8">
          <p className="text-brown-secondary text-sm">
            {d.checkoutSuccess.validityNote}
          </p>
        </div>

        <Link
          href="/"
          className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-brown-button text-brown-primary font-heading font-medium hover:bg-brown-button-hover transition-colors"
        >
          {d.checkoutSuccess.backToHome}
        </Link>

        {sessionId && (
          <p className="text-xs text-brown-secondary/30 mt-6">
            Session: {sessionId.slice(0, 20)}...
          </p>
        )}
      </div>
    </section>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="py-24 text-center text-brown-secondary/50">Loading...</div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
