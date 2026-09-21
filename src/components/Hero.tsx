import React from 'react';
import { 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Anchor,
  Phone,
  Award
} from 'lucide-react';
import { COMPANY_DETAILS } from '../data/companyData';
import { useLanguage } from '../context/LanguageContext';

interface HeroProps {
  onContactClick: () => void;
  onExploreClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onContactClick, onExploreClick }) => {
  const { t, isRTL, language } = useLanguage();

  const localizedStats = [
    {
      value: language === 'ar' ? '20 عاماً' : '20 Years',
      label: language === 'ar' ? 'خبرة راسخة منذ 2006' : 'Established Since 2006',
      description: language === 'ar' ? 'عقدان من الموثوقية في توريد المناقصات الحكومية والشارتر البحري' : 'Two decades of sovereign public tender fulfillment and maritime chartering',
    },
    {
      value: language === 'ar' ? '+450,000' : '450,000+',
      label: language === 'ar' ? 'طن سنوي من البضائع الصب' : 'Metric Tons Annual Bulk',
      description: language === 'ar' ? 'شحنات صب، وحاويات، ومواد خام، ومعدات صناعية ثقيلة' : 'Bulk commodities, steel, industrial machinery, and project supplies',
    },
    {
      value: language === 'ar' ? '+380' : '380+',
      label: language === 'ar' ? 'مناقصة وعقد حكومي منفذ' : 'Sovereign Tenders Executed',
      description: language === 'ar' ? 'توريدات للوزارات والهيئات العامة وائتلافات مقاولات الـ EPC' : 'Supplies to ministries, national authorities, and EPC consortia',
    },
    {
      value: language === 'ar' ? '8 ممرات' : '8 Corridors',
      label: language === 'ar' ? 'ممرات ومراكز تجارية أفريقية' : 'Pan-African Trade Hubs',
      description: language === 'ar' ? 'ربط موانئ الإمارات ومصر والمغرب وغانا وجنوب أفريقيا' : 'Direct maritime routing from Fujairah to Red Sea, Med, and Atlantic',
    },
  ];

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50 border-b border-slate-200">
      {/* Background Decorative Grid & Subtle Radial Glow */}
      <div className="absolute inset-0 bg-maritime-grid opacity-70 pointer-events-none" />
      <div className="absolute top-16 right-0 w-[600px] h-[500px] bg-emerald-100/50 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[500px] h-[400px] bg-cyan-100/40 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Hero Copy (7 columns on large screens) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Top Sovereign & Est. 2006 Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold tracking-wide shadow-xs">
              <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
              <span>{t.hero.badge}</span>
            </div>

            {/* Hero Main Heading */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.18] font-heading">
              {t.hero.headingStart}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-700 to-cyan-700">
                {t.hero.headingHighlight}
              </span>{' '}
              {t.hero.headingEnd}
            </h1>

            {/* Subtitle / Executive Overview */}
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
              {t.hero.leadDescription}
            </p>

            {/* Key Focus Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 text-xs text-slate-700">
              {t.hero.features.map((feature, idx) => (
                <div key={idx} className="p-2.5 rounded-xl bg-white border border-slate-200/80 shadow-xs flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span className="font-semibold text-slate-800">{feature}</span>
                </div>
              ))}
            </div>

            {/* CTAs: Contact Us & Explore Sectors */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                onClick={onContactClick}
                id="hero-contact-cta-btn"
                className="group px-7 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm tracking-wide transition-all shadow-lg shadow-emerald-700/25 hover:shadow-xl hover:shadow-emerald-700/35 flex items-center gap-3 cursor-pointer active:scale-95"
              >
                <span>{t.hero.partnerCta}</span>
                <ArrowRight className={`h-4 w-4 transition-transform ${isRTL ? 'group-hover:-translate-x-1 rotate-180' : 'group-hover:translate-x-1'}`} />
              </button>

              <button
                onClick={onExploreClick}
                id="hero-explore-sectors-btn"
                className="px-6 py-4 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 font-semibold text-sm transition-all shadow-xs flex items-center gap-2 cursor-pointer hover:border-slate-400"
              >
                <span>{t.hero.exploreCta}</span>
              </button>
            </div>

            {/* Corporate Location Note */}
            <div className="pt-2 text-xs text-slate-500 flex items-center gap-2">
              <Anchor className="h-4 w-4 text-emerald-600 shrink-0" />
              <span>{t.hero.locationNote}</span>
            </div>
          </div>

          {/* Right Column: High-Impact Visual Showcase with Real Port & Cargo Imagery (5 columns) */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Hero Main Feature Card with Real Port Image */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200/80 bg-white group">
              <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-slate-100">
                <img 
                  src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1000&q=80" 
                  alt="Port of Fujairah Bulk Cargo Terminal" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                
                {/* Floating Badge on Image */}
                <div className="absolute top-4 left-4 right-auto inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md text-slate-900 text-xs font-bold shadow-md">
                  <Anchor className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                  <span>{language === 'ar' ? 'ميناء الفجيرة • بوابة المحيط الهندي المباشرة' : 'Port of Fujairah Nexus • Direct Indian Ocean Gate'}</span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-xs uppercase tracking-widest text-emerald-400 font-bold block">
                    {language === 'ar' ? 'مركز استراتيجي على المحيط الهندي' : 'Strategic Indian Ocean Hub'}
                  </span>
                  <h3 className="text-lg font-bold font-heading">
                    {language === 'ar' ? 'ربط الصناعات الثقيلة العالمية بالأسواق الناشئة' : 'Connecting Global Heavy Industry to Emerging Markets'}
                  </h3>
                </div>
              </div>

              {/* Sub-card Details */}
              <div className="p-5 bg-white space-y-3">
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-slate-500 block text-[11px] font-medium">
                      {language === 'ar' ? 'المقر المؤسسي' : 'Headquarters'}
                    </span>
                    <span className="text-slate-900 font-bold text-sm">
                      {language === 'ar' ? 'الفجيرة، الإمارات' : 'Fujairah, UAE'}
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-slate-500 block text-[11px] font-medium">
                      {language === 'ar' ? 'الانتشار القاري' : 'Continental Reach'}
                    </span>
                    <span className="text-slate-900 font-bold text-sm">
                      {language === 'ar' ? 'شمال وغرب وشرق أفريقيا' : 'North, West & East Africa'}
                    </span>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between text-xs border-t border-slate-100">
                  <div className="flex items-center gap-1.5 text-slate-600">
                    <Award className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span className="font-semibold text-slate-800">
                      {language === 'ar' ? '+380 مناقصة حكومية' : '380+ Sovereign Tenders'}
                    </span>
                  </div>
                  <a 
                    href="#contact" 
                    onClick={onContactClick} 
                    className="text-emerald-700 font-bold hover:underline flex items-center gap-1"
                  >
                    <span>{language === 'ar' ? 'مكتب المناقصات' : 'Contact Bidding Desk'}</span>
                    <span className={isRTL ? 'rotate-180' : ''}>→</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Contact Bar */}
            <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 flex items-center justify-between text-xs gap-3">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs shrink-0">
                  <Phone className="h-4 w-4" />
                </div>
                <div>
                  <span className="text-slate-600 text-[11px] block">
                    {language === 'ar' ? 'البدالة الرئيسية (5 خطوط)' : 'Corporate Switchboard (5 Lines)'}
                  </span>
                  <a href={`tel:${COMPANY_DETAILS.contact.telephone.replace(/\s+/g, '')}`} className="font-bold text-slate-900 hover:text-emerald-700 font-mono text-sm" dir="ltr">
                    {COMPANY_DETAILS.contact.telephone}
                  </a>
                </div>
              </div>
              <button
                onClick={onContactClick}
                className="px-3.5 py-2 rounded-lg bg-white border border-emerald-300 text-emerald-800 font-bold text-xs hover:bg-emerald-100 transition-colors shadow-xs shrink-0 cursor-pointer"
              >
                {language === 'ar' ? 'استفسر الآن' : 'Inquire Now'}
              </button>
            </div>

          </div>

        </div>

        {/* Live Metrics Grid on White Surface */}
        <div className="mt-16 pt-10 border-t border-slate-200 grid grid-cols-2 md:grid-cols-4 gap-6">
          {localizedStats.map((stat, idx) => (
            <div key={idx} className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
              <div className="text-2xl sm:text-3xl font-black text-slate-900 font-heading">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm font-bold text-emerald-700 mt-1">
                {stat.label}
              </div>
              <div className="text-xs text-slate-500 mt-1 leading-relaxed">
                {stat.description}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
