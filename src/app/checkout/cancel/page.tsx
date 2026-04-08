'use client';

import Link from 'next/link';
import { useLanguage } from '@/i18n';

export default function CheckoutCancelPage() {
  const { dictionary: d } = useLanguage();

  return (
    <section className="py-16 md:py-24 bg-bg-warm min-h-[60vh]">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Warning Icon */}
        <div className="w-20 h-20 bg-brown-accent rounded-full flex items-center justify-center mx-auto mb-8">
          <svg className="w-10 h-10 text-brown-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.5c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>

        <h1 className="text-3xl font-semibold text-brown-primary mb-2">
          {d.checkoutCancel.title}
        </h1>
        <p className="text-lg text-brown-secondary mb-4">
          {d.checkoutCancel.subtitle}
        </p>
        <p className="text-brown-secondary/70 mb-10">
          {d.checkoutCancel.description}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/pricing"
            className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-brown-button text-brown-primary font-heading font-medium hover:bg-brown-button-hover transition-colors"
          >
            {d.checkoutCancel.retryButton}
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-3 rounded-full border-2 border-brown-button text-brown-primary font-heading font-medium hover:bg-brown-accent/30 transition-colors"
          >
            {d.checkoutCancel.contactButton}
          </Link>
        </div>
      </div>
    </section>
  );
}
