'use client';

import Image from 'next/image';
import { useLanguage } from '@/i18n';
import { Button, Card, SectionHeader, InstructorCard, NewsletterSignup } from '@/components';

export default function HomePage() {
  const { dictionary: d } = useLanguage();

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/hero-canal.jpeg"
            alt=""
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-warmWhite/85 via-warmWhite/75 to-cream/90" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-warmGray-800 leading-tight mb-4">
            {d.home.hero.title}
          </h1>
          <p className="text-cafe-600 font-medium text-lg md:text-xl mb-4">
            {d.home.hero.subtitle}
          </p>
          <p className="text-lg md:text-xl text-warmGray-600 leading-relaxed max-w-2xl mx-auto mb-8 whitespace-pre-line">
            {d.home.hero.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/contact" variant="primary" size="large">
              {d.home.hero.cta1}
            </Button>
            <Button href="/lessons" variant="outline" size="large">
              {d.home.hero.cta2}
            </Button>
          </div>
        </div>
      </section>

      {/* Pain Points Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-warmGray-800 text-center mb-10">
            {d.home.painPoints.title}
          </h2>
          <div className="space-y-4 mb-8">
            {d.home.painPoints.items.map((item, index) => (
              <div key={index} className="flex items-start gap-3 bg-cream/60 rounded-xl px-5 py-4">
                <span className="text-cafe-400 mt-0.5">✔</span>
                <p className="text-warmGray-700 leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-lg font-medium text-cafe-600">
            {d.home.painPoints.cta}
          </p>
        </div>
      </section>

      {/* Course Intro Section */}
      <section className="py-16 md:py-24 bg-cream">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-warmGray-800 text-center mb-8">
            {d.home.courseIntro.title}
          </h2>
          <div className="space-y-4">
            {d.home.courseIntro.paragraphs.map((paragraph, index) => (
              <p key={index} className="text-warmGray-600 leading-relaxed text-center whitespace-pre-line">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-warmGray-800 text-center mb-12">
            {d.home.features.title}
          </h2>
          <div className="space-y-8">
            {d.home.features.items.map((feature, index) => (
              <Card key={index} hover>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 text-2xl md:text-3xl font-bold text-cafe-500">
                    {feature.number}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-warmGray-800 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-warmGray-600 text-sm leading-relaxed whitespace-pre-line">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Path Section */}
      <section className="py-16 md:py-24 bg-cream">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title={d.home.learningPath.title}
            subtitle={d.home.learningPath.subtitle}
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                  <p className="text-warmGray-600 text-sm leading-relaxed whitespace-pre-line">
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
          {/* Credentials */}
          <div className="mt-6 max-w-2xl mx-auto">
            <ul className="space-y-2">
              {d.home.instructor.credentials.map((credential, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-warmGray-600">
                  <span className="text-cafe-400 mt-0.5">•</span>
                  {credential}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* How to Join Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-warmGray-800 mb-10">
            {d.home.howToJoin.title}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
            {d.home.howToJoin.steps.map((step, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="w-12 h-12 bg-cafe-100 rounded-full flex items-center justify-center text-cafe-600 font-bold text-lg mb-3">
                  {index + 1}
                </div>
                <p className="text-sm text-warmGray-700 font-medium">{step}</p>
              </div>
            ))}
          </div>
          <p className="text-warmGray-600 leading-relaxed mb-8 whitespace-pre-line">
            {d.home.howToJoin.message}
          </p>
          <Button href="/contact" variant="primary" size="large">
            {d.home.howToJoin.cta}
          </Button>
        </div>
      </section>

      {/* Newsletter Section */}
      <NewsletterSignup />
    </>
  );
}
