import React, { useState } from 'react';
import { 
  Tractor, 
  Zap, 
  Flame, 
  Building, 
  Stethoscope, 
  CheckCircle2, 
  Package, 
  Clock, 
  Send
} from 'lucide-react';
import { KEY_SECTORS } from '../data/companyData';
import { useLanguage } from '../context/LanguageContext';

interface SectorsSectionProps {
  onContactSector?: (sectorName: string) => void;
}

const SECTOR_DETAILS_AR: Record<string, {
  name: string;
  shortDescription: string;
  scopeOfSupply: string[];
  keyMaterials: string[];
  sampleContracts: string[];
  leadTimeWeeks: string;
}> = {
  agriculture: {
    name: 'الزراعة والأمن الغذائي',
    shortDescription: 'الأمن الغذائي الوطني، والزراعة الآلية التجارية، ومستلزمات الإنتاج الزراعي بالجملة.',
    scopeOfSupply: [
      'آلات وجرارات زراعية ثقيلة لمشاريع الاستصلاح',
      'أسمدة اليوريا والفوسفات بكميات ضخمة وسفن شحن كاملة',
      'صوامع حبوب فولاذية وأنظمة تفريغ وتهوية بحرية',
      'أنظمة ري محوري حديثة ومضخات أعماق غاطسة',
      'معدات معالجة وتعبئة وفرز المحاصيل الزراعية',
    ],
    keyMaterials: ['سماد يوريا 46% نتروجين', 'فوسفات ثنائي الأمونيوم DAP', 'فولاذ مجلفن للصوامع', 'جرارات 85-220 حصان'],
    sampleContracts: ['مشروع استصلاح زراعي سيادي 50,000 هكتار', 'برنامج توريد أسمدة وطني 120,000 طن متري', 'مجمع صوامع غلال بحرية'],
    leadTimeWeeks: '4-8 أسابيع',
  },
  energy: {
    name: 'الطاقة والمرافق العامة',
    shortDescription: 'البنية التحتية لتوليد الكهرباء، ومعدات شبكات الضغط العالي، ومحطات الطاقة المتجددة.',
    scopeOfSupply: [
      'محولات كهرباء قدرة فائقة ومحطات تحويل رئيسية',
      'كابلات نقل طاقة وموصلات ألمنيوم مقوى (ACSR)',
      'توربينات ومولدات ديزل وغاز احتياطية عملاقة',
      'ألواح وخلايا طاقة شمسية ومحولات عاكسة مركزية',
      'أبراج خطوط نقل الكهرباء والمفاتيح المعزولة بالغاز (GIS)',
    ],
    keyMaterials: ['محولات 33kV/132kV/400kV', 'كابلات XLPE معزولة', 'ألواح شمسية Tier-1 بقدرة 550W+', 'مفاتيح معزولة GIS'],
    sampleContracts: ['توريد كابلات ومحولات للشبكة الوطنية الموحدة', 'حزمة معدات محطة طاقة شمسية 150MW', 'مولدات طوارئ للمستشفيات العامة'],
    leadTimeWeeks: '6-12 أسبوعاً',
  },
  'oil-and-gas': {
    name: 'النفط والغاز والبتروكيماويات',
    shortDescription: 'مستلزمات الحفر والاستكشاف، وأنابيب خطوط النقل، وصمامات محطات التكرير.',
    scopeOfSupply: [
      'أنابيب نقل بترولية API 5L (مغمورة وملحومة)',
      'مجموعات صمامات الضغط العالي والبوابية والكروية',
      'أنابيب حفر وبطانات آبار النفط (OCTG)',
      'مضخات صناعية ومعدات فواصل نفطية لمواقع الإنتاج',
      'وصلات وشفاه وفولاذ سبائكي مخصص للمصافي',
    ],
    keyMaterials: ['أنابيب API 5L Grade X52/X65/X70', 'صمامات ضغط Class 150-2500', 'فولاذ دوبلكس مقاوم للتآكل', 'أنابيب تبادل حراري ASTM'],
    sampleContracts: ['عقد توريد خط أنابيب بحري وبري بطول 140 كم', 'توريد صمامات لمحطة تكرير ساحلية', 'شحنات دورية لأنابيب تغليف آبار الحفر'],
    leadTimeWeeks: '8-14 أسبوعاً',
  },
  construction: {
    name: 'الإنشاءات والبنية التحتية',
    shortDescription: 'معدات الهندسة المدنية، وحديد التسليح الإنشائي، ومواد البناء الأساسية بالجملة.',
    scopeOfSupply: [
      'حديد تسليح عالي المقاومة وكمرات فولاذية للمشاريع الكبرى',
      'إسمنت بورتلاندي وكلنكر بكميات شحنات بحرية كاملة',
      'حفارات وشاحنات تفريغ وروافع برجية ثقيلة',
      'قوالب صب هندسية وسقالات فولاذية متطورة',
      'مواد عزل وبوليمرات إنشائية ومضافات خرسانية معتمدة',
    ],
    keyMaterials: ['حديد تسليح ASTM A615 Grade 60', 'إسمنت CEM I 42.5R/52.5N', 'فولاذ إنشائي EN 10025 S355', 'روافع وشاحنات تفريغ 40 طن'],
    sampleContracts: ['توريد 65,000 طن حديد لميناء بحري جديد', 'توريد إسمنت وكلنكر لمشروع جسور وطني', 'حزم آليات ثقيلة لتوسعة مطار دولي'],
    leadTimeWeeks: '3-6 أسابيع',
  },
  healthcare: {
    name: 'الرعاية الصحية والمعدات الطبية',
    shortDescription: 'تجهيزات المستشفيات التخصصية، ومعدات التشخيص المتقدمة، والمستهلكات الطبية للمؤسسات.',
    scopeOfSupply: [
      'أجهزة رنين مغناطيسي وأشعة مقطعية وتشخيص متقدم',
      'تجهيزات غرف العمليات ووحدات العناية المركزة (ICU)',
      'محطات توليد وتوزيع الأكسجين الطبي للمستشفيات',
      'أسرة طبية كهربائية وأثاث مستشفيات تخصصي معتمد',
      'مستهلكات طبية معقمة وحزم جراحية بكميات مؤسسية',
    ],
    keyMaterials: ['أجهزة تصوير رنين MRI 1.5T/3.0T', 'محطات توليد أكسجين بنقاوة 95%±1', 'أجهزة تنفس صناعي متطورة', 'مجموعات جراحية ISO 13485'],
    sampleContracts: ['تجهيز مجمع طبي جامعي بسعة 400 سرير', 'توريد 15 محطة أكسجين للمستشفيات الإقليمية', 'عقد توريد مستهلكات طبية وطني'],
    leadTimeWeeks: '4-8 أسابيع',
  },
};

