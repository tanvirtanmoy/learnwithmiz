'use client';

import { useState } from 'react';
import { useLanguage } from '@/i18n';
import { POLICY_CONTENT, type PolicyLocale } from '@/lib/course-config';

export default function PricingPage() {
  const { locale, dictionary: d } = useLanguage();
  const [loading, setLoading] = useState<'full' | 'installment' | null>(null);

  const policy = POLICY_CONTENT[locale as PolicyLocale] || POLICY_CONTENT.ja;

  const handleCheckout = async (paymentOption: 'full_payment' | 'installment_3_month') => {
    setLoading(paymentOption === 'full_payment' ? 'full' : 'installment');
    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ paymentOption, locale }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        console.error('No checkout URL returned');
        setLoading(null);
      }
    } catch (err) {
      console.error('Checkout error:', err);
      setLoading(null);
    }
  };

  return (
    <>
      {/* Hero */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-bg-warm to-bg-section">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl font-semibold text-brown-primary mb-4">
            {d.pricing.title}
          </h1>
          <p className="text-lg text-brown-secondary mb-2">
            {d.pricing.subtitle}
          </p>
          <p className="text-brown-secondary/70 max-w-2xl mx-auto">
            {d.pricing.description}
          </p>
        </div>
      </section>

      {/* Course Highlights */}
      <section className="py-8 bg-bg-white border-b border-border-light">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {d.pricing.courseHighlights.map((item: string, i: number) => (
              <span
                key={i}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brown-accent/30 text-brown-primary text-sm font-medium"
              >
                <svg className="w-4 h-4 text-brown-button" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16 md:py-24 bg-bg-warm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* One-time Payment Card */}
            <div className="bg-bg-white rounded-2xl shadow-sm border border-border-light p-8 flex flex-col">
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-brown-primary mb-2">
                  {d.pricing.fullPayment.title}
                </h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-semibold text-brown-primary">{d.pricing.fullPayment.price}</span>
                  <span className="text-brown-secondary/70 text-sm">{d.pricing.fullPayment.period}</span>
                </div>
                <p className="text-brown-secondary/70 text-sm mt-2">{d.pricing.fullPayment.description}</p>
              </div>
              <ul className="space-y-3 mb-8 flex-grow">
                {d.pricing.fullPayment.features.map((feature: string, i: number) => (
                  <li key={i} className="flex items-start gap-3 text-brown-secondary">
                    <svg className="w-5 h-5 text-brown-button mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => handleCheckout('full_payment')}
                disabled={loading !== null}
                className="w-full py-3 px-6 rounded-full bg-brown-button text-brown-primary font-heading font-medium hover:bg-brown-button-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading === 'full' ? '...' : d.pricing.fullPayment.cta}
              </button>
            </div>

            {/* Monthly Installment Card */}
            <div className="bg-bg-white rounded-2xl shadow-md border-2 border-brown-button p-8 flex flex-col relative">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brown-primary text-white text-xs font-semibold px-4 py-1 rounded-full">
                {d.pricing.popular}
              </span>
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-brown-primary mb-2">
                  {d.pricing.installment.title}
                </h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-semibold text-brown-primary">{d.pricing.installment.price}</span>
                  <span className="text-brown-secondary/70 text-sm">{d.pricing.installment.period}</span>
                </div>
                <p className="text-brown-secondary text-sm font-medium mt-1">{d.pricing.installment.totalNote}</p>
                <p className="text-brown-secondary/70 text-sm mt-2">{d.pricing.installment.description}</p>
              </div>
              <ul className="space-y-3 mb-6 flex-grow">
                {d.pricing.installment.features.map((feature: string, i: number) => (
                  <li key={i} className="flex items-start gap-3 text-brown-secondary">
                    <svg className="w-5 h-5 text-brown-button mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <p className="text-xs text-brown-secondary/50 mb-4">{d.pricing.installment.autoStopNote}</p>
              <button
                onClick={() => handleCheckout('installment_3_month')}
                disabled={loading !== null}
                className="w-full py-3 px-6 rounded-full bg-brown-button text-brown-primary font-heading font-medium hover:bg-brown-button-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading === 'installment' ? '...' : d.pricing.installment.cta}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Lesson Policy */}
      <section className="py-16 md:py-24 bg-bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold text-brown-primary text-center mb-12">
            {policy.lessonPolicy.title}
          </h2>
          <div className="grid sm:grid-cols-2 gap-8">
            {policy.lessonPolicy.sections.map((section, i) => (
              <div key={i} className="bg-bg-section rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">{section.icon}</span>
                  <h3 className="text-lg font-semibold text-brown-primary">{section.heading}</h3>
                </div>
                <ul className="space-y-2">
                  {section.items.map((item, j) => (
                    <li key={j} className="text-brown-secondary text-sm leading-relaxed">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Refund Policy */}
      <section className="py-16 md:py-20 bg-bg-section">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold text-brown-primary text-center mb-8">
            {policy.refundPolicy.title}
          </h2>
          <div className="bg-bg-white rounded-2xl p-6 md:p-8 shadow-sm">
            <ul className="space-y-4">
              {policy.refundPolicy.items.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-brown-secondary/50 mt-1 flex-shrink-0">•</span>
                  <p className="text-brown-secondary text-sm leading-relaxed">{item}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
