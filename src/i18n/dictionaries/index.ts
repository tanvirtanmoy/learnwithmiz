import { ja } from './ja';
import { en } from './en';
import type { Locale } from '../config';
import type { Dictionary } from './ja';

const dictionaries: Record<Locale, Dictionary> = {
  ja,
  en,
};

export const getDictionary = (locale: Locale): Dictionary => {
  return dictionaries[locale] || dictionaries.ja;
};

export type { Dictionary };
