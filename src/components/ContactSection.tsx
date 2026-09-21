import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  Phone, 
  Printer, 
  Smartphone, 
  Mail, 
  Globe, 
  Send, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  Anchor
} from 'lucide-react';
import { COMPANY_DETAILS } from '../data/companyData';
import { useLanguage } from '../context/LanguageContext';

interface ContactSectionProps {
  initialSector?: string;
  initialMessage?: string;
}

const SECTOR_OPTIONS = [
  { value: 'Agriculture', en: 'Agriculture (Fertilizers & Machineries)', ar: 'الزراعة والأمن الغذائي (الأسمدة والآلات)' },
  { value: 'Energy & Utilities', en: 'Energy & Utilities (Transformers & Grid)', ar: 'الطاقة والمرافق العامة (المحولات والشبكات)' },
  { value: 'Oil & Gas', en: 'Oil & Gas (Piping API 5L, Valves & Drilling)', ar: 'النفط والغاز (أنابيب البترول والصمامات)' },
  { value: 'Construction & Infrastructure', en: 'Construction & Infrastructure (Steel & Cement)', ar: 'الإنشاءات والبنية التحتية (حديد التسليح والإسمنت)' },
  { value: 'Healthcare & Medical', en: 'Healthcare & Medical (Diagnostic & ICU)', ar: 'الرعاية الصحية والمعدات الطبية (أجهزة التشخيص والعناية)' },
];

const COUNTRY_OPTIONS = [
  { value: 'Egypt', en: 'Egypt', ar: 'مصر' },
  { value: 'Morocco', en: 'Morocco', ar: 'المغرب' },
  { value: 'Tunisia', en: 'Tunisia', ar: 'تونس' },
  { value: 'Ghana', en: 'Ghana', ar: 'غانا' },
  { value: 'Nigeria', en: 'Nigeria', ar: 'نيجيريا' },
  { value: 'Uganda', en: 'Uganda', ar: 'أوغندا' },
  { value: 'South Africa', en: 'South Africa', ar: 'جنوب أفريقيا' },
  { value: 'United Arab Emirates', en: 'United Arab Emirates (UAE)', ar: 'الإمارات العربية المتحدة' },
  { value: 'Other Regional State', en: 'Other Regional State', ar: 'دولة إقليمية أخرى' },
];

