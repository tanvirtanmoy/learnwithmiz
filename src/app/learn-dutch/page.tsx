'use client';

import { useLanguage } from '@/i18n';
import { HeroSection, Card, SectionHeader, CTASection, Button } from '@/components';

export default function LearnDutchPage() {
  const { dictionary: d } = useLanguage();

  return (
    <>
      {/* Hero */}
      <HeroSection
        title={d.learnDutch.hero.title}
        description={d.learnDutch.hero.subtitle}
        size="small"
      />

      {/* Do You Need Dutch Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-warmGray-800 mb-6 text-center">
            {d.learnDutch.needDutch.title}
          </h2>
          
          <div className="space-y-6">
            {d.learnDutch.needDutch.paragraphs.map((paragraph, index) => (
              <p key={index} className="text-warmGray-600 leading-relaxed text-lg">
                {paragraph}
              </p>
            ))}

            <div className="bg-cafe-50 rounded-2xl p-6 md:p-8 my-8">
              <ul className="space-y-3">
                {d.learnDutch.needDutch.benefits.map((benefit, index) => (
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
                    <span className="text-warmGray-700">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <p className="text-warmGray-700 font-medium text-center text-lg">
              {d.learnDutch.needDutch.conclusion}
            </p>
          </div>
        </div>
      </section>

      {/* Learning Path Section */}
      <section className="py-16 md:py-20 bg-cream">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title={d.learnDutch.learningPath.title}
            subtitle={d.learnDutch.learningPath.subtitle}
          />

          <div className="space-y-8">
            {d.learnDutch.learningPath.stages.map((stage, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="flex flex-col lg:flex-row">
                  {/* Level Badge */}
                  <div className="lg:w-48 flex-shrink-0 bg-cafe-100 p-6 flex flex-col justify-center items-center text-center">
                    <span className="text-sm font-medium text-cafe-700 mb-1">
                      {stage.level}
                    </span>
                    <h3 className="text-xl font-bold text-warmGray-800">
                      {stage.title}
                    </h3>
                  </div>

                  {/* Content */}
                  <div className="flex-grow p-6">
                    <p className="text-cafe-700 font-medium mb-4">
                      {stage.goal}
                    </p>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-sm font-semibold text-warmGray-500 uppercase tracking-wider mb-2">
                          Focus
                        </h4>
                        <ul className="space-y-2">
                          {stage.focus.map((item, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-warmGray-600">
                              <span className="text-cafe-500 mt-1">•</span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <h4 className="text-sm font-semibold text-warmGray-500 uppercase tracking-wider mb-2">
                            Study Style
                          </h4>
                          <p className="text-sm text-warmGray-600">{stage.studyStyle}</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-warmGray-500 uppercase tracking-wider mb-2">
                            Mindset
                          </h4>
                          <p className="text-sm text-warmGray-600 italic">{stage.mindset}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Difficulties Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title={d.learnDutch.difficulties.title}
            subtitle={d.learnDutch.difficulties.subtitle}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {d.learnDutch.difficulties.items.map((item, index) => (
              <Card key={index} hover>
                <h3 className="text-lg font-semibold text-warmGray-800 mb-2">
                  {item.title}
                </h3>
                <p className="text-warmGray-600 text-sm mb-4 leading-relaxed">
                  {item.description}
                </p>
                <div className="flex items-start gap-2 bg-cafe-50 rounded-lg p-3">
                  <svg
                    className="w-4 h-4 text-cafe-600 flex-shrink-0 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <p className="text-sm text-cafe-700">{item.tip}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Study Tips Section */}
      <section className="py-16 md:py-20 bg-cream">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader title={d.learnDutch.tips.title} />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {d.learnDutch.tips.items.map((tip, index) => (
              <Card key={index} className="text-center">
                <div className="w-12 h-12 mx-auto mb-4 bg-cafe-100 rounded-full flex items-center justify-center text-cafe-600 font-bold text-lg">
                  {index + 1}
                </div>
                <h3 className="text-lg font-semibold text-warmGray-800 mb-2">
                  {tip.title}
                </h3>
                <p className="text-warmGray-600 text-sm leading-relaxed">
                  {tip.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Examples Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title={d.learnDutch.examples.title}
            subtitle={d.learnDutch.examples.subtitle}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {d.learnDutch.examples.phrases.map((phrase, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-cafe-50 to-cream rounded-xl p-5 border border-cafe-100"
              >
                <p className="text-lg font-medium text-warmGray-800 mb-1">
                  {phrase.dutch}
                </p>
                <p className="text-warmGray-600 text-sm mb-2">{phrase.japanese}</p>
                <p className="text-xs text-cafe-600">📌 {phrase.context}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection
        title={d.learnDutch.cta.title}
        description={d.learnDutch.cta.description}
        primaryButton={{
          label: d.learnDutch.cta.button1,
          href: '/lessons',
        }}
        secondaryButton={{
          label: d.learnDutch.cta.button2,
          href: '/contact',
        }}
        variant="highlight"
      />
    </>
  );
}
