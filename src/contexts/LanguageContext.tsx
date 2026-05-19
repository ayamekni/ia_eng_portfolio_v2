import { createContext, useContext, useState, type ReactNode } from 'react';
import { translations, type Lang, type Translations } from '@/lib/i18n';

const LanguageContext = createContext<{
  lang: Lang;
  t: Translations;
  toggle: () => void;
}>({ lang: 'en', t: translations.en, toggle: () => {} });

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('en');
  return (
    <LanguageContext.Provider
      value={{ lang, t: translations[lang], toggle: () => setLang(l => (l === 'en' ? 'fr' : 'en')) }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
