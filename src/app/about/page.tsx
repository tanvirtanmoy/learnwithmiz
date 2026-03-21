'use client';

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
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            {/* Photo placeholder */}
            <div className="flex-shrink-0">
              <div className="w-56 h-56 md:w-64 md:h-64 bg-gradient-to-br from-cafe-100 to-cafe-200 rounded-2xl flex items-center justify-center shadow-sm">
                <span className="text-7xl">👩‍🏫</span>
              </div>
            </div>

            {/* Bio */}
            <div className="flex-grow">
              <h2 className="text-2xl md:text-3xl font-bold text-warmGray-800 mb-6">
                {d.about.intro.title}
              </h2>
              <div className="space-y-4">
                {d.about.intro.paragraphs.map((paragraph, index) => (
                  <p key={index} className="text-warmGray-600 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Teaching Philosophy Section */}
      <section className="py-16 md:py-20 bg-cream">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title={d.about.philosophy.title}
            subtitle={d.about.philosophy.subtitle}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {d.about.philosophy.points.map((point, index) => (
              <Card key={index} hover>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-cafe-100 rounded-full flex items-center justify-center text-cafe-600 font-semibold">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-warmGray-800 mb-2">
                      {point.title}
                    </h3>
                    <p className="text-warmGray-600 text-sm leading-relaxed">
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
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader title={d.about.forWhom.title} />
          <div className="bg-cafe-50 rounded-2xl p-8">
            <ul className="space-y-4">
              {d.about.forWhom.items.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 text-cafe-600 flex-shrink-0 mt-0.5"
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
                  <span className="text-warmGray-700">{item}</span>
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
