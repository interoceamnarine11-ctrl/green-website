import React, { useState } from 'react';
import { 
  MapPin, 
  CheckCircle2, 
  Award, 
  Send
} from 'lucide-react';
import { PROJECT_TRACK_RECORD } from '../data/companyData';
import { useLanguage } from '../context/LanguageContext';

interface ProjectTrackRecordSectionProps {
  onContactProject?: (projectTitle: string) => void;
}

const PROJECT_TRACK_RECORD_AR: Record<string, {
  title: string;
  clientCategory: string;
  volumeMetric: string;
  summary: string;
  deliverables: string[];
  country: string;
  sector: string;
}> = {
  'proj-1': {
    title: 'توريد أسمدة اليوريا السائبة لوزارة الزراعة المصرية',
    clientCategory: 'وزارة سيادية',
    volumeMetric: '120,000 طن متري يوريا 46%',
    summary: 'تشارتر كامل عبر ناقلات بضائع صب (Handymax) مع تفريغ في ميناء الإسكندرية ودمياط وتوزيع بري على الجمعيات الزراعية الإقليمية.',
    deliverables: ['3 شحنات بحرية كاملة Handymax', 'شهادات فحص ومطابقة SGS دولية', 'تخليص جمركي وتسليم بالمخازن DDP'],
    country: 'مصر',
    sector: 'الزراعة',
  },
  'proj-2': {
    title: 'توريد كابلات ومحولات عالية الجهد للشبكة الوطنية في غانا',
    clientCategory: 'مرفق كهرباء وطني',
    volumeMetric: '48 محول توزيع وقدرة + 350 كم كابلات',
    summary: 'توريد محولات مطابقة لمعايير IEC وشحن بحري متخصص مع تفريغ مينائي تيما وتوزيع بري على محطات التحويل الرئيسية.',
    deliverables: ['محولات 33kV و11kV معتمدة', 'كابلات نحاسية وألمنيوم مدرعة', 'إشراف على التسليم والتشغيل الموقعي'],
    country: 'غانا',
    sector: 'الطاقة والمرافق العامة',
  },
  'proj-3': {
    title: 'توريد حديد تسليح عالي الشد لتوسعة رصيف ميناء الإسكندرية',
    clientCategory: 'هيئة موانئ حكومية',
    volumeMetric: '45,000 طن متري حديد تسليح',
    summary: 'توريد مباشر من مصانع الصلب العالمية المعتمدة مع جدولة شحنات دقيقة لتلبية وتيرة الصب الخرساني للأرصفة البحرية.',
    deliverables: ['حديد تسليح عالي المقاومة ASTM A615', 'تفتيش أطراف ثالثة واختبارات إجهاد', 'توصيل مباشر بجانب الرصيف DAP'],
    country: 'مصر',
    sector: 'الإنشاءات والبنية التحتية',
  },
  'proj-4': {
    title: 'توريد أنابيب خطوط نفطية API 5L وصمامات ضغط لمحطة نيجيريا',
    clientCategory: 'مشغل طاقة وطني',
    volumeMetric: '18,500 طن متري أنابيب X65 + صمامات بوابية',
    summary: 'توريد أنابيب ملحومة ومقاومة للتآكل مع شهادات تتبع كامل للمصانع، ونقل بحري لميناء أوني النفطي مع حماية خاصة للشحنات.',
    deliverables: ['أنابيب API 5L PSL2 مع طلاء 3LPE', 'صمامات ضغط Class 600-900', 'تأمين بحري شامل وتخليص موانئ خاصة'],
    country: 'نيجيريا',
    sector: 'النفط والغاز',
  },
  'proj-5': {
    title: 'حزم مفاتيح معزولة GIS ومعدات محطات تحويل للطاقة المتجددة',
    clientCategory: 'مكتب الكهرباء الوطني',
    volumeMetric: 'تجهيز 3 محطات تحويل طاقة شمسية',
    summary: 'تنسيق procurement مع كبرى الشركات المصنعة لنقل المفاتيح والمحولات فائقة الحساسية لمواقع ورزازات والعيون.',
    deliverables: ['مفاتيح كهربائية معزولة بالغاز 220kV GIS', 'ناقلات هيدروليكية خاصة للشحن البري', 'ضمانات بنكية واختبارات موقعية معتمدة'],
    country: 'المغرب',
    sector: 'الطاقة والمرافق العامة',
  },
  'proj-6': {
    title: 'تجهيز 8 مستشفيات إقليمية بأجهزة تشخيص وأشعة مقطعية ومحطات أكسجين',
    clientCategory: 'وزارة الصحة العامة',
    volumeMetric: '8 أجهزة أشعة CT مقطعية + 12 محطة أكسجين طبي',
    summary: 'توريد حزمة طبية طارئة مع تدريب الكوادر المحلية، شحن جوي وبحري سريع مع وثائق الاعتماد من منظمة الصحة العالمية.',
    deliverables: ['أجهزة أشعة مقطعية 64 و128 شريحة', 'محطات توليد أكسجين طبية نقاوة 95%+', 'عقود صيانة وقطع غيار لـ 5 سنوات'],
    country: 'أفريقيا الشرقية / أوغندا',
    sector: 'الرعاية الصحية والمعدات الطبية',
  },
};

