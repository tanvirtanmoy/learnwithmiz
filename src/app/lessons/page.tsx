'use client';

import { useLanguage } from '@/i18n';
import { HeroSection, SectionHeader, LessonCard, Card, CTASection } from '@/components';

export default function LessonsPage() {
  const { dictionary: d } = useLanguage();

  return (
    <>
      {/* Hero */}
      <HeroSection
        title={d.lessons.hero.title}
        subtitle={d.lessons.hero.subtitle}
        size="small"
      />

      {/* Concept Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader title={d.lessons.concept.title} />
          
          <p className="text-warmGray-600 text-lg leading-relaxed text-center mb-8">
            {d.lessons.concept.description}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {d.lessons.concept.features.map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-3 bg-cafe-50 rounded-lg p-4"
              >
                <svg
                  className="w-5 h-5 text-cafe-600 flex-shrink-0"
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
                <span className="text-warmGray-700">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lesson Types Section */}
      <section className="py-16 md:py-20 bg-cream">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title={d.lessons.types.title}
            subtitle={d.lessons.types.subtitle}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {d.lessons.types.items.map((lesson, index) => (
              <LessonCard
                key={index}
                title={lesson.title}
                description={lesson.description}
                level={lesson.level}
                status={lesson.status}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Future Offerings Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader title={d.lessons.future.title} />
          
          <p className="text-warmGray-600 text-center mb-8">
            {d.lessons.future.description}
          </p>

          <Card className="bg-gradient-to-br from-cafe-50 to-cream">
            <ul className="space-y-4">
              {d.lessons.future.items.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-cafe-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg
                      className="w-3 h-3 text-cafe-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <span className="text-warmGray-700">{item}</span>
                </li>
              ))}
            </ul>

            <p className="mt-6 pt-6 border-t border-cafe-100 text-warmGray-600 text-sm">
              {d.lessons.future.note}
            </p>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection
        title={d.lessons.cta.title}
        description={d.lessons.cta.description}
        primaryButton={{
          label: d.lessons.cta.button1,
          href: '/contact',
        }}
        secondaryButton={{
          label: d.lessons.cta.button2,
          href: '/contact',
        }}
        variant="highlight"
      />
    </>
  );
}
