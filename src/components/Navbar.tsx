'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useLanguage } from '@/i18n';
import LanguageSwitcher from './LanguageSwitcher';

export default function Navbar() {
  const { dictionary: d } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '/', label: d.nav.home },
    { href: '/about', label: d.nav.about },
    { href: '/learn-dutch', label: d.nav.learnDutch },
    { href: '/lessons', label: d.nav.lessons },
    { href: '/pricing', label: d.nav.pricing },
    { href: '/blog', label: d.nav.blog },
    { href: '/faq', label: d.nav.faq },
    { href: '/contact', label: d.nav.contact },
  ];

  return (
    <header className="sticky top-0 z-50 bg-bg-warm/90 backdrop-blur-md border-b border-border-light">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <span className="font-heading text-xl font-semibold text-brown-primary tracking-wide">
              🌸 <span className="text-brown-secondary">Hana</span> Language School
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-2 py-2 text-xs font-heading font-medium text-brown-secondary hover:text-brown-primary rounded-full hover:bg-brown-accent/30 transition-all duration-300 whitespace-nowrap"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Language Switcher & Mobile Menu Button */}
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            
            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-brown-secondary hover:text-brown-primary rounded-full hover:bg-brown-accent/30 transition-all duration-300"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border-light">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-4 py-3 text-sm font-heading font-medium text-brown-secondary hover:text-brown-primary hover:bg-brown-accent/30 rounded-full transition-all duration-300"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
