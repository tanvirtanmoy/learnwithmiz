'use client';

import { useLanguage } from '@/i18n';
import { HeroSection, ContactForm, Card } from '@/components';

export default function ContactPage() {
  const { dictionary: d } = useLanguage();

  return (
    <>
      {/* Hero */}
      <HeroSection
        title={d.contact.hero.title}
        description={d.contact.hero.subtitle}
        size="small"
      />

      {/* Contact Section */}
      <section className="py-16 md:py-20 bg-bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Info Column */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-brown-primary mb-3">
                  {d.contact.intro.title}
                </h2>
                <p className="text-brown-secondary leading-relaxed">
                  {d.contact.intro.description}
                </p>
              </div>

              <Card className="bg-gradient-to-br from-bg-section to-bg-warm border-border-light">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-brown-accent rounded-full flex items-center justify-center">
                    <span className="text-2xl">💬</span>
                  </div>
                  <div>
                    <p className="text-brown-secondary italic leading-relaxed text-sm">
                      {d.contact.intro.fromMiz}
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Form Column */}
            <div className="lg:col-span-3">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
