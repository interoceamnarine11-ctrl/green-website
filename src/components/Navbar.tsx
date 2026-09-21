import React, { useState, useEffect } from 'react';
import { 
  Ship, 
  Phone, 
  MapPin, 
  Menu, 
  X, 
  ChevronRight,
  Clock,
  Send,
  MessageSquare
} from 'lucide-react';
import { COMPANY_DETAILS } from '../data/companyData';
import { useLanguage } from '../context/LanguageContext';
import { LanguageSwitcher } from './LanguageSwitcher';

interface NavbarProps {
  onContactClick?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onContactClick }) => {
  const { t, isRTL, language } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Dubai',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      };
      const locale = language === 'ar' ? 'ar-AE' : 'en-US';
      const timeStr = now.toLocaleTimeString(locale, options);
      const zoneStr = language === 'ar' ? 'ت ع م+4' : 'GST';
      setCurrentTime(`${timeStr} ${zoneStr}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [language]);

  const handleContactAction = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    setIsMobileMenuOpen(false);
    if (onContactClick) {
      onContactClick();
    } else {
      const el = document.getElementById('contact');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* Top Corporate Status Bar */}
      <div className="bg-slate-900 border-b border-slate-800 text-xs text-slate-300 py-1.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-4 flex-wrap">
            <span className="flex items-center gap-1.5 font-medium text-emerald-400">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse inline-block shrink-0" />
              {t.topBar.established}
            </span>
            <span className="hidden md:inline-flex items-center gap-1.5 text-slate-400">
              <MapPin className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
              {t.topBar.address}
            </span>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 text-xs">
            <span className="hidden lg:inline-flex items-center gap-1.5 text-slate-400">
              <Clock className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
              {t.topBar.fujairahDesk} <span className="text-slate-200 font-mono">{currentTime || 'UTC+4'}</span>
            </span>
            <a 
              href={`tel:${COMPANY_DETAILS.contact.telephone.replace(/\s+/g, '')}`} 
              className="flex items-center gap-1 text-slate-300 hover:text-emerald-400 transition-colors"
              dir="ltr"
            >
              <Phone className="h-3 w-3 text-emerald-400" />
              <span className="font-semibold">{COMPANY_DETAILS.contact.telephone}</span>
              <span className="text-[10px] text-emerald-400 bg-emerald-950/80 border border-emerald-800/80 px-1.5 py-0.5 rounded ml-1 hidden sm:inline">{t.topBar.linesCount}</span>
            </a>
            <div className="hidden sm:block border-l border-slate-700 pl-3">
              <LanguageSwitcher variant="topbar" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav className={`transition-all duration-300 px-4 sm:px-6 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-lg shadow-slate-900/5 py-3' 
          : 'bg-white/90 backdrop-blur-sm border-b border-slate-200/60 py-4'
      }`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <a href="#" className="flex items-center gap-3 group shrink-0" id="navbar-brand-logo">
            <div className="h-10 w-10 sm:h-11 sm:w-11 rounded-xl bg-gradient-to-br from-emerald-600 via-teal-700 to-slate-900 p-0.5 shadow-md shadow-emerald-900/10 group-hover:scale-105 transition-transform duration-200">
              <div className="h-full w-full bg-slate-950 rounded-[9px] flex items-center justify-center">
                <Ship className="h-5 w-5 text-emerald-400 group-hover:text-emerald-300 transition-colors" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base sm:text-lg font-black tracking-tight text-slate-900 font-heading">
                  {t.navbar.brandName}
                </span>
                <span className="text-xs font-bold text-emerald-700 border border-emerald-600/30 bg-emerald-50 px-1.5 py-0.5 rounded tracking-wide">
                  {t.navbar.brandSubtitle}
                </span>
              </div>
              <p className="text-[10px] text-slate-500 font-medium uppercase tracking-widest hidden sm:block">
                {t.navbar.brandTagline}
              </p>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-5 xl:gap-7 text-sm font-semibold text-slate-600">
            <a href="#about" className="hover:text-emerald-600 transition-colors py-1">{t.navbar.about}</a>
            <a href="#competencies" className="hover:text-emerald-600 transition-colors py-1">{t.navbar.capabilities}</a>
            <a href="#sectors" className="hover:text-emerald-600 transition-colors py-1">{t.navbar.sectors}</a>
            <a href="#footprint" className="hover:text-emerald-600 transition-colors py-1">{t.navbar.corridors}</a>
            <a href="#projects" className="hover:text-emerald-600 transition-colors py-1">{t.navbar.trackRecord}</a>
            <a href="#contact" className="hover:text-emerald-600 transition-colors py-1">{t.navbar.fujairahHq}</a>
          </div>

          {/* Actions: Language Switcher & Contact Button */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Primary Language Switcher Component */}
            <LanguageSwitcher variant="navbar" />

            <a
              href="#contact"
              onClick={handleContactAction}
              id="nav-contact-btn"
              className="group relative inline-flex items-center gap-2 px-4 lg:px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs tracking-wider uppercase transition-all shadow-md shadow-emerald-700/20 hover:shadow-lg hover:shadow-emerald-700/30 cursor-pointer active:scale-95 shrink-0"
            >
              <MessageSquare className="h-4 w-4" />
              <span>{t.navbar.contactBtn}</span>
              <ChevronRight className={`h-3.5 w-3.5 transition-transform ${isRTL ? 'group-hover:-translate-x-0.5 rotate-180' : 'group-hover:translate-x-0.5'}`} />
            </a>
          </div>

          {/* Mobile Menu & Switcher Controls */}
          <div className="flex sm:hidden items-center gap-2">
            <LanguageSwitcher variant="navbar" />
            
            <a
              href="#contact"
              onClick={handleContactAction}
              className="p-2.5 rounded-lg bg-emerald-600 text-white text-xs font-bold"
              title={t.navbar.contactBtn}
            >
              <Send className="h-4 w-4" />
            </a>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-100 border border-slate-200 text-slate-700 hover:text-slate-900 cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-3 pt-3 border-t border-slate-200 bg-white rounded-2xl p-4 shadow-2xl space-y-3">
            {/* Mobile Dedicated Language Switcher */}
            <LanguageSwitcher variant="mobile" />

            <div className="grid grid-cols-2 gap-2 text-sm font-medium">
              <a 
                href="#about" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-slate-50 text-slate-700 hover:text-emerald-600"
              >
                {t.navbar.about}
              </a>
              <a 
                href="#competencies" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-slate-50 text-slate-700 hover:text-emerald-600"
              >
                {t.navbar.capabilities}
              </a>
              <a 
                href="#sectors" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-slate-50 text-slate-700 hover:text-emerald-600"
              >
                {t.navbar.sectors}
              </a>
              <a 
                href="#footprint" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-slate-50 text-slate-700 hover:text-emerald-600"
              >
                {t.navbar.corridors}
              </a>
              <a 
                href="#projects" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-slate-50 text-slate-700 hover:text-emerald-600"
              >
                {t.navbar.trackRecord}
              </a>
              <a 
                href="#contact" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-slate-50 text-slate-700 hover:text-emerald-600"
              >
                {t.navbar.fujairahHq}
              </a>
            </div>

            <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
              <button
                onClick={handleContactAction}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-emerald-700/20 cursor-pointer"
              >
                <Send className="h-4 w-4" />
                {t.navbar.mobileContact}
              </button>

              <div className="text-xs text-slate-600 flex flex-col gap-1 p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="font-bold text-slate-900">{COMPANY_DETAILS.headquarters.building}</span>
                <span dir="ltr">Tel: {COMPANY_DETAILS.contact.telephone} ({t.topBar.linesCount})</span>
                <span>Email: {COMPANY_DETAILS.contact.email}</span>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
