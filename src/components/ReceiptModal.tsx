import React from 'react';
import { X, FileText } from 'lucide-react';
import { ReceiptPluginSection } from './ReceiptPluginSection';

interface ReceiptModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialSectorId?: string;
}

export const ReceiptModal: React.FC<ReceiptModalProps> = ({ isOpen, onClose, initialSectorId }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-start justify-center p-3 sm:p-6 md:p-10 animate-in fade-in duration-200">
      <div className="relative w-full max-w-6xl bg-slate-950 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-6">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-slate-800 bg-slate-900/90">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-emerald-950 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <FileText className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white font-heading">
                Procurement Requisition & Tender Receipt Plugin
              </h3>
              <p className="text-xs text-slate-400">
                Official Green Bulk Maritime Ltd. System • Fujairah Welfare Bldg #612
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
            aria-label="Close Requisition Plugin Modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-2 sm:p-4 max-h-[82vh] overflow-y-auto">
          <ReceiptPluginSection initialSectorId={initialSectorId} />
        </div>

      </div>
    </div>
  );
};