export const SectorsSection: React.FC<SectorsSectionProps> = ({ onContactSector }) => {
  const { t, isRTL, language } = useLanguage();
  const [selectedSectorId, setSelectedSectorId] = useState<string>(KEY_SECTORS[0].id);

  const baseSector = KEY_SECTORS.find(s => s.id === selectedSectorId) || KEY_SECTORS[0];

  const localizedDetails = language === 'ar' && SECTOR_DETAILS_AR[baseSector.id] 
    ? SECTOR_DETAILS_AR[baseSector.id]
    : null;

  const activeSector = {
    ...baseSector,
    name: localizedDetails ? localizedDetails.name : baseSector.name,
    shortDescription: localizedDetails ? localizedDetails.shortDescription : baseSector.shortDescription,
    scopeOfSupply: localizedDetails ? localizedDetails.scopeOfSupply : baseSector.scopeOfSupply,
    keyMaterials: localizedDetails ? localizedDetails.keyMaterials : baseSector.keyMaterials,
    sampleContracts: localizedDetails ? localizedDetails.sampleContracts : baseSector.sampleContracts,
    leadTimeWeeks: localizedDetails ? localizedDetails.leadTimeWeeks : baseSector.leadTimeWeeks,
  };

  const getSectorIcon = (iconName: string, className = "h-5 w-5") => {
    switch (iconName) {
      case 'Tractor': return <Tractor className={className} />;
      case 'Zap': return <Zap className={className} />;
      case 'Flame': return <Flame className={className} />;
      case 'Building': return <Building className={className} />;
      case 'Stethoscope': return <Stethoscope className={className} />;
      default: return <Package className={className} />;
    }
  };

  const handleInquireSector = (sectorName: string) => {
    if (onContactSector) {
      onContactSector(sectorName);
    } else {
      const el = document.getElementById('contact');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section id="sectors" className="py-20 bg-white border-b border-slate-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider">
            <Package className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
            <span>{t.sectors.badge}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 font-heading tracking-tight">
            {t.sectors.title}
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            {t.sectors.subtitle}
          </p>
        </div>

        {/* Sector Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10">
          {KEY_SECTORS.map((sector) => {
            const isActive = sector.id === selectedSectorId;
            const tabName = language === 'ar' && SECTOR_DETAILS_AR[sector.id] 
              ? SECTOR_DETAILS_AR[sector.id].name 
              : sector.name;

            return (
              <button
                key={sector.id}
                onClick={() => setSelectedSectorId(sector.id)}
                className={`flex items-center gap-2 px-4 sm:px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-700/25 ring-2 ring-emerald-600/20'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200/80 border border-slate-200/80'
                }`}
              >
                {getSectorIcon(sector.iconName, `h-4 w-4 shrink-0 ${isActive ? 'text-white' : 'text-emerald-700'}`)}
                <span>{tabName}</span>
              </button>
            );
          })}
        </div>

        {/* Active Sector Showcase Card with Real Sector Image */}
        <div className="rounded-3xl border border-slate-200 bg-white shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            
            {/* Photography Column (5 cols) */}
            <div className="lg:col-span-5 relative bg-slate-900 flex flex-col justify-between overflow-hidden min-h-[350px] lg:min-h-[460px]">
              <img 
                src={activeSector.imageUrl || 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=900&q=80'} 
                alt={activeSector.name}
                className="absolute inset-0 w-full h-full object-cover opacity-90 transition-transform duration-700 hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950/10" />

              {/* Top floating pill */}
              <div className="relative p-6 z-10 flex items-center justify-between gap-2">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md text-slate-900 text-xs font-bold shadow-md">
                  {getSectorIcon(activeSector.iconName, "h-4 w-4 text-emerald-700 shrink-0")}
                  <span>{activeSector.name}</span>
                </div>

                <div className="px-3 py-1 rounded-full bg-slate-900/90 text-white text-xs font-semibold backdrop-blur-md flex items-center gap-1.5 border border-white/20">
                  <Clock className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                  <span>{t.sectors.leadLabel}: {activeSector.leadTimeWeeks}</span>
                </div>
              </div>

              {/* Bottom Overlay Info on Picture */}
              <div className="relative p-6 z-10 text-white space-y-3">
                <h3 className="text-xl sm:text-2xl font-bold font-heading">
                  {activeSector.name}
                </h3>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed max-w-md">
                  {activeSector.shortDescription}
                </p>

                {/* Standard Incoterms pill */}
                <div className="pt-2 flex flex-wrap gap-1.5 text-[11px]">
                  {activeSector.standardIncoterms.map((term, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded-md bg-white/20 text-white backdrop-blur-sm border border-white/20 font-mono">
                      {term}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Scope, Key Materials, & RFP CTA (7 cols) */}
            <div className="lg:col-span-7 p-6 sm:p-8 space-y-6 flex flex-col justify-between bg-white">
              
              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3 font-heading">
                  {t.sectors.scopeHeader}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {activeSector.scopeOfSupply.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="text-xs text-slate-800 font-medium leading-snug">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Materials & Sample Contracts */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100 space-y-2">
                  <div className="text-[11px] font-bold text-emerald-900 uppercase tracking-wider font-heading">
                    {t.sectors.specsHeader}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {activeSector.keyMaterials.map((mat, i) => (
                      <span key={i} className="text-xs bg-white text-slate-800 px-2.5 py-1 rounded-lg border border-emerald-200 font-medium shadow-2xs">
                        {mat}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="text-[11px] font-bold text-slate-900 uppercase tracking-wider font-heading">
                    {t.sectors.contractsHeader}
                  </div>
                  <ul className="text-xs text-slate-600 space-y-1">
                    {activeSector.sampleContracts.map((cnt, i) => (
                      <li key={i} className="truncate" title={cnt}>
                        • {cnt}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Call To Action for this Sector */}
              <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-slate-500">
                  {language === 'ar' 
                    ? 'عروض أسعار مباشرة وملفات فنية معتمدة تُقدّم خلال 24 ساعة.' 
                    : 'Direct procurement quotes and technical dossiers provided within 24 hours.'}
                </div>

                <button
                  onClick={() => handleInquireSector(activeSector.name)}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-emerald-700/20 hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 shrink-0"
                >
                  <Send className="h-4 w-4" />
                  <span>{t.sectors.inquireSectorBtn} {activeSector.name}</span>
                </button>
              </div>

            </div>

          </div>
        </div>

        {/* Bottom Sector Cards Grid Preview */}
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {KEY_SECTORS.map((sec) => {
            const cardName = language === 'ar' && SECTOR_DETAILS_AR[sec.id] 
              ? SECTOR_DETAILS_AR[sec.id].name 
              : sec.name;

            return (
              <div
                key={sec.id}
                onClick={() => setSelectedSectorId(sec.id)}
                className={`rounded-2xl overflow-hidden border cursor-pointer transition-all ${
                  sec.id === selectedSectorId 
                    ? 'border-emerald-600 shadow-md ring-2 ring-emerald-600/20' 
                    : 'border-slate-200 hover:border-slate-300 shadow-2xs'
                }`}
              >
                <div className="h-24 w-full relative overflow-hidden bg-slate-100">
                  <img 
                    src={sec.imageUrl} 
                    alt={cardName} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-slate-950/40" />
                  <div className="absolute inset-0 p-2 flex items-center justify-center text-center">
                    <span className="text-white text-xs font-bold drop-shadow-sm font-heading">
                      {cardName}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
