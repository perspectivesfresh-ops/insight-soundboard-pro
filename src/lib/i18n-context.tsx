import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import { en } from '@/lib/translations/en';
import { fr } from '@/lib/translations/fr';

export type Language = 'en' | 'fr';

const translations: Record<Language, Record<string, any>> = { en, fr };

interface I18nContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextType>({} as I18nContextType);

function getNestedValue(obj: any, path: string): string {
  const val = path.split('.').reduce((acc, part) => acc?.[part], obj);
  return typeof val === 'string' ? val : path;
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>(() => {
    return (localStorage.getItem('guidant_lang') as Language) || 'en';
  });

  const setLang = useCallback((l: Language) => {
    setLangState(l);
    localStorage.setItem('guidant_lang', l);
  }, []);

  const t = useCallback((key: string): string => {
    return getNestedValue(translations[lang], key);
  }, [lang]);

  return <I18nContext.Provider value={{ lang, setLang, t }}>{children}</I18nContext.Provider>;
}

export const useI18n = () => useContext(I18nContext);
