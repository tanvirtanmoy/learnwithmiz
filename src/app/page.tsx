'use client';

import { useLanguage } from '@/i18n';
import { Button, Card, SectionHeader, InstructorCard, NewsletterSignup } from '@/components';

// Icons for why Dutch section
const icons = {
  daily: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  ),
  official: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  ),
  work: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  belonging: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  ),
};

export default function HomePage() {
  const { dictionary: d } = useLanguage();

  return (
    <>
      {/* Hero Section */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-warmWhite to-cream">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-warmGray-800 leading-tight mb-4">
            {d.home.hero.title}
          </h1>
          <p className="text-cafe-600 font-medium text-lg md:text-xl mb-4">
            {d.home.hero.subtitle}
          </p>
          <p className="text-lg md:text-xl text-warmGray-600 leading-relaxed max-w-2xl mx-auto mb-8">
            {d.home.hero.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/lessons" variant="primary" size="large">
              {d.home.hero.cta1}
            </Button>
            <Button href="/learn-dutch" variant="outline" size="large">
              {d.home.hero.cta2}
            </Button>
          </div>
        </div>
      </section>

      {/* Why Dutch Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title={d.home.whyDutch.title}
            subtitle={d.home.whyDutch.subtitle}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {d.home.whyDutch.reasons.map((reason, index) => (
              <Card key={index} hover>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-14 h-14 bg-cafe-50 rounded-xl flex items-center justify-center text-cafe-600">
                    {icons[reason.icon as keyof typeof icons]}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-warmGray-800 mb-2">
                      {reason.title}
                    </h3>
                    <p className="text-warmGray-600 text-sm leading-relaxed">
                      {reason.description}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Different Section */}
      <section className="py-16 md:py-24 bg-cream">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title={d.home.whyDifferent.title}
            subtitle={d.home.whyDifferent.subtitle}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {d.home.whyDifferent.points.map((point, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-cafe-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                  {index + 1}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-warmGray-800 mb-2">
                    {point.title}
                  </h3>
                  <p className="text-warmGray-600 leading-relaxed">
                    {point.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Path Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title={d.home.learningPath.title}
            subtitle={d.home.learningPath.subtitle}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {d.home.learningPath.steps.map((step, index) => (
              <Card key={index} hover className="relative">
                <div className="absolute -top-3 left-6">
                  <span className="inline-block px-3 py-1 text-xs font-medium bg-cafe-100 text-cafe-700 rounded-full">
                    {step.level}
                  </span>
                </div>
                <div className="pt-4">
                  <h3 className="text-lg font-semibold text-warmGray-800 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-warmGray-600 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Instructor Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-cafe-50 to-cream">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader title={d.home.instructor.title} />
          <InstructorCard
            name={d.home.instructor.name}
            role={d.home.instructor.role}
            bio={d.home.instructor.bio}
            cta={d.home.instructor.cta}
            ctaHref="/about"
          />
        </div>
      </section>

      {/* Future Offerings Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title={d.home.futureOfferings.title}
            subtitle={d.home.futureOfferings.subtitle}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {d.home.futureOfferings.items.map((item, index) => (
              <Card key={index} className="text-center">
                <div className="w-12 h-12 mx-auto mb-4 bg-cafe-100 rounded-full flex items-center justify-center text-cafe-400">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-warmGray-800 mb-2">
                  {item.title}
                </h3>
                <p className="text-warmGray-500 text-sm mb-3 leading-relaxed">
                  {item.description}
                </p>
                <span className="inline-block px-3 py-1 text-xs font-medium bg-cafe-100 text-cafe-600 rounded-full">
                  {item.status}
                </span>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <NewsletterSignup />
    </>
  );
}
