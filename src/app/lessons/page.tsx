'use client';

import { useLanguage } from '@/i18n';
import { HeroSection, Card, SectionHeader, CTASection } from '@/components';

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

      {/* Course Content Section */}
      <section className="py-16 md:py-20 bg-bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-semibold text-brown-primary text-center mb-8">
            {d.lessons.courseContent.title}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {d.lessons.courseContent.items.map((item, index) => (
              <div key={index} className="flex items-center gap-3 bg-bg-section rounded-2xl p-4">
                <span className="text-brown-button">✔</span>
                <span className="text-brown-secondary">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Support Section */}
      <section className="py-16 md:py-20 bg-bg-warm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-semibold text-brown-primary text-center mb-2">
            {d.lessons.additionalSupport.title}
          </h2>
          <p className="text-brown-secondary text-center mb-8">
            {d.lessons.additionalSupport.subtitle}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {d.lessons.additionalSupport.items.map((item, index) => (
              <Card key={index} className="text-center">
                <p className="text-brown-primary font-medium">{item}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Outcomes Section */}
      <section className="py-16 md:py-20 bg-bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-semibold text-brown-primary text-center mb-8">
            {d.lessons.outcomes.title}
          </h2>
          <div className="space-y-4">
            {d.lessons.outcomes.items.map((item, index) => (
              <div key={index} className="flex items-start gap-3 bg-bg-section rounded-2xl px-5 py-4">
                <span className="text-brown-button mt-0.5">🎯</span>
                <p className="text-brown-secondary leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Course Details & Payment Section */}
      <section className="py-16 md:py-20 bg-bg-warm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Course Details */}
            <Card>
              <h3 className="text-xl font-semibold text-brown-primary mb-4">
                {d.lessons.courseDetails.title}
              </h3>
              <ul className="space-y-3 mb-4">
                {d.lessons.courseDetails.items.map((item, index) => (
                  <li key={index} className="flex items-start gap-2 text-brown-secondary">
                    <span className="text-brown-button">•</span>
                    {item}
                  </li>
                ))}
              </ul>
              <p className="text-sm text-brown-secondary/70 italic">{d.lessons.courseDetails.note}</p>
            </Card>

            {/* Payment Info */}
            <Card>
              <h3 className="text-xl font-semibold text-brown-primary mb-4">
                {d.lessons.payment.title}
              </h3>
              <ul className="space-y-3 mb-4">
                {d.lessons.payment.items.map((item, index) => (
                  <li key={index} className="flex items-start gap-2 text-brown-secondary">
                    <span className="text-brown-button">•</span>
                    {item}
                  </li>
                ))}
              </ul>
              <p className="text-sm text-brown-secondary/70 italic">{d.lessons.payment.note}</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Lesson Policy Section */}
      <section className="py-16 md:py-20 bg-bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-semibold text-brown-primary text-center mb-8">
            {d.lessons.lessonPolicy.title}
          </h2>

          <div className="space-y-4 mb-8">
            {d.lessons.lessonPolicy.items.map((item, index) => (
              <div key={index} className="flex items-start gap-3 bg-bg-section rounded-2xl px-5 py-3">
                <span className="text-brown-button mt-0.5">📌</span>
                <p className="text-brown-secondary">{item}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="border-l-4 border-l-brown-button">
              <h4 className="font-heading font-semibold text-brown-primary mb-2">
                {d.lessons.lessonPolicy.reschedule.title}
              </h4>
              <p className="text-sm text-brown-secondary">
                {d.lessons.lessonPolicy.reschedule.description}
              </p>
            </Card>
            <Card className="border-l-4 border-l-brown-accent">
              <h4 className="font-heading font-semibold text-brown-primary mb-2">
                {d.lessons.lessonPolicy.cancellation.title}
              </h4>
              <p className="text-sm text-brown-secondary">
                {d.lessons.lessonPolicy.cancellation.description}
              </p>
            </Card>
            <Card className="border-l-4 border-l-brown-light">
              <h4 className="font-heading font-semibold text-brown-primary mb-2">
                {d.lessons.lessonPolicy.sameDay.title}
              </h4>
              <ul className="space-y-1">
                {d.lessons.lessonPolicy.sameDay.items.map((item, index) => (
                  <li key={index} className="text-sm text-brown-secondary">
                    • {item}
                  </li>
                ))}
              </ul>
            </Card>
          </div>
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
          href: '/pricing',
        }}
        variant="highlight"
      />
    </>
  );
}
