import React from 'react';
import { 
  ShieldCheck, 
  Anchor, 
  CheckCircle, 
  Award,
  ArrowRight
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface ExecutiveProfileSectionProps {
  onContactClick?: () => void;
}

export const ExecutiveProfileSection: React.FC<ExecutiveProfileSectionProps> = ({ onContactClick }) => {
  const { t, isRTL } = useLanguage();

  return (
    <section id="about" className="py-20 bg-white border-b border-slate-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider">
            <Award className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
            <span>{t.executive.badge}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 font-heading tracking-tight">
            {t.executive.title}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            {t.executive.subtitle}
          </p>
        </div>

        {/* 2-Column Layout: Visual Photo on Left, In-depth Narrative on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Visual Imagery Column (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="relative rounded-3xl overflow-hidden shadow-xl border border-slate-200 group">
              <img 
                src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=900&q=80" 
                alt="Corporate Strategy and Strategic Procurement Team"
                className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 text-white">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
                  {t.executive.teamLocation}
                </span>
                <h4 className="text-lg font-bold font-heading">
                  {t.executive.teamTitle}
                </h4>
                <p className="text-xs text-slate-200 mt-1">
                  {t.executive.teamCaption}
                </p>
              </div>
            </div>

            {/* Quick credentials card */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                <ShieldCheck className="h-5 w-5 text-emerald-600 mb-1" />
                <span className="font-bold text-slate-900 text-sm block">{t.executive.statPrequalified}</span>
                <span className="text-xs text-slate-500">{t.executive.statPrequalifiedDesc}</span>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                <Anchor className="h-5 w-5 text-teal-600 mb-1" />
                <span className="font-bold text-slate-900 text-sm block">{t.executive.statPort}</span>
                <span className="text-xs text-slate-500">{t.executive.statPortDesc}</span>
              </div>
            </div>
          </div>

          {/* Detailed Narrative & Pillars (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed">
              <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-50/60 to-slate-50 border border-emerald-100">
                <h3 className="text-base font-bold text-slate-900 mb-2 font-heading">
                  {t.executive.calloutTitle}
                </h3>
                <p className="text-slate-700 text-sm leading-relaxed">
                  {t.executive.calloutText}
                </p>
              </div>

              <p>
                {t.executive.geographyText}
              </p>
            </div>

            {/* Core Tenets Checklist */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-heading">
                {t.executive.whyPartnerHeader}
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {t.executive.tenets.map((tenet, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200/60">
                    <CheckCircle className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900 block font-semibold">{tenet.title}</strong>
                      <span className="text-slate-600">{tenet.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Link to Contact */}
            <div className="pt-2">
              <a
                href="#contact"
                onClick={onContactClick}
                className="inline-flex items-center gap-2 text-sm font-bold text-emerald-700 hover:text-emerald-800 transition-colors cursor-pointer"
              >
                <span>{t.executive.discussCta}</span>
                <ArrowRight className={`h-4 w-4 ${isRTL ? 'rotate-180' : ''}`} />
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
