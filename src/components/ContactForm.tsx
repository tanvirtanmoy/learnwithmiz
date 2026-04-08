'use client';

import { useState } from 'react';
import { useLanguage } from '@/i18n';
import Button from './Button';
import Card from './Card';

export default function ContactForm() {
  const { dictionary: d } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    interest: '',
    message: '',
  });

  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY,
          subject: `Learn with Miz - ${formData.interest || 'New Contact'}`,
          from_name: formData.name,
          email: formData.email,
          interest: formData.interest,
          message: formData.message,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setIsSuccess(true);
      } else {
        setError(d.contact.form.error || 'Something went wrong. Please try again.');
      }
    } catch {
      setError(d.contact.form.error || 'Something went wrong. Please try again.');
    }

    setIsSubmitting(false);
  };

  if (isSuccess) {
    return (
      <Card className="max-w-xl mx-auto text-center py-12">
        <div className="w-16 h-16 mx-auto mb-6 bg-brown-accent/40 rounded-full flex items-center justify-center">
          <svg className="w-8 h-8 text-brown-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-semibold text-brown-primary mb-3">{d.contact.success.title}</h3>
        <p className="text-brown-secondary mb-4">{d.contact.success.description}</p>
        <p className="text-sm text-brown-secondary/70 mb-8">{d.contact.success.note}</p>
        <Button href="/" variant="primary">
          {d.contact.success.back}
        </Button>
      </Card>
    );
  }

  return (
    <Card className="max-w-xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-brown-primary mb-2">
            {d.contact.form.name} <span className="text-brown-secondary">*</span>
          </label>
          <input
            type="text"
            id="name"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder={d.contact.form.namePlaceholder}
            className="w-full px-4 py-3 rounded-2xl border border-border-soft focus:border-brown-button focus:ring-2 focus:ring-brown-accent/40 transition-all duration-300 outline-none text-brown-primary placeholder-brown-secondary/50"
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-brown-primary mb-2">
            {d.contact.form.email} <span className="text-brown-secondary">*</span>
          </label>
          <input
            type="email"
            id="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder={d.contact.form.emailPlaceholder}
            className="w-full px-4 py-3 rounded-2xl border border-border-soft focus:border-brown-button focus:ring-2 focus:ring-brown-accent/40 transition-all duration-300 outline-none text-brown-primary placeholder-brown-secondary/50"
          />
        </div>

        {/* Interest */}
        <div>
          <label htmlFor="interest" className="block text-sm font-medium text-brown-primary mb-2">
            {d.contact.form.interest}
          </label>
          <select
            id="interest"
            value={formData.interest}
            onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
            className="w-full px-4 py-3 rounded-2xl border border-border-soft focus:border-brown-button focus:ring-2 focus:ring-brown-accent/40 transition-all duration-300 outline-none text-brown-primary bg-white appearance-none cursor-pointer"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%238b7355'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 1rem center',
              backgroundSize: '1.25rem',
            }}
          >
            <option value="">{d.contact.form.interestPlaceholder}</option>
            {d.contact.form.interestOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-brown-primary mb-2">
            {d.contact.form.message}
          </label>
          <textarea
            id="message"
            rows={4}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            placeholder={d.contact.form.messagePlaceholder}
            className="w-full px-4 py-3 rounded-2xl border border-border-soft focus:border-brown-button focus:ring-2 focus:ring-brown-accent/40 transition-all duration-300 outline-none text-brown-primary placeholder-brown-secondary/50 resize-none"
          />
        </div>

        {/* Submit */}
        {error && (
          <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}
        <Button
          type="submit"
          variant="primary"
          size="large"
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? d.contact.form.submitting : d.contact.form.submit}
        </Button>
      </form>
    </Card>
  );
}
