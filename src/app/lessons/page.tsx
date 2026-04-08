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
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-warmGray-800 text-center mb-8">
            {d.lessons.courseContent.title}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {d.lessons.courseContent.items.map((item, index) => (
              <div key={index} className="flex items-center gap-3 bg-cafe-50 rounded-lg p-4">
                <span className="text-cafe-500">✔</span>
                <span className="text-warmGray-700">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Support Section */}
      <section className="py-16 md:py-20 bg-cream">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-warmGray-800 text-center mb-2">
            {d.lessons.additionalSupport.title}
          </h2>
          <p className="text-warmGray-500 text-center mb-8">
            {d.lessons.additionalSupport.subtitle}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {d.lessons.additionalSupport.items.map((item, index) => (
              <Card key={index} className="text-center">
                <p className="text-warmGray-700 font-medium">{item}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Outcomes Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-warmGray-800 text-center mb-8">
            {d.lessons.outcomes.title}
          </h2>
          <div className="space-y-4">
            {d.lessons.outcomes.items.map((item, index) => (
              <div key={index} className="flex items-start gap-3 bg-cream/60 rounded-xl px-5 py-4">
                <span className="text-cafe-500 mt-0.5">🎯</span>
                <p className="text-warmGray-700 leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Course Details & Payment Section */}
      <section className="py-16 md:py-20 bg-cream">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Course Details */}
            <Card>
              <h3 className="text-xl font-bold text-warmGray-800 mb-4">
                {d.lessons.courseDetails.title}
              </h3>
              <ul className="space-y-3 mb-4">
                {d.lessons.courseDetails.items.map((item, index) => (
                  <li key={index} className="flex items-start gap-2 text-warmGray-700">
                    <span className="text-cafe-500">•</span>
                    {item}
                  </li>
                ))}
              </ul>
              <p className="text-sm text-warmGray-500 italic">{d.lessons.courseDetails.note}</p>
            </Card>

            {/* Payment Info */}
            <Card>
              <h3 className="text-xl font-bold text-warmGray-800 mb-4">
                {d.lessons.payment.title}
              </h3>
              <ul className="space-y-3 mb-4">
                {d.lessons.payment.items.map((item, index) => (
                  <li key={index} className="flex items-start gap-2 text-warmGray-700">
                    <span className="text-cafe-500">•</span>
                    {item}
                  </li>
                ))}
              </ul>
              <p className="text-sm text-warmGray-500 italic">{d.lessons.payment.note}</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Lesson Policy Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-warmGray-800 text-center mb-8">
            {d.lessons.lessonPolicy.title}
          </h2>

          <div className="space-y-4 mb-8">
            {d.lessons.lessonPolicy.items.map((item, index) => (
              <div key={index} className="flex items-start gap-3 bg-cafe-50 rounded-lg px-5 py-3">
                <span className="text-cafe-500 mt-0.5">📌</span>
                <p className="text-warmGray-700">{item}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="border-l-4 border-l-cafe-300">
              <h4 className="font-semibold text-warmGray-800 mb-2">
                {d.lessons.lessonPolicy.reschedule.title}
              </h4>
              <p className="text-sm text-warmGray-600">
                {d.lessons.lessonPolicy.reschedule.description}
              </p>
            </Card>
            <Card className="border-l-4 border-l-amber-300">
              <h4 className="font-semibold text-warmGray-800 mb-2">
                {d.lessons.lessonPolicy.cancellation.title}
              </h4>
              <p className="text-sm text-warmGray-600">
                {d.lessons.lessonPolicy.cancellation.description}
              </p>
            </Card>
            <Card className="border-l-4 border-l-sage-300">
              <h4 className="font-semibold text-warmGray-800 mb-2">
                {d.lessons.lessonPolicy.sameDay.title}
              </h4>
              <ul className="space-y-1">
                {d.lessons.lessonPolicy.sameDay.items.map((item, index) => (
                  <li key={index} className="text-sm text-warmGray-600">
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
