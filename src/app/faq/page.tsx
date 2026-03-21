'use client';

import { useLanguage } from '@/i18n';
import { HeroSection, FAQAccordion, CTASection } from '@/components';

export default function FAQPage() {
  const { dictionary: d } = useLanguage();

  return (
    <>
      {/* Hero */}
      <HeroSection
        title={d.faq.hero.title}
        description={d.faq.hero.subtitle}
        size="small"
      />

      {/* FAQ Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQAccordion items={d.faq.items} />
        </div>
      </section>

      {/* CTA Section */}
      <CTASection
        title={d.faq.cta.title}
        description={d.faq.cta.description}
        primaryButton={{
          label: d.faq.cta.button,
          href: '/contact',
        }}
        variant="highlight"
      />
    </>
  );
}
