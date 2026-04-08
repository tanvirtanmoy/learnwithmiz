'use client';

import Link from 'next/link';
import { useLanguage } from '@/i18n';

export default function Footer() {
  const { dictionary: d } = useLanguage();

  const quickLinks = [
    { href: '/about', label: d.nav.about },
    { href: '/learn-dutch', label: d.nav.learnDutch },
    { href: '/lessons', label: d.nav.lessons },
    { href: '/blog', label: d.nav.blog },
    { href: '/faq', label: d.nav.faq },
    { href: '/contact', label: d.nav.contact },
  ];

  return (
    <footer className="bg-bg-section border-t border-border-light">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <span className="font-heading text-xl font-semibold text-brown-primary tracking-wide">
                🌸 <span className="text-brown-secondary">Hana</span> Language School
              </span>
            </Link>
            <p className="text-sm text-brown-secondary leading-relaxed">
              {d.footer.tagline}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-heading font-semibold text-brown-primary mb-4">
              {d.footer.quickLinks}
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-brown-secondary hover:text-brown-primary transition-all duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-sm font-heading font-semibold text-brown-primary mb-4">
              {d.footer.connect}
            </h3>
            <div className="space-y-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-sm text-brown-secondary hover:text-brown-primary transition-all duration-300"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>{d.nav.contact}</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border-soft">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-brown-secondary/70">
              {d.footer.copyright}
            </p>
            <div className="flex gap-6">
              <Link href="#" className="text-sm text-brown-secondary/70 hover:text-brown-primary transition-all duration-300">
                {d.footer.privacyPolicy}
              </Link>
              <Link href="#" className="text-sm text-brown-secondary/70 hover:text-brown-primary transition-all duration-300">
                {d.footer.termsOfService}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
