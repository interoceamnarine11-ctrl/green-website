import React, { useState } from 'react';
import { 
  Building2, 
  Ship, 
  Handshake, 
  Network, 
  CheckCircle2, 
  Layers,
  ChevronRight
} from 'lucide-react';
import { CORE_COMPETENCIES } from '../data/companyData';
import { useLanguage } from '../context/LanguageContext';

interface CoreCompetenciesSectionProps {
  onContactClick?: () => void;
}

export const CoreCompetenciesSection: React.FC<CoreCompetenciesSectionProps> = ({ onContactClick }) => {
  const { t, isRTL } = useLanguage();
  const [activeTab, setActiveTab] = useState(CORE_COMPETENCIES[0].id);

  const getIcon = (name: string) => {
    switch (name) {
      case 'Building2': return <Building2 className="h-6 w-6 text-emerald-600" />;
      case 'Ship': return <Ship className="h-6 w-6 text-teal-600" />;
      case 'Handshake': return <Handshake className="h-6 w-6 text-cyan-600" />;
      case 'Network': return <Network className="h-6 w-6 text-emerald-600" />;
      default: return <Building2 className="h-6 w-6 text-emerald-600" />;
    }
  };

  const getCompetencyPhoto = (id: string) => {
    switch (id) {
      case 'gov-bidding':
        return 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=700&q=80';
      case 'bulk-logistics':
        return 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=700&q=80';
      case 'strategic-partnerships':
        return 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=700&q=80';
      case 'distribution-networks':
        return 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=700&q=80';
      default:
        return 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=700&q=80';
    }
  };

  return (
    <section id="competencies" className="py-20 bg-slate-50 border-b border-slate-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider">
            <Layers className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
            <span>{t.competencies.badge}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 font-heading tracking-tight">
            {t.competencies.title}
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            {t.competencies.subtitle}
          </p>
        </div>

        {/* 4 Competency Cards Grid with Visual Imagery */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {CORE_COMPETENCIES.map((comp) => {
            const isSelected = activeTab === comp.id;
            const localized = t.competencies.items[comp.id as keyof typeof t.competencies.items] || comp;

            return (
              <div 
                key={comp.id}
                onClick={() => setActiveTab(comp.id)}
                className={`group relative rounded-3xl overflow-hidden bg-white transition-all duration-300 border cursor-pointer ${
                  isSelected 
                    ? 'border-emerald-500 shadow-xl ring-2 ring-emerald-500/20' 
                    : 'border-slate-200 shadow-sm hover:shadow-lg hover:border-slate-300'
                }`}
              >
                {/* Visual Image Header */}
                <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                  <img 
                    src={getCompetencyPhoto(comp.id)} 
                    alt={localized.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent" />
                  
                  {/* Floating Icon */}
                  <div className="absolute top-4 left-4 right-auto h-12 w-12 rounded-2xl bg-white/95 backdrop-blur-md shadow-md flex items-center justify-center">
                    {getIcon(comp.iconName)}
                  </div>

                  {/* Metric Badge */}
                  <div className="absolute top-4 right-4 left-auto bg-slate-900/90 text-white backdrop-blur-md px-3 py-1.5 rounded-xl text-right">
                    <span className="text-[10px] text-slate-300 block">{localized.metrics.label}</span>
                    <span className="text-sm font-extrabold text-emerald-400 font-mono">
                      {localized.metrics.value}
                    </span>
                  </div>

                  {/* Title on Image */}
                  <div className="absolute bottom-3 left-4 right-4 text-white">
                    <h3 className="text-lg font-bold font-heading">
                      {localized.title}
                    </h3>
                    <p className="text-xs text-emerald-300 font-medium">
                      {localized.subtitle}
                    </p>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 space-y-4">
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                    {localized.description}
                  </p>

                  {/* Key Highlights */}
                  <div className="space-y-2 pt-2 border-t border-slate-100">
                    <div className="text-[11px] font-bold text-slate-900 uppercase tracking-wider">
                      {t.competencies.capabilitiesHeader}
                    </div>
                    <ul className="space-y-1.5 text-xs text-slate-700">
                      {localized.highlights.map((hl, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{hl}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Action Link */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs text-slate-500 font-medium">
                      {t.competencies.isoBadge}
                    </span>
                    <a
                      href="#contact"
                      onClick={onContactClick}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 cursor-pointer"
                    >
                      <span>{t.competencies.inquireBtn}</span>
                      <ChevronRight className={`h-3.5 w-3.5 ${isRTL ? 'rotate-180' : ''}`} />
                    </a>
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
