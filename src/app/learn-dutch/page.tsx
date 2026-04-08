'use client';

import { useLanguage } from '@/i18n';
import { HeroSection, Card, CTASection } from '@/components';

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

      {/* Learning Stages */}
      {d.learnDutch.stages.map((stage, index) => (
        <section key={index} className={`py-16 md:py-20 ${index % 2 === 0 ? 'bg-white' : 'bg-cream'}`}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <span className="inline-block px-3 py-1 text-sm font-medium bg-cafe-100 text-cafe-700 rounded-full mb-3">
                {stage.level}
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-warmGray-800 mb-4">
                {stage.title}
              </h2>
              <p className="text-warmGray-600 leading-relaxed whitespace-pre-line">
                {stage.description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Materials */}
              <Card>
                <h3 className="text-lg font-semibold text-warmGray-800 mb-4 flex items-center gap-2">
                  <span>📚</span>
                  {stage.materials.title}
                </h3>
                <ul className="space-y-2">
                  {stage.materials.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-warmGray-600">
                      <span className="text-cafe-500 mt-1">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
                {stage.materials.note && (
                  <p className="mt-4 text-sm text-warmGray-500 italic">{stage.materials.note}</p>
                )}
              </Card>

              {/* Learning Points */}
              <Card>
                <h3 className="text-lg font-semibold text-warmGray-800 mb-4 flex items-center gap-2">
                  <span>🎯</span>
                  {stage.learningPoints.title}
                </h3>
                <ul className="space-y-2">
                  {stage.learningPoints.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-warmGray-600">
                      <span className="text-cafe-500 mt-1">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
          </div>
        </section>
      ))}

      {/* Closing Message */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-cafe-50 to-cream">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-warmGray-700 leading-relaxed text-lg whitespace-pre-line">
            {d.learnDutch.closingMessage}
          </p>
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
