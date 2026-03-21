'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Locale, defaultLocale, locales } from './config';
import { getDictionary, Dictionary } from './dictionaries';

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  dictionary: Dictionary;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const LOCALE_STORAGE_KEY = 'learn-with-miz-locale';

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);
  const [dictionary, setDictionary] = useState<Dictionary>(getDictionary(defaultLocale));

  useEffect(() => {
    // Check localStorage for saved preference
    const saved = localStorage.getItem(LOCALE_STORAGE_KEY);
    if (saved && locales.includes(saved as Locale)) {
      setLocaleState(saved as Locale);
      setDictionary(getDictionary(saved as Locale));
    }
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    setDictionary(getDictionary(newLocale));
    localStorage.setItem(LOCALE_STORAGE_KEY, newLocale);
  };

  return (
    <LanguageContext.Provider value={{ locale, setLocale, dictionary }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
