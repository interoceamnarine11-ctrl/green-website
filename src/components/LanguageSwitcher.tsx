import React from 'react';
import { Globe, Check } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Language } from '../data/translations';

interface LanguageSwitcherProps {
  variant?: 'navbar' | 'topbar' | 'mobile';
  className?: string;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ 
  variant = 'navbar',
  className = '' 
}) => {
  const { language, setLanguage, toggleLanguage, isRTL } = useLanguage();

  if (variant === 'topbar') {
    return (
      <button
        onClick={toggleLanguage}
        className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
          isRTL
            ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-700/60 hover:bg-emerald-900'
            : 'bg-slate-800 text-slate-300 border border-slate-700 hover:text-white hover:bg-slate-700'
        } ${className}`}
        aria-label={language === 'en' ? 'التبديل إلى العربية' : 'Switch to English'}
        title={language === 'en' ? 'التبديل إلى العربية' : 'Switch to English'}
      >
        <Globe className="h-3 w-3 text-emerald-400" />
        <span>{language === 'en' ? 'العربية' : 'English'}</span>
      </button>
    );
  }

  if (variant === 'mobile') {
    return (
      <div className={`p-3 bg-slate-50 rounded-2xl border border-slate-200/90 space-y-2 ${className}`}>
        <div className="flex items-center justify-between text-xs text-slate-600 font-bold px-1">
          <span className="flex items-center gap-1.5">
            <Globe className="h-4 w-4 text-emerald-600" />
            <span>{isRTL ? 'لغة الموقع' : 'Website Language'}</span>
          </span>
          <span className="text-[10px] text-slate-400 uppercase font-mono">
            {language === 'en' ? 'EN / AR' : 'عربي / إنجليزي'}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => setLanguage('en')}
            className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              language === 'en'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-700/20 ring-2 ring-emerald-600/30'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
            aria-pressed={language === 'en'}
          >
            <span>English</span>
            {language === 'en' && <Check className="h-3.5 w-3.5" />}
          </button>

          <button
            type="button"
            onClick={() => setLanguage('ar')}
            className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer font-cairo ${
              language === 'ar'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-700/20 ring-2 ring-emerald-600/30'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
            aria-pressed={language === 'ar'}
          >
            <span>العربية</span>
            {language === 'ar' && <Check className="h-3.5 w-3.5" />}
          </button>
        </div>
      </div>
    );
  }

  // Default 'navbar' variant: Elegant segmented switch with globe icon
  return (
    <div 
      className={`inline-flex items-center p-1 bg-slate-100/90 hover:bg-slate-100 border border-slate-200/90 rounded-xl shadow-2xs transition-all ${className}`}
      role="group"
      aria-label="Language selector"
    >
      <div className="px-1.5 text-slate-400">
        <Globe className="h-3.5 w-3.5 text-emerald-600" />
      </div>

      <button
        type="button"
        onClick={() => setLanguage('en')}
        className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
          language === 'en'
            ? 'bg-white text-emerald-800 shadow-xs border border-slate-200/60'
            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
        }`}
        aria-pressed={language === 'en'}
        title="Switch to English"
      >
        EN
      </button>

      <button
        type="button"
        onClick={() => setLanguage('ar')}
        className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer font-cairo ${
          language === 'ar'
            ? 'bg-white text-emerald-800 shadow-xs border border-slate-200/60'
            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
        }`}
        aria-pressed={language === 'ar'}
        title="التبديل إلى العربية"
      >
        عربي
      </button>
    </div>
  );
};
