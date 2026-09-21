import React from 'react';
import { 
  Ship, 
  MapPin, 
  ShieldCheck, 
  ArrowUp
} from 'lucide-react';
import { COMPANY_DETAILS } from '../data/companyData';
import { useLanguage } from '../context/LanguageContext';

export const Footer: React.FC = () => {
  const { t, isRTL, language } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-slate-400 text-xs">
      
      {/* Upper Footer: Credentials & Value Statement */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 border-b border-slate-800">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-8 space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm font-heading">
              <ShieldCheck className="h-5 w-5 shrink-0" />
              <span>{t.footer.tagline}</span>
            </div>
            <p className="text-slate-300 text-sm max-w-2xl leading-relaxed">
              {t.footer.mission}
            </p>
          </div>

          <div className="md:col-span-4 flex md:justify-end">
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors cursor-pointer border border-slate-700 font-semibold"
            >
              <span>{t.common.backToTop}</span>
              <ArrowUp className="h-3.5 w-3.5 text-emerald-400" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8">
        
        {/* Brand & Corporate Reg (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="h-10 w-10 rounded-xl bg-emerald-950 border border-emerald-500/40 flex items-center justify-center shrink-0">
              <Ship className="h-5 w-5 text-emerald-400" />
            </div>
            <div>
              <span className="text-base font-extrabold text-white font-heading block">
                {language === 'ar' ? 'جرين بلك ماريتيم المحدودة' : 'GREEN BULK MARITIME LTD.'}
              </span>
              <span className="text-[10px] text-emerald-400 uppercase tracking-widest font-mono">
                {language === 'ar' ? `تأسست عام ${COMPANY_DETAILS.establishedYear} • الفجيرة، الإمارات` : `Est. ${COMPANY_DETAILS.establishedYear} • Fujairah, UAE`}
              </span>
            </div>
          </div>

          <p className="text-slate-400 leading-relaxed text-xs">
            {t.footer.description}
          </p>

          <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/80 space-y-1 text-[11px]">
            <div className="text-slate-200 font-bold flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
              <span>
                {language === 'ar' ? 'بناية صندوق رعاية الفجيرة، مكتب 612' : COMPANY_DETAILS.headquarters.building}
              </span>
            </div>
            <div className="text-emerald-400 pl-5 pr-5 font-medium">
              {language === 'ar' ? 'بالقرب من محطة الحافلات المركزية، شارع السلام' : COMPANY_DETAILS.headquarters.landmark}
            </div>
            <div className="text-slate-400 pl-5 pr-5">
              {language === 'ar' ? 'الفجيرة، الإمارات العربية المتحدة' : `${COMPANY_DETAILS.headquarters.city}, ${COMPANY_DETAILS.headquarters.country}`}
            </div>
          </div>
        </div>

        {/* Sectors (3 cols) */}
        <div className="lg:col-span-3 space-y-3">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider font-heading">
            {t.footer.sectorsHeader}
          </h4>
          <ul className="space-y-2 text-slate-300">
            <li>
              <a href="#sectors" className="hover:text-emerald-400 transition-colors">
                {language === 'ar' ? 'الزراعة والأسمدة السائبة' : 'Agriculture & Fertilizers'}
              </a>
            </li>
            <li>
              <a href="#sectors" className="hover:text-emerald-400 transition-colors">
                {language === 'ar' ? 'بنية الطاقة ومحطات التحويل والمرافق' : 'Energy & Utilities Infrastructure'}
              </a>
            </li>
            <li>
              <a href="#sectors" className="hover:text-emerald-400 transition-colors">
                {language === 'ar' ? 'أنابيب النفط والغاز والصمامات البحرية' : 'Oil & Gas Piping (API 5L) & Valves'}
              </a>
            </li>
            <li>
              <a href="#sectors" className="hover:text-emerald-400 transition-colors">
                {language === 'ar' ? 'الحديد الإنشائي ومواد البناء الكبرى' : 'Construction & Structural Steel'}
              </a>
            </li>
            <li>
              <a href="#sectors" className="hover:text-emerald-400 transition-colors">
                {language === 'ar' ? 'المعدات الطبية والرعاية الصحية الإقليمية' : 'Healthcare & Medical Equipment'}
              </a>
            </li>
          </ul>
        </div>

        {/* Operational Corridors (2 cols) */}
        <div className="lg:col-span-2 space-y-3">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider font-heading">
            {t.footer.footprintHeader}
          </h4>
          <ul className="space-y-1.5 text-slate-300">
            <li>
              <a href="#footprint" className="hover:text-emerald-400 transition-colors">
                {language === 'ar' ? 'الإمارات (المقر العالمي)' : 'UAE (Global HQ)'}
              </a>
            </li>
            <li>
              <a href="#footprint" className="hover:text-emerald-400 transition-colors">
                {language === 'ar' ? 'مصر وقناة السويس' : 'Egypt & Suez Canal'}
              </a>
            </li>
            <li>
              <a href="#footprint" className="hover:text-emerald-400 transition-colors">
                {language === 'ar' ? 'المغرب وميناء طنجة المتوسط' : 'Morocco & Tanger Med'}
              </a>
            </li>
            <li>
              <a href="#footprint" className="hover:text-emerald-400 transition-colors">
                {language === 'ar' ? 'تونس' : 'Tunisia'}
              </a>
            </li>
            <li>
              <a href="#footprint" className="hover:text-emerald-400 transition-colors">
                {language === 'ar' ? 'غانا (تيما / تاكورادي)' : 'Ghana (Tema/Takoradi)'}
              </a>
            </li>
            <li>
              <a href="#footprint" className="hover:text-emerald-400 transition-colors">
                {language === 'ar' ? 'نيجيريا (أبابا / أوني)' : 'Nigeria (Apapa/Onne)'}
              </a>
            </li>
            <li>
              <a href="#footprint" className="hover:text-emerald-400 transition-colors">
                {language === 'ar' ? 'أوغندا وشرق أفريقيا' : 'Uganda & East Africa'}
              </a>
            </li>
            <li>
              <a href="#footprint" className="hover:text-emerald-400 transition-colors">
                {language === 'ar' ? 'جنوب أفريقيا (ديربان)' : 'South Africa (Durban)'}
              </a>
            </li>
          </ul>
        </div>

        {/* Official Channels (3 cols) */}
        <div className="lg:col-span-3 space-y-3">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider font-heading">
            {t.footer.channelsHeader}
          </h4>
          <div className="space-y-2.5 text-slate-300">
            <div>
              <span className="text-slate-400 block text-[10px]">{t.footer.phone5Lines}</span>
              <a 
                href={`tel:${COMPANY_DETAILS.contact.telephone.replace(/\s+/g, '')}`} 
                dir="ltr" 
                className="text-white hover:text-emerald-400 font-mono font-bold inline-block"
              >
                {COMPANY_DETAILS.contact.telephone}
              </a>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px]">{t.footer.mobileDesk}</span>
              <a 
                href={`tel:${COMPANY_DETAILS.contact.mobile.replace(/\s+/g, '')}`} 
                dir="ltr" 
                className="text-teal-300 hover:underline font-mono font-medium inline-block"
              >
                {COMPANY_DETAILS.contact.mobile}
              </a>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px]">{t.footer.corpEmail}</span>
              <a 
                href={`mailto:${COMPANY_DETAILS.contact.email}`} 
                dir="ltr" 
                className="text-emerald-400 hover:underline font-mono inline-block"
              >
                {COMPANY_DETAILS.contact.email}
              </a>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px]">{t.footer.officialWeb}</span>
              <span dir="ltr" className="text-slate-200 font-mono inline-block">{COMPANY_DETAILS.contact.website}</span>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Bar: Copyright & Compliance */}
      <div className="bg-slate-950 py-6 px-4 sm:px-6 border-t border-slate-800/80">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-400">
          <div>
            © {new Date().getFullYear()} {language === 'ar' ? 'جرين بلك ماريتيم المحدودة' : COMPANY_DETAILS.name}. {t.footer.rightsReserved}
          </div>
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <span>{t.footer.compliance1}</span>
            <span>•</span>
            <span>{t.footer.compliance2}</span>
            <span>•</span>
            <span className="text-emerald-400 font-semibold">{t.footer.compliance3}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
