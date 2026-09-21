import React, { useState } from 'react';
import { 
  Globe2, 
  MapPin, 
  Anchor, 
  Ship, 
  Navigation,
  Send
} from 'lucide-react';
import { COUNTRY_HUBS } from '../data/companyData';
import { CountryHub } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface FootprintMapSectionProps {
  onContactHub?: (countryName: string) => void;
}

const HUB_DETAILS_AR: Record<string, {
  country: string;
  region: string;
  role: string;
  description: string;
  ports: string[];
  sectors: string[];
}> = {
  uae: {
    country: 'الإمارات العربية المتحدة',
    region: 'الشرق الأوسط والخليج العربي',
    role: 'المقر الرئيسي والمستودع المركزي',
    description: 'مقر القيادة والتخليص التمويلي وشحن البضائع السائبة في الفجيرة، بجوار خطوط تموين السفن الدولية في خليج عمان ومضيق هرمز.',
    ports: ['ميناء الفجيرة', 'ميناء جبل علي (دبي)', 'ميناء خليفة (أبوظبي)'],
    sectors: ['إدارة التوريد الدولي', 'الشحن البحري والوساطة', 'التمويل والتسهيلات البنكية', 'اللوجستيات متعددة الوسائط'],
  },
  egypt: {
    country: 'مصر',
    region: 'شمال أفريقيا والبحر الأبيض المتوسط',
    role: 'محور لوجستي رئيسي للبحرين المتوسط والأحمر',
    description: 'مركز عبور استراتيجي للبحر الأبيض المتوسط والبحر الأحمر مع وصول مباشر لمشاريع البنية التحتية والزراعية السيادية.',
    ports: ['ميناء الإسكندرية', 'ميناء دمياط', 'ميناء بورسعيد', 'ميناء السخنة'],
    sectors: ['حديد التسليح والإنشاءات', 'الآلات والمعدات الزراعية', 'معدات الطاقة والمحولات', 'معدات المستشفيات'],
  },
  morocco: {
    country: 'المغرب',
    region: 'شمال أفريقيا والمحيط الأطلسي',
    role: 'بوابة غرب المتوسط والمحيط الأطلسي',
    description: 'تفريغ بحري متخصص وتخليص لمشاريع الطاقة المتجددة ومحطات التوليد والصناعات الثقيلة عبر طنجة المتوسط والدار البيضاء.',
    ports: ['ميناء طنجة المتوسط', 'ميناء الدار البيضاء', 'ميناء الجرف الأصفر'],
    sectors: ['معدات الطاقة المتجددة', 'الآلات الصناعية', 'الصلب الإنشائي', 'الأجهزة الطبية'],
  },
  ghana: {
    country: 'غانا',
    region: 'غرب أفريقيا والمحيط الأطلسي',
    role: 'محور التجارة لغرب أفريقيا',
    description: 'محور إقليمي يخدم مشاريع الطاقة والبنية التحتية والمناجم عبر مينائي تيما وتاكورادي مع ممرات برية لدول الجوار.',
    ports: ['ميناء تيما', 'ميناء تاكورادي'],
    sectors: ['محولات ومولدات الكهرباء', 'أنابيب النفط والغاز', 'معدات المناجم والإنشاءات', 'الأسمدة الزراعية'],
  },
  'south-africa': {
    country: 'جنوب أفريقيا',
    region: 'الجنوب الأفريقي والمحيط الهندي/الأطلسي',
    role: 'محور الشحن الإقليمي الجنوبي',
    description: 'نقطة ربط بحرية استراتيجية لشحنات التعدين والصناعات الثقيلة والمحولات الكبرى عبر ديربان وكيب تاون.',
    ports: ['ميناء ديربان', 'ميناء كيب تاون', 'ميناء نغكورا (كوها)'],
    sectors: ['الآلات الصناعية الثقيلة', 'الأنابيب والصمامات', 'البنية التحتية للطاقة', 'المعدات الطبية'],
  },
  nigeria: {
    country: 'نيجيريا',
    region: 'غرب أفريقيا وخليج غينيا',
    role: 'مركز إمدادات الطاقة والصناعة',
    description: 'محور تفريغ متخصص للصلب الإنشائي وأنابيب النفط والغاز والتجهيزات الطبية لمشاريع القطاعين الحكومي والنفطي.',
    ports: ['ميناء أبايا (لاغوس)', 'ميناء تين كان آيلاند', 'ميناء أوني النفطي'],
    sectors: ['أنابيب وصمامات البترول API', 'الحديد الإنشائي', 'المحولات الكهربائية', 'معدات المستشفيات'],
  },
};

