
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { Language } from '@/translations/types';
import translations from '@/translations';
import { useGeolocation, Currency } from '@/hooks/useGeolocation';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  currency: Currency;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('pt-BR');
  const [userOverride, setUserOverride] = useState(false);
  const geo = useGeolocation();

  // Auto-set language from geolocation unless user manually changed it
  useEffect(() => {
    if (geo.loading || userOverride) return;
    const autoLang: Language = geo.region === 'BR' ? 'pt-BR' : 'en';
    setLanguageState(autoLang);
  }, [geo.loading, geo.region, userOverride]);

  const setLanguage = (lang: Language) => {
    setUserOverride(true);
    setLanguageState(lang);
  };

  const t = (key: string): string => {
    // Currency-aware variant lookup: try `${key}__${currency}` first
    const variantKey = `${key}__${geo.currency}`;
    if (translations[variantKey]) {
      return translations[variantKey][language];
    }
    if (!translations[key]) {
      console.warn(`Translation key "${key}" not found.`);
      return key;
    }
    return translations[key][language];
  };
  
  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, currency: geo.currency }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export { LanguageContext };
