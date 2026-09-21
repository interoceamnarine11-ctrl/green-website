import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { Language, TRANSLATIONS } from '../data/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  dir: 'ltr' | 'rtl';
  isRTL: boolean;
  t: typeof TRANSLATIONS['en'];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = 'gbm_preferred_language';

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === 'en' || saved === 'ar') {
        return saved;
      }
    } catch {
      // Fallback for sandboxed storage
    }
    return 'en';
  });

  const setLanguage = (newLang: Language) => {
    setLanguageState(newLang);
    try {
      localStorage.setItem(STORAGE_KEY, newLang);
    } catch {
      // Storage unavailable
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  const dir: 'ltr' | 'rtl' = language === 'ar' ? 'rtl' : 'ltr';
  const isRTL = language === 'ar';

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = dir;
    if (isRTL) {
      document.body.classList.add('font-cairo');
    } else {
      document.body.classList.remove('font-cairo');
    }
  }, [language, dir, isRTL]);

  const value = useMemo(() => ({
    language,
    setLanguage,
    toggleLanguage,
    dir,
    isRTL,
    t: TRANSLATIONS[language],
  }), [language, dir, isRTL]);

  return (
    <LanguageContext.Provider value={value}>
      <div dir={dir} className={isRTL ? 'rtl' : 'ltr'}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