export const FootprintMapSection: React.FC<FootprintMapSectionProps> = ({ onContactHub }) => {
  const { t, isRTL, language } = useLanguage();
  const [selectedHubId, setSelectedHubId] = useState<string>(COUNTRY_HUBS[0].id);

  const baseHub = COUNTRY_HUBS.find(h => h.id === selectedHubId) || COUNTRY_HUBS[0];
  const arDetails = language === 'ar' && HUB_DETAILS_AR[baseHub.id] ? HUB_DETAILS_AR[baseHub.id] : null;

  const currentHub = {
    ...baseHub,
    country: arDetails ? arDetails.country : baseHub.country,
    region: arDetails ? arDetails.region : baseHub.region,
    role: arDetails ? arDetails.role : baseHub.role,
    description: arDetails ? arDetails.description : baseHub.description,
    primaryPorts: arDetails ? arDetails.ports : baseHub.primaryPorts,
    sectorsHandled: arDetails ? arDetails.sectors : baseHub.sectorsHandled,
  };

  const handleInquireHub = (country: string) => {
    if (onContactHub) {
      onContactHub(country);
    } else {
      const el = document.getElementById('contact');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const getHubImage = (id: string) => {
    switch (id) {
      case 'uae':
        return 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80';
      case 'egypt':
        return 'https://images.unsplash.com/photo-1572252009286-268acec5ca0a?auto=format&fit=crop&w=800&q=80';
      case 'morocco':
        return 'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?auto=format&fit=crop&w=800&q=80';
      case 'ghana':
        return 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=800&q=80';
      case 'south-africa':
        return 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=800&q=80';
      case 'nigeria':
        return 'https://images.unsplash.com/photo-1618828665011-0abd973f7bb8?auto=format&fit=crop&w=800&q=80';
      default:
        return 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=800&q=80';
    }
  };

  return (
    <section id="footprint" className="py-20 bg-slate-50 border-b border-slate-200 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider">
            <Globe2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
            <span>{t.footprint.badge}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 font-heading tracking-tight">
            {t.footprint.title}
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            {t.footprint.subtitle}
          </p>
        </div>

        {/* Interactive Country Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {COUNTRY_HUBS.map((hub) => {
            const isSelected = selectedHubId === hub.id;
            const buttonName = language === 'ar' && HUB_DETAILS_AR[hub.id] 
              ? HUB_DETAILS_AR[hub.id].country 
              : hub.country;

            return (
              <button
                key={hub.id}
                onClick={() => setSelectedHubId(hub.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-700/20 ring-2 ring-emerald-600/20'
                    : 'bg-white text-slate-700 hover:text-slate-900 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {hub.id === 'uae' ? (
                  <Anchor className={`h-4 w-4 shrink-0 ${isSelected ? 'text-white' : 'text-emerald-700'}`} />
                ) : (
                  <MapPin className={`h-4 w-4 shrink-0 ${isSelected ? 'text-white' : 'text-emerald-700'}`} />
                )}
                <span>{buttonName}</span>
                {hub.id === 'uae' && (
                  <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${isSelected ? 'bg-white/20 text-white' : 'bg-emerald-100 text-emerald-800'}`}>
                    {t.footprint.globalHqBadge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Main Hub Detail Card with Visual Showcase */}
        <div className="rounded-3xl border border-slate-200 bg-white shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            
            {/* Visual Image & Region Details (5 cols) */}
            <div className="lg:col-span-5 relative bg-slate-900 min-h-[320px] lg:min-h-[420px] flex flex-col justify-between overflow-hidden">
              <img 
                src={getHubImage(currentHub.id)} 
                alt={`${currentHub.country} maritime trade corridor`}
                className="absolute inset-0 w-full h-full object-cover opacity-90 transition-transform duration-700 hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950/20" />

              {/* Floating Header */}
              <div className="relative p-6 z-10 flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-slate-900 text-xs font-bold shadow-md">
                  <Navigation className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                  <span>{currentHub.region}</span>
                </span>

                <span className="px-3 py-1 rounded-full bg-emerald-600 text-white text-xs font-bold shadow-md">
                  {currentHub.role}
                </span>
              </div>

              {/* Bottom Card Title */}
              <div className="relative p-6 z-10 text-white space-y-2">
                <h3 className="text-2xl font-black font-heading">
                  {currentHub.country} — {currentHub.role}
                </h3>
                <p className="text-xs text-slate-200 leading-relaxed max-w-md">
                  {currentHub.description}
                </p>
                <div className="pt-2 text-xs font-semibold text-emerald-400">
                  {currentHub.establishedProjects}+ {t.footprint.completedDeliveries}
                </div>
              </div>
            </div>

            {/* Key Ports, Sectors Handled & Dispatch (7 cols) */}
            <div className="lg:col-span-7 p-6 sm:p-8 space-y-6 flex flex-col justify-between bg-white">
              
              <div className="space-y-6">
                {/* Ports */}
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase tracking-wider mb-3 font-heading">
                    <Anchor className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span>{t.footprint.portsHeader}</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {currentHub.primaryPorts.map((port, idx) => (
                      <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2">
                        <Ship className="h-4 w-4 text-teal-600 shrink-0" />
                        <span className="text-xs font-semibold text-slate-800">{port}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sectors Handled */}
                <div>
                  <div className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3 font-heading">
                    {t.footprint.sectorsHeader} {currentHub.country}:
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {currentHub.sectorsHandled.map((sec, idx) => (
                      <span key={idx} className="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-900 border border-emerald-200 text-xs font-semibold">
                        {sec}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Logistics note */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1">
                  <div className="font-bold text-slate-900">
                    {language === 'ar' ? 'الملاحظة اللوجستية والعمليات الملاحية:' : 'Logistics Coordination & Vessel Chartering:'}
                  </div>
                  <p>
                    {language === 'ar' 
                      ? 'تنسيق مباشر مع الناقلات البحرية وسفن البضائع العامة لضمان الالتزام بمواعيد الشحن المجدولة وإجراءات التخليص الجمركي في موانئ الوصول.' 
                      : 'Direct chartered Handymax vessels and regular liner commitments ensure predictable transit schedules and compliant bonded delivery to designated ports.'}
                  </p>
                </div>
              </div>

              {/* Call to action for this country */}
              <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-xs text-slate-500">
                  {t.footprint.dispatchCta} {currentHub.country}
                </span>

                <button
                  onClick={() => handleInquireHub(currentHub.country)}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-emerald-700/20 hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 shrink-0"
                >
                  <Send className="h-4 w-4 shrink-0" />
                  <span>{t.footprint.dispatchCta} {currentHub.country}</span>
                </button>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