const SECTOR_FILTERS = [
  { id: 'all', en: 'All', ar: 'الكل' },
  { id: 'agri', en: 'Agriculture', ar: 'الزراعة' },
  { id: 'energy', en: 'Energy & Utilities', ar: 'الطاقة والمرافق العامة' },
  { id: 'oil', en: 'Oil & Gas', ar: 'النفط والغاز' },
  { id: 'const', en: 'Construction & Infrastructure', ar: 'الإنشاءات والبنية التحتية' },
  { id: 'health', en: 'Healthcare & Medical', ar: 'الرعاية الصحية والمعدات الطبية' },
];

export const ProjectTrackRecordSection: React.FC<ProjectTrackRecordSectionProps> = ({ onContactProject }) => {
  const { t, isRTL, language } = useLanguage();
  const [selectedFilterId, setSelectedFilterId] = useState<string>('all');

  const getProjectSectorId = (sector: string) => {
    switch (sector) {
      case 'Agriculture': return 'agri';
      case 'Energy & Utilities': return 'energy';
      case 'Oil & Gas': return 'oil';
      case 'Construction & Infrastructure': return 'const';
      case 'Healthcare & Medical': return 'health';
      default: return 'all';
    }
  };

  const filteredProjects = selectedFilterId === 'all'
    ? PROJECT_TRACK_RECORD
    : PROJECT_TRACK_RECORD.filter(p => getProjectSectorId(p.sector) === selectedFilterId);

  const getProjectPhoto = (sector: string) => {
    switch (sector) {
      case 'Agriculture':
        return 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=700&q=80';
      case 'Energy & Utilities':
        return 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=700&q=80';
      case 'Oil & Gas':
        return 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=700&q=80';
      case 'Construction & Infrastructure':
        return 'https://images.unsplash.com/photo-1541888946425-d0fbb1861593?auto=format&fit=crop&w=700&q=80';
      case 'Healthcare & Medical':
        return 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=700&q=80';
      default:
        return 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=700&q=80';
    }
  };

  return (
    <section id="projects" className="py-20 bg-white border-b border-slate-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider">
            <Award className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
            <span>{t.projects.badge}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 font-heading tracking-tight">
            {t.projects.title}
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            {t.projects.subtitle}
          </p>
        </div>

        {/* Sector Filter Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {SECTOR_FILTERS.map((sec) => {
            const isSelected = selectedFilterId === sec.id;
            const label = language === 'ar' ? sec.ar : sec.en;

            return (
              <button
                key={sec.id}
                onClick={() => setSelectedFilterId(sec.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-700/20 ring-2 ring-emerald-600/20'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* Projects Cards Grid with Photography */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => {
            const ar = language === 'ar' && PROJECT_TRACK_RECORD_AR[project.id] 
              ? PROJECT_TRACK_RECORD_AR[project.id] 
              : null;

            const title = ar ? ar.title : project.title;
            const clientCategory = ar ? ar.clientCategory : project.clientCategory;
            const volumeMetric = ar ? ar.volumeMetric : project.volumeMetric;
            const summary = ar ? ar.summary : project.summary;
            const deliverables = ar ? ar.deliverables : project.deliverables;
            const country = ar ? ar.country : project.country;
            const sectorDisplay = ar ? ar.sector : project.sector;

            return (
              <div 
                key={project.id}
                className="rounded-3xl border border-slate-200 bg-white shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between group"
              >
                {/* Card Photo Header */}
                <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                  <img 
                    src={getProjectPhoto(project.sector)} 
                    alt={title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

                  {/* Country Pill */}
                  <div className="absolute top-3 left-3 right-auto px-2.5 py-1 rounded-lg bg-white/95 backdrop-blur-md text-slate-900 text-xs font-bold shadow-xs flex items-center gap-1.5">
                    <MapPin className="h-3 w-3 text-emerald-600 shrink-0" />
                    <span>{country}</span>
                  </div>

                  {/* Year Pill */}
                  <div className="absolute top-3 right-3 left-auto px-2.5 py-1 rounded-lg bg-slate-900/90 text-white text-xs font-mono font-semibold">
                    {project.year}
                  </div>

                  {/* Volume Metric on Image */}
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <span className="text-[10px] text-emerald-300 uppercase tracking-widest font-bold block">
                      {sectorDisplay}
                    </span>
                    <div className="text-base font-extrabold font-heading text-white truncate">
                      {volumeMetric}
                    </div>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                      <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 font-bold border border-emerald-100">
                        {clientCategory}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 font-heading leading-snug">
                      {title}
                    </h3>

                    <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                      {summary}
                    </p>
                  </div>

                  {/* Deliverables */}
                  <div className="pt-3 border-t border-slate-100 space-y-2">
                    <div className="text-[11px] font-bold text-slate-900 uppercase tracking-wider font-heading">
                      {t.projects.keyDeliverablesHeader}
                    </div>
                    <ul className="space-y-1 text-xs text-slate-600">
                      {deliverables.map((del, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{del}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Contact CTA */}
                  <div className="pt-3 border-t border-slate-100">
                    <button
                      onClick={() => onContactProject && onContactProject(title)}
                      className="w-full py-2.5 px-4 rounded-xl bg-slate-50 hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 border border-slate-200 hover:border-emerald-200 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer active:scale-95"
                    >
                      <Send className="h-3.5 w-3.5 shrink-0" />
                      <span>{t.projects.inquireBtn}</span>
                    </button>
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
