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
      <section className="py-16 md:py-24 bg-gradient-to-b from-warmWhite to-cream">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-warmGray-800 mb-4">
            {d.pricing.title}
          </h1>
          <p className="text-lg text-warmGray-600 mb-2">
            {d.pricing.subtitle}
          </p>
          <p className="text-warmGray-500 max-w-2xl mx-auto">
            {d.pricing.description}
          </p>
        </div>
      </section>

      {/* Course Highlights */}
      <section className="py-8 bg-white border-b border-cafe-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {d.pricing.courseHighlights.map((item: string, i: number) => (
              <span
                key={i}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sage-50 text-sage-700 text-sm font-medium"
              >
                <svg className="w-4 h-4 text-sage-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16 md:py-24 bg-warmWhite">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* One-time Payment Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-cafe-100 p-8 flex flex-col">
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-warmGray-800 mb-2">
                  {d.pricing.fullPayment.title}
                </h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-warmGray-800">{d.pricing.fullPayment.price}</span>
                  <span className="text-warmGray-500 text-sm">{d.pricing.fullPayment.period}</span>
                </div>
                <p className="text-warmGray-500 text-sm mt-2">{d.pricing.fullPayment.description}</p>
              </div>
              <ul className="space-y-3 mb-8 flex-grow">
                {d.pricing.fullPayment.features.map((feature: string, i: number) => (
                  <li key={i} className="flex items-start gap-3 text-warmGray-600">
                    <svg className="w-5 h-5 text-sage-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => handleCheckout('full_payment')}
                disabled={loading !== null}
                className="w-full py-3 px-6 rounded-lg bg-cafe-600 text-white font-medium hover:bg-cafe-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading === 'full' ? '...' : d.pricing.fullPayment.cta}
              </button>
            </div>

            {/* Monthly Installment Card */}
            <div className="bg-white rounded-2xl shadow-md border-2 border-cafe-500 p-8 flex flex-col relative">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-cafe-600 text-white text-xs font-semibold px-4 py-1 rounded-full">
                {d.pricing.popular}
              </span>
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-warmGray-800 mb-2">
                  {d.pricing.installment.title}
                </h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-warmGray-800">{d.pricing.installment.price}</span>
                  <span className="text-warmGray-500 text-sm">{d.pricing.installment.period}</span>
                </div>
                <p className="text-cafe-600 text-sm font-medium mt-1">{d.pricing.installment.totalNote}</p>
                <p className="text-warmGray-500 text-sm mt-2">{d.pricing.installment.description}</p>
              </div>
              <ul className="space-y-3 mb-6 flex-grow">
                {d.pricing.installment.features.map((feature: string, i: number) => (
                  <li key={i} className="flex items-start gap-3 text-warmGray-600">
                    <svg className="w-5 h-5 text-sage-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <p className="text-xs text-warmGray-400 mb-4">{d.pricing.installment.autoStopNote}</p>
              <button
                onClick={() => handleCheckout('installment_3_month')}
                disabled={loading !== null}
                className="w-full py-3 px-6 rounded-lg bg-cafe-600 text-white font-medium hover:bg-cafe-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading === 'installment' ? '...' : d.pricing.installment.cta}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Lesson Policy */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-warmGray-800 text-center mb-12">
            {policy.lessonPolicy.title}
          </h2>
          <div className="grid sm:grid-cols-2 gap-8">
            {policy.lessonPolicy.sections.map((section, i) => (
              <div key={i} className="bg-warmWhite rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">{section.icon}</span>
                  <h3 className="text-lg font-semibold text-warmGray-800">{section.heading}</h3>
                </div>
                <ul className="space-y-2">
                  {section.items.map((item, j) => (
                    <li key={j} className="text-warmGray-600 text-sm leading-relaxed">
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
      <section className="py-16 md:py-20 bg-cream">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-warmGray-800 text-center mb-8">
            {policy.refundPolicy.title}
          </h2>
          <div className="bg-white rounded-xl p-6 md:p-8 shadow-sm">
            <ul className="space-y-4">
              {policy.refundPolicy.items.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-warmGray-400 mt-1 flex-shrink-0">•</span>
                  <p className="text-warmGray-600 text-sm leading-relaxed">{item}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
