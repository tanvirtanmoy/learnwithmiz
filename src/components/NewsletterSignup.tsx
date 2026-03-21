'use client';

import { useState } from 'react';
import { useLanguage } from '@/i18n';
import Button from './Button';

export default function NewsletterSignup() {
  const { dictionary: d } = useLanguage();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsSubmitting(true);
    // Simulate submission
    await new Promise((resolve) => setTimeout(resolve, 800));
    setIsSubmitting(false);
    setIsSuccess(true);
    setEmail('');
  };

  return (
    <section className="py-16 md:py-20 bg-gradient-to-r from-cafe-50 to-cream">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-warmGray-800 mb-3">
          {d.home.newsletter.title}
        </h2>
        <p className="text-warmGray-600 mb-8">
          {d.home.newsletter.subtitle}
        </p>

        {isSuccess ? (
          <div className="bg-cafe-100 text-cafe-700 px-6 py-4 rounded-lg inline-flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="font-medium">{d.home.newsletter.success}</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={d.home.newsletter.placeholder}
              className="flex-grow px-4 py-3 rounded-lg border border-cafe-200 focus:border-cafe-500 focus:ring-2 focus:ring-cafe-100 transition-colors outline-none text-warmGray-800 placeholder-warmGray-400"
            />
            <Button
              type="submit"
              variant="primary"
              disabled={isSubmitting}
              className="whitespace-nowrap"
            >
              {d.home.newsletter.cta}
            </Button>
          </form>
        )}

        <p className="mt-4 text-sm text-warmGray-500">
          {d.home.newsletter.privacy}
        </p>
      </div>
    </section>
  );
}
