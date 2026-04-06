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
    <section className="py-16 md:py-24 bg-warmWhite min-h-[60vh]">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Success Icon */}
        <div className="w-20 h-20 bg-sage-100 rounded-full flex items-center justify-center mx-auto mb-8">
          <svg className="w-10 h-10 text-sage-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="text-3xl font-bold text-warmGray-800 mb-2">
          {d.checkoutSuccess.title}
        </h1>
        <p className="text-lg text-warmGray-600 mb-8">
          {d.checkoutSuccess.subtitle}
        </p>

        <p className="text-warmGray-500 mb-10">
          {d.checkoutSuccess.description}
        </p>

        {/* Next Steps */}
        <div className="bg-white rounded-xl p-6 md:p-8 shadow-sm text-left mb-8">
          <h2 className="text-lg font-semibold text-warmGray-800 mb-4">
            {d.checkoutSuccess.nextSteps.title}
          </h2>
          <ol className="space-y-4">
            {d.checkoutSuccess.nextSteps.steps.map((step: string, i: number) => (
              <li key={i} className="flex items-start gap-4">
                <span className="w-7 h-7 rounded-full bg-cafe-100 text-cafe-700 flex items-center justify-center text-sm font-semibold flex-shrink-0">
                  {i + 1}
                </span>
                <span className="text-warmGray-600 pt-0.5">{step}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* Validity Note */}
        <div className="bg-sage-50 rounded-lg p-4 mb-8">
          <p className="text-sage-700 text-sm">
            {d.checkoutSuccess.validityNote}
          </p>
        </div>

        <Link
          href="/"
          className="inline-flex items-center justify-center px-8 py-3 rounded-lg bg-cafe-600 text-white font-medium hover:bg-cafe-700 transition-colors"
        >
          {d.checkoutSuccess.backToHome}
        </Link>

        {sessionId && (
          <p className="text-xs text-warmGray-300 mt-6">
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
        <div className="py-24 text-center text-warmGray-400">Loading...</div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