export const ContactSection: React.FC<ContactSectionProps> = ({ 
  initialSector = 'Agriculture',
  initialMessage = '' 
}) => {
  const { t, isRTL, language } = useLanguage();

  const [formData, setFormData] = useState({
    name: '',
    organization: '',
    email: '',
    phone: '',
    sector: initialSector,
    country: 'Egypt',
    message: initialMessage,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 700);
  };

  return (
    <section id="contact" className="py-20 bg-slate-50 border-b border-slate-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider">
            <Building2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
            <span>{t.contact.badge}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 font-heading tracking-tight">
            {t.contact.title}
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            {t.contact.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Official Contact Card & Headquarters Data (5 cols) */}
          <div className="lg:col-span-5 rounded-3xl bg-white border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xl">
            <div>
              <div className="flex items-center gap-2 text-emerald-700 font-bold text-xs uppercase tracking-widest mb-1">
                <Anchor className="h-4 w-4 shrink-0" />
                <span>{t.contact.cardBadge}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-heading">
                {language === 'ar' ? 'جرين بلك ماريتيم المحدودة' : COMPANY_DETAILS.name}
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                {t.contact.cardSubtext}
              </p>
            </div>

            {/* Address Details */}
            <div className="space-y-4 text-xs text-slate-700">
              <div className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                <MapPin className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <span className="font-bold text-slate-900 block text-sm">{t.contact.corporateHqLabel}</span>
                  <span className="block text-slate-800 font-semibold">
                    {language === 'ar' ? 'بناية صندوق رعاية الفجيرة، مكتب 612' : COMPANY_DETAILS.headquarters.building}
                  </span>
                  <span className="block text-emerald-700 font-medium">
                    {language === 'ar' ? 'بالقرب من محطة الحافلات المركزية، شارع السلام' : COMPANY_DETAILS.headquarters.landmark}
                  </span>
                  <span className="block text-slate-500">
                    {language === 'ar' ? 'الفجيرة، صندوق بريد 5057، الإمارات العربية المتحدة' : `${COMPANY_DETAILS.headquarters.city}, ${COMPANY_DETAILS.headquarters.country}`}
                  </span>
                </div>
              </div>

              {/* Telephone Lines */}
              <div className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                <Phone className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 text-sm">{t.contact.dedicatedPhoneLabel}</span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">
                      {t.topBar.linesCount}
                    </span>
                  </div>
                  <a 
                    href={`tel:${COMPANY_DETAILS.contact.telephone.replace(/\s+/g, '')}`} 
                    dir="ltr"
                    className="font-mono text-base text-emerald-700 hover:text-emerald-800 font-bold block"
                  >
                    {COMPANY_DETAILS.contact.telephone}
                  </a>
                  <span className="text-[11px] text-slate-500 block">{t.contact.phoneRoutingDesc}</span>
                </div>
              </div>

              {/* Mobile & Direct Line */}
              <div className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                <Smartphone className="h-5 w-5 text-teal-600 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <span className="font-bold text-slate-900 text-sm">{t.contact.mobileLabel}</span>
                  <a 
                    href={`https://wa.me/${COMPANY_DETAILS.contact.mobile.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noreferrer"
                    dir="ltr"
                    className="font-mono text-sm text-teal-700 hover:underline font-bold block"
                  >
                    {COMPANY_DETAILS.contact.mobile}
                  </a>
                  <span className="text-[11px] text-slate-500 block">{t.contact.priorityLineDesc}</span>
                </div>
              </div>

              {/* Fax & Corporate Web */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center gap-1.5 text-slate-500 mb-1">
                    <Printer className="h-3.5 w-3.5" />
                    <span className="font-semibold text-slate-700">{t.contact.faxLabel}</span>
                  </div>
                  <span dir="ltr" className="font-mono text-slate-900 text-xs font-semibold block">{COMPANY_DETAILS.contact.fax}</span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center gap-1.5 text-slate-500 mb-1">
                    <Globe className="h-3.5 w-3.5 text-emerald-600" />
                    <span className="font-semibold text-slate-700">{t.contact.webLabel}</span>
                  </div>
                  <a 
                    href={`https://${COMPANY_DETAILS.contact.website}`} 
                    target="_blank" 
                    rel="noreferrer"
                    dir="ltr"
                    className="text-emerald-700 hover:underline text-xs font-mono font-bold block truncate"
                  >
                    {COMPANY_DETAILS.contact.website}
                  </a>
                </div>
              </div>

              {/* Official Email */}
              <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200">
                <div className="flex items-center gap-2 mb-1">
                  <Mail className="h-4 w-4 text-emerald-700 shrink-0" />
                  <span className="font-bold text-emerald-950 text-xs">{t.contact.emailLabel}</span>
                </div>
                <a 
                  href={`mailto:${COMPANY_DETAILS.contact.email}`} 
                  dir="ltr"
                  className="font-mono text-emerald-800 hover:underline font-extrabold text-sm block"
                >
                  {COMPANY_DETAILS.contact.email}
                </a>
              </div>
            </div>

            {/* Operating Hours Note */}
            <div className="pt-2 text-xs text-slate-500 flex items-center justify-between border-t border-slate-100">
              <span className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                {t.contact.workingHours}
              </span>
              <span className="text-emerald-700 font-bold">{t.contact.portOperations}</span>
            </div>

          </div>

          {/* Direct RFP & Tender Inquiries Form (7 cols) */}
          <div className="lg:col-span-7 rounded-3xl bg-white border border-slate-200 p-6 sm:p-8 shadow-xl">
            <div className="pb-4 mb-6 border-b border-slate-100">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 font-heading">
                    {t.contact.formTitle}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {t.contact.formSubtitle}
                  </p>
                </div>
                <ShieldCheck className="h-7 w-7 text-emerald-600 shrink-0" />
              </div>
            </div>

            {submitted ? (
              <div className="py-12 px-6 text-center space-y-4 bg-emerald-50/60 rounded-2xl border border-emerald-200">
                <div className="h-16 w-16 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center mx-auto text-emerald-700">
                  <CheckCircle2 className="h-9 w-9" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-xl font-bold text-slate-900 font-heading">{t.contact.formSuccessTitle}</h4>
                  <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                    {t.contact.formSuccessDesc} <strong className="text-emerald-800 font-mono">{formData.email || COMPANY_DETAILS.contact.email}</strong>.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="px-5 py-2.5 rounded-xl bg-slate-900 text-white hover:bg-slate-800 text-xs font-bold shadow-xs cursor-pointer"
                >
                  {t.contact.sendAnotherBtn}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-slate-700 font-bold block mb-1">
                      {t.contact.fieldName}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder={t.contact.namePlaceholder}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="text-slate-700 font-bold block mb-1">
                      {t.contact.fieldOrg}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.organization}
                      onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                      placeholder={t.contact.orgPlaceholder}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="text-slate-700 font-bold block mb-1">
                      {t.contact.fieldEmail}
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder={t.contact.emailPlaceholder}
                      dir="ltr"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="text-slate-700 font-bold block mb-1">
                      {t.contact.fieldPhone}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder={t.contact.phonePlaceholder}
                      dir="ltr"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="text-slate-700 font-bold block mb-1">
                      {t.contact.fieldSector}
                    </label>
                    <select
                      value={formData.sector}
                      onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                    >
                      {SECTOR_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {language === 'ar' ? opt.ar : opt.en}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-slate-700 font-bold block mb-1">
                      {t.contact.fieldCountry}
                    </label>
                    <select
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                    >
                      {COUNTRY_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {language === 'ar' ? opt.ar : opt.en}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-slate-700 font-bold block mb-1">
                    {t.contact.fieldMessage}
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={t.contact.messagePlaceholder}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white text-xs leading-relaxed"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-emerald-700/25 transition-all cursor-pointer disabled:opacity-50 active:scale-95"
                  >
                    {isSubmitting ? (
                      <span>{t.contact.submittingBtn}</span>
                    ) : (
                      <>
                        <Send className="h-4 w-4 shrink-0" />
                        <span>{t.contact.submitBtn}</span>
                      </>
                    )}
                  </button>
                  <p className="text-[11px] text-center text-slate-500 mt-2">
                    {t.contact.privacyNote}
                  </p>
                </div>
              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
