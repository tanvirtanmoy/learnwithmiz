'use client';

import Image from 'next/image';
import { useLanguage } from '@/i18n';
import { HeroSection, Card, SectionHeader, CTASection } from '@/components';

export default function AboutPage() {
  const { dictionary: d } = useLanguage();

  return (
    <>
      {/* Hero */}
      <HeroSection
        title={d.about.hero.title}
        subtitle={d.about.hero.subtitle}
        size="small"
      />

      {/* Introduction Section */}
      <section className="py-16 md:py-20 bg-bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            {/* Photo */}
            <div className="flex-shrink-0">
              <div className="w-56 h-56 md:w-64 md:h-64 rounded-2xl overflow-hidden shadow-sm">
                <Image
                  src="/mizuki.jpeg"
                  alt="Mizuki"
                  width={256}
                  height={256}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
            </div>

            {/* Bio */}
            <div className="flex-grow">
              <h2 className="text-2xl md:text-3xl font-semibold text-brown-primary mb-6">
                {d.about.intro.title}
              </h2>
              <div className="space-y-4">
                {d.about.intro.paragraphs.map((paragraph, index) => (
                  <p key={index} className="text-brown-secondary leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Background */}
              <div className="mt-8 pt-6 border-t border-border-soft">
                <h3 className="text-lg font-semibold text-brown-primary mb-4 flex items-center gap-2">
                  <span className="text-brown-button">🌿</span>
                  {d.about.intro.background.title}
                </h3>
                <ul className="space-y-2">
                  {d.about.intro.background.items.map((item, index) => (
                    <li key={index} className="flex items-start gap-2 text-brown-secondary text-sm">
                      <span className="text-brown-button mt-1">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Teaching Philosophy Section */}
      <section className="relative py-16 md:py-20 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/cafe-interior.jpeg"
            alt=""
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-bg-warm/90" />
        </div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title={d.about.philosophy.title}
            subtitle={d.about.philosophy.subtitle}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {d.about.philosophy.points.map((point, index) => (
              <Card key={index} hover>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-brown-accent rounded-full flex items-center justify-center text-brown-primary font-heading font-semibold">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-brown-primary mb-2">
                      {point.title}
                    </h3>
                    <p className="text-brown-secondary text-sm leading-relaxed">
                      {point.description}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* For Whom Section */}
      <section className="py-16 md:py-20 bg-bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader title={d.about.forWhom.title} />
          <div className="bg-bg-section rounded-2xl p-8">
            <ul className="space-y-4">
              {d.about.forWhom.items.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 text-brown-button flex-shrink-0 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-brown-secondary">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection
        title={d.about.cta.title}
        description={d.about.cta.description}
        primaryButton={{
          label: d.about.cta.button,
          href: '/contact',
        }}
        variant="highlight"
      />
    </>
  );
}
