import React, { useState } from 'react';
import { 
  FileText, 
  Plus, 
  Trash2, 
  Printer, 
  Download, 
  Copy, 
  Check, 
  Send, 
  ShieldCheck, 
  Calculator, 
  Sparkles, 
  Ship, 
  Building2, 
  HelpCircle,
  RefreshCw,
  Stamp,
  QrCode,
  MapPin,
  CheckCircle2
} from 'lucide-react';
import { REQUISITION_CATALOG, PORTS_LIST, COMPANY_DETAILS } from '../data/companyData';
import { ProcurementItem, RequisitionReceipt } from '../types';

interface ReceiptPluginSectionProps {
  initialSectorId?: string;
  onReceiptGenerated?: (receipt: RequisitionReceipt) => void;
}

export const ReceiptPluginSection: React.FC<ReceiptPluginSectionProps> = ({ 
  initialSectorId = 'agriculture',
  onReceiptGenerated 
}) => {
  // Form State
  const [orgName, setOrgName] = useState('Federal Ministry of Agriculture & Rural Development');
  const [contactPerson, setContactPerson] = useState('Director of Public Procurement');
  const [officialEmail, setOfficialEmail] = useState('procurement@gov.affairs.state');
  const [phone, setPhone] = useState('+234 803 555 0192');
  const [country, setCountry] = useState('Ghana');
  const [portOfDischarge, setPortOfDischarge] = useState('Port of Tema, Ghana');
  const [incoterm, setIncoterm] = useState('CIF Port of Discharge');
  const [specialInstructions, setSpecialInstructions] = useState('Require SGS Pre-Shipment Inspection & Delivery in 2 equal vessel tranches.');

  // Items in the requisition
  const [selectedItems, setSelectedItems] = useState<Array<{
    item: ProcurementItem;
    quantity: number;
    customSpec?: string;
  }>>([
    {
      item: REQUISITION_CATALOG[0], // Tractor 140HP
      quantity: 15,
      customSpec: 'Complete with Heavy Disc Harrow & Rotary Tiller attachments.',
    },
    {
      item: REQUISITION_CATALOG[1], // Granular Urea
      quantity: 1200,
      customSpec: '50kg woven polypropylene bags with inner polyethylene liner.',
    }
  ]);

  // Selected catalog item to add
  const [catalogItemToAdd, setCatalogItemToAdd] = useState<string>(REQUISITION_CATALOG[2].id);

  // Generated receipt state
  const [generatedReceipt, setGeneratedReceipt] = useState<RequisitionReceipt | null>(null);
  const [isCopied, setIsCopied] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Quick preset loader
  const loadPreset = (presetName: string) => {
    if (presetName === 'ghana-agri') {
      setOrgName('Ministry of Food & Agriculture — Mechanization Directorate');
      setContactPerson('Chief Procurement Officer');
      setCountry('Ghana');
      setPortOfDischarge('Port of Tema, Ghana');
      setIncoterm('CIF Port of Discharge');
      setSelectedItems([
        { item: REQUISITION_CATALOG[0], quantity: 25, customSpec: '140HP Turbo with spare parts kit' },
        { item: REQUISITION_CATALOG[1], quantity: 3000, customSpec: 'Granular Urea 46% N for subsidy distribution' },
        { item: REQUISITION_CATALOG[2], quantity: 6, customSpec: 'Center pivot 60 Ha solar-compatible' },
      ]);
    } else if (presetName === 'egypt-energy') {
      setOrgName('Egyptian Electricity Holding Company (EEHC)');
      setContactPerson('Head of Grid Expansion Projects');
      setCountry('Egypt');
      setPortOfDischarge('Port of Alexandria, Egypt');
      setIncoterm('CIF Port of Discharge');
      setSelectedItems([
        { item: REQUISITION_CATALOG[3], quantity: 4, customSpec: '33kV/11kV 20MVA Step-Down Transformers' },
        { item: REQUISITION_CATALOG[4], quantity: 120, customSpec: '580W Bifacial Solar PV Modules' },
        { item: REQUISITION_CATALOG[5], quantity: 12, customSpec: 'Vacuum Circuit Breakers with motor gear' },
      ]);
    } else if (presetName === 'nigeria-oil') {
      setOrgName('National Hydrocarbon Infrastructure EPC Consortium');
      setContactPerson('Materials & Logistics Director');
      setCountry('Nigeria');
      setPortOfDischarge('Lagos Apapa / Tin Can, Nigeria');
      setIncoterm('CIF Port of Discharge');
      setSelectedItems([
        { item: REQUISITION_CATALOG[6], quantity: 3500, customSpec: 'API 5L Gr. X52 Seamless 12" 3LPE coated' },
        { item: REQUISITION_CATALOG[7], quantity: 24, customSpec: 'Forged Ball Valves ANSI 600 Trunnion mounted' },
        { item: REQUISITION_CATALOG[8], quantity: 200, customSpec: 'Barite 4.2 SG High Density Drilling Mud' },
      ]);
    } else if (presetName === 'uganda-med') {
      setOrgName('Ministry of Health — National Referral Hospital Re-Equipping Board');
      setContactPerson('Biomedical Supply Director');
      setCountry('Uganda');
      setPortOfDischarge('Mombasa / Entebbe Corridor, Uganda');
      setIncoterm('DDP Project Site');
      setSelectedItems([
        { item: REQUISITION_CATALOG[12], quantity: 2, customSpec: '128-Slice CT Scanner with cardiac gating' },
        { item: REQUISITION_CATALOG[13], quantity: 20, customSpec: 'ICU Critical Care Ventilators with high-flow oxygen' },
        { item: REQUISITION_CATALOG[14], quantity: 2, customSpec: 'PSA Medical Oxygen Plant 50 Nm³/h turnkey' },
      ]);
    }
  };

  const handleAddItem = () => {
    const found = REQUISITION_CATALOG.find(i => i.id === catalogItemToAdd);
    if (!found) return;
    setSelectedItems(prev => [
      ...prev,
      {
        item: found,
        quantity: found.defaultQty,
        customSpec: found.specification,
      }
    ]);
  };

  const handleRemoveItem = (index: number) => {
    setSelectedItems(prev => prev.filter((_, i) => i !== index));
  };

  const handleUpdateQty = (index: number, newQty: number) => {
    if (newQty < 1) return;
    setSelectedItems(prev => prev.map((it, i) => i === index ? { ...it, quantity: newQty } : it));
  };

  const handleUpdateSpec = (index: number, spec: string) => {
    setSelectedItems(prev => prev.map((it, i) => i === index ? { ...it, customSpec: spec } : it));
  };

  // Calculations
  const subtotal = selectedItems.reduce((acc, curr) => {
    return acc + (curr.quantity * curr.item.estUnitPriceUSD);
  }, 0);

  // Sea freight handling / bunker adjustment factor calculation based on Incoterm
  const logisticsRate = incoterm.includes('CIF') ? 0.085 : incoterm.includes('DDP') ? 0.14 : incoterm.includes('CFR') ? 0.07 : 0.02;
  const logisticsSurcharge = Math.round(subtotal * logisticsRate);
  const grandTotal = subtotal + logisticsSurcharge;

  const handleGenerateReceipt = (e: React.FormEvent) => {
    e.preventDefault();
    const randomSuffix = Math.floor(100000 + Math.random() * 900000);
    const receiptId = `GBM-REQ-2026-${randomSuffix}`;
    const hash = 'SHA256:' + Array.from({ length: 16 }, () => Math.floor(Math.random() * 16).toString(16)).join('');

    const receipt: RequisitionReceipt = {
      receiptNumber: receiptId,
      issueDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      organizationName: orgName,
      contactPerson,
      officialEmail,
      phone,
      destinationCountry: country,
      portOfDischarge,
      incoterm,
      items: selectedItems.map(si => ({
        name: si.item.name,
        quantity: si.quantity,
        unit: si.item.unit,
        unitPrice: si.item.estUnitPriceUSD,
        total: si.quantity * si.item.estUnitPriceUSD,
        specification: si.customSpec || si.item.specification,
      })),
      subtotal,
      logisticsSurchargeEst: logisticsSurcharge,
      estimatedGrandTotal: grandTotal,
      status: 'PRO-FORMA GENERATED',
      verificationHash: hash,
      specialInstructions,
    };

    setGeneratedReceipt(receipt);
    setSubmitSuccess(false);
    if (onReceiptGenerated) {
      onReceiptGenerated(receipt);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCopyId = () => {
    if (!generatedReceipt) return;
    navigator.clipboard.writeText(generatedReceipt.receiptNumber);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleDownloadSummary = () => {
    if (!generatedReceipt) return;
    const content = `=====================================================
GREEN BULK MARITIME LTD. — PROCUREMENT REQUISITION RECEIPT
=====================================================
Receipt Number: ${generatedReceipt.receiptNumber}
Date of Issue: ${generatedReceipt.issueDate}
Corporate HQ: Fujairah Welfare Building, Office 612, Near Port of Fujairah, UAE
Telephone: +971 9 2228173 (5 Lines) | Email: projects@greenbulkmairtime.com
Website: www.greenbulkmairtime.com

CLIENT ORGANIZATION:
Organization: ${generatedReceipt.organizationName}
Authorized Person: ${generatedReceipt.contactPerson}
Official Email: ${generatedReceipt.officialEmail}
Phone: ${generatedReceipt.phone}
Destination Country: ${generatedReceipt.destinationCountry}
Port of Discharge: ${generatedReceipt.portOfDischarge}
Incoterms: ${generatedReceipt.incoterm}

ITEMIZED PROCUREMENT LINE ITEMS:
${generatedReceipt.items.map((it, idx) => `
${idx + 1}. ${it.name}
   Specification: ${it.specification}
   Quantity: ${it.quantity} ${it.unit} @ $${it.unitPrice.toLocaleString()} USD
   Item Subtotal: $${it.total.toLocaleString()} USD`).join('\n')}

-----------------------------------------------------
Materials Subtotal: $${generatedReceipt.subtotal.toLocaleString()} USD
Estimated Marine Freight & Incoterm Surcharge: $${generatedReceipt.logisticsSurchargeEst.toLocaleString()} USD
ESTIMATED GRAND REQUISITION VALUE: $${generatedReceipt.estimatedGrandTotal.toLocaleString()} USD
-----------------------------------------------------
Security Verification Hash: ${generatedReceipt.verificationHash}
Special Instructions: ${generatedReceipt.specialInstructions || 'N/A'}
Status: OFFICIAL PRO-FORMA GENERATED
=====================================================`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${generatedReceipt.receiptNumber}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleSubmitToTenderDesk = () => {
    setSubmitSuccess(true);
    if (generatedReceipt) {
      setGeneratedReceipt({
        ...generatedReceipt,
        status: 'OFFICIALLY SUBMITTED',
      });
    }
  };

  return (
    <section id="receipt-plugin" className="py-20 bg-slate-950 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 text-xs font-semibold uppercase tracking-wider shadow-sm">
            <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
            <span>Interactive Requisition Plugin</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-heading tracking-tight">
            Procurement Requisition & Pro-Forma Receipt Generator
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            A real-time procurement plugin designed for ministries, public procurement directors, and EPC managers to generate itemized pro-forma tender requisition receipts with instant maritime cost estimations.
          </p>
        </div>

        {/* Preset Quick-Loaders */}
        <div className="mb-8 p-4 rounded-xl bg-slate-900/80 border border-slate-800">
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
            <span className="text-slate-300 font-semibold flex items-center gap-1.5">
              <Calculator className="h-4 w-4 text-emerald-400" />
              Load Sovereign Tender Template:
            </span>
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => loadPreset('ghana-agri')}
                className="px-2.5 py-1.5 rounded bg-slate-950 hover:bg-slate-800 text-emerald-300 border border-slate-700/80 transition-colors cursor-pointer"
              >
                Ghana: Agriculture & Urea Package
              </button>
              <button
                type="button"
                onClick={() => loadPreset('egypt-energy')}
                className="px-2.5 py-1.5 rounded bg-slate-950 hover:bg-slate-800 text-cyan-300 border border-slate-700/80 transition-colors cursor-pointer"
              >
                Egypt: Power Grid Transformers
              </button>
              <button
                type="button"
                onClick={() => loadPreset('nigeria-oil')}
                className="px-2.5 py-1.5 rounded bg-slate-950 hover:bg-slate-800 text-amber-300 border border-slate-700/80 transition-colors cursor-pointer"
              >
                Nigeria: API 5L Line Pipe & Valves
              </button>
              <button
                type="button"
                onClick={() => loadPreset('uganda-med')}
                className="px-2.5 py-1.5 rounded bg-slate-950 hover:bg-slate-800 text-rose-300 border border-slate-700/80 transition-colors cursor-pointer"
              >
                Uganda: Hospital Diagnostic ICU Package
              </button>
            </div>
          </div>
        </div>

        {/* Two-Column Workbench: Left = Builder Form, Right = Realtime Document Receipt */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Builder Form (6 columns) */}
          <div className="lg:col-span-6 bg-slate-900/90 rounded-2xl border border-slate-800 p-6 sm:p-7 shadow-xl space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-emerald-400" />
                <h3 className="text-base font-bold text-white font-heading">Requisition Specifications</h3>
              </div>
              <span className="text-xs text-slate-400 font-mono">Step 1 of 2</span>
            </div>

            <form onSubmit={handleGenerateReceipt} className="space-y-4">
              
              {/* Institution / Ministry Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">
                    Client Organization / Ministry *
                  </label>
                  <input
                    type="text"
                    required
                    value={orgName}
                    onChange={(e) => setOrgName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-emerald-500 text-xs"
                    placeholder="e.g. Ministry of Infrastructure"
                  />
                </div>

                <div>
                  <label className="text-slate-300 font-semibold block mb-1">
                    Authorized Procurement Officer *
                  </label>
                  <input
                    type="text"
                    required
                    value={contactPerson}
                    onChange={(e) => setContactPerson(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-emerald-500 text-xs"
                    placeholder="e.g. Dr. K. Mensah, Director"
                  />
                </div>

                <div>
                  <label className="text-slate-300 font-semibold block mb-1">
                    Official Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={officialEmail}
                    onChange={(e) => setOfficialEmail(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-emerald-500 text-xs"
                    placeholder="procurement@agency.gov"
                  />
                </div>

                <div>
                  <label className="text-slate-300 font-semibold block mb-1">
                    Phone / WhatsApp Contact *
                  </label>
                  <input
                    type="text"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-emerald-500 text-xs"
                    placeholder="+234 ... or +971 ..."
                  />
                </div>
              </div>

              {/* Geographic Corridor & Incoterm */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-1">
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Destination Country</label>
                  <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-emerald-500 text-xs"
                  >
                    <option value="Egypt">Egypt</option>
                    <option value="Morocco">Morocco</option>
                    <option value="Tunisia">Tunisia</option>
                    <option value="Ghana">Ghana</option>
                    <option value="Nigeria">Nigeria</option>
                    <option value="Uganda">Uganda</option>
                    <option value="South Africa">South Africa</option>
                    <option value="United Arab Emirates">United Arab Emirates</option>
                    <option value="Other Pan-African">Other Pan-African</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Port of Discharge</label>
                  <select
                    value={portOfDischarge}
                    onChange={(e) => setPortOfDischarge(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-emerald-500 text-xs"
                  >
                    {PORTS_LIST.map((p, idx) => (
                      <option key={idx} value={p.name}>{p.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Trade Incoterm</label>
                  <select
                    value={incoterm}
                    onChange={(e) => setIncoterm(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-emerald-500 text-xs font-mono"
                  >
                    <option value="CIF Port of Discharge">CIF Port of Discharge</option>
                    <option value="CFR Free Out">CFR Free Out</option>
                    <option value="FOB Port of Fujairah, UAE">FOB Port of Fujairah, UAE</option>
                    <option value="DDP Project Site">DDP Project Site</option>
                  </select>
                </div>
              </div>

              {/* Items Section */}
              <div className="pt-3 border-t border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                    Procurement Line Items ({selectedItems.length})
                  </span>
                  <span className="text-xs text-emerald-400 font-mono font-bold">
                    Est. Cargo: ${subtotal.toLocaleString()} USD
                  </span>
                </div>

                {/* Add from catalog selector */}
                <div className="flex items-center gap-2">
                  <select
                    value={catalogItemToAdd}
                    onChange={(e) => setCatalogItemToAdd(e.target.value)}
                    className="flex-1 bg-slate-950 border border-slate-800 rounded-lg p-2 text-white focus:outline-none focus:border-emerald-500 text-xs"
                  >
                    {REQUISITION_CATALOG.map((item) => (
                      <option key={item.id} value={item.id}>
                        [{item.sectorId.toUpperCase()}] {item.name} (${item.estUnitPriceUSD.toLocaleString()}/{item.unit})
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    onClick={handleAddItem}
                    className="px-3 py-2 bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-xs rounded-lg flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    <span>Add</span>
                  </button>
                </div>

                {/* Selected Items List */}
                <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
                  {selectedItems.map((si, idx) => (
                    <div 
                      key={idx}
                      className="p-3 rounded-lg bg-slate-950/80 border border-slate-800 space-y-2 text-xs"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className="font-bold text-white block">{si.item.name}</span>
                          <span className="text-[11px] text-slate-400">
                            Unit Price: ${si.item.estUnitPriceUSD.toLocaleString()} USD / {si.item.unit}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveItem(idx)}
                          className="text-slate-500 hover:text-red-400 transition-colors p-1"
                          title="Remove Line Item"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>

                      <div className="grid grid-cols-2 gap-2 pt-1 items-center">
                        <div className="flex items-center gap-1.5">
                          <span className="text-slate-400 text-[11px]">Quantity ({si.item.unit}):</span>
                          <input
                            type="number"
                            min="1"
                            value={si.quantity}
                            onChange={(e) => handleUpdateQty(idx, parseInt(e.target.value) || 1)}
                            className="w-20 bg-slate-900 border border-slate-700 rounded px-2 py-1 text-white font-mono text-xs"
                          />
                        </div>
                        <div className="text-right font-mono text-emerald-400 font-bold">
                          ${(si.quantity * si.item.estUnitPriceUSD).toLocaleString()} USD
                        </div>
                      </div>

                      <div>
                        <input
                          type="text"
                          value={si.customSpec || ''}
                          onChange={(e) => handleUpdateSpec(idx, e.target.value)}
                          placeholder="Technical specification / standard"
                          className="w-full bg-slate-900/60 border border-slate-800 rounded px-2 py-1 text-slate-300 text-[11px]"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Special Instructions */}
              <div>
                <label className="text-slate-300 font-semibold block mb-1 text-xs">
                  Special Project / Tender Requirements
                </label>
                <textarea
                  rows={2}
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white focus:outline-none focus:border-emerald-500 text-xs"
                  placeholder="e.g. SGS / Bureau Veritas inspection, LC validity, staggered vessel shipments..."
                />
              </div>

              {/* Submit / Generate Button */}
              <button
                type="submit"
                id="plugin-generate-receipt-button"
                className="w-full py-3.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-emerald-950 transition-all cursor-pointer active:scale-98"
              >
                <FileText className="h-4 w-4" />
                <span>Generate Official Pro-Forma Receipt</span>
              </button>
            </form>
          </div>

          {/* Realtime Document Receipt Viewer (6 columns) */}
          <div className="lg:col-span-6 space-y-4">
            
            {/* Action Bar for Receipt */}
            {generatedReceipt && (
              <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-emerald-400 font-bold">Official Document Active</span>
                  <span className="text-slate-400 font-mono">({generatedReceipt.receiptNumber})</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopyId}
                    className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center gap-1 cursor-pointer"
                    title="Copy Reference ID"
                  >
                    {isCopied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                    <span>{isCopied ? 'Copied' : 'Ref ID'}</span>
                  </button>
                  <button
                    onClick={handlePrint}
                    className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center gap-1 cursor-pointer"
                    title="Print Receipt"
                  >
                    <Printer className="h-3.5 w-3.5 text-emerald-400" />
                    <span>Print Slip</span>
                  </button>
                  <button
                    onClick={handleDownloadSummary}
                    className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center gap-1 cursor-pointer"
                    title="Download Text File"
                  >
                    <Download className="h-3.5 w-3.5 text-emerald-400" />
                    <span>Save</span>
                  </button>
                </div>
              </div>
            )}

            {/* Document Body (Printable & Styled) */}
            <div 
              id="printable-receipt"
              className="rounded-2xl bg-white text-slate-900 p-6 sm:p-8 shadow-2xl border border-slate-200 relative overflow-hidden"
            >
              {/* Subtle watermark */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-slate-100 font-black text-6xl pointer-events-none select-none uppercase tracking-widest opacity-40 rotate-[-25deg] whitespace-nowrap">
                GREEN BULK MARITIME
              </div>

              {/* Official Document Header */}
              <div className="relative border-b-2 border-slate-900 pb-5 mb-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <div className="h-8 w-8 rounded bg-emerald-800 flex items-center justify-center text-white font-bold">
                        <Ship className="h-5 w-5" />
                      </div>
                      <div>
                        <h2 className="text-lg font-black tracking-tight text-slate-900 leading-tight">
                          GREEN BULK MARITIME LTD.
                        </h2>
                        <p className="text-[10px] text-emerald-800 font-bold uppercase tracking-wider">
                          Fujairah, United Arab Emirates • Est. 2006
                        </p>
                      </div>
                    </div>
                    <p className="text-[10px] text-slate-600 max-w-sm leading-tight">
                      Fujairah Welfare Building, Office No. 612, Near Port of Fujairah, UAE<br />
                      Tel: +971 9 2228173 (5 Lines) | Email: projects@greenbulkmairtime.com
                    </p>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="inline-block text-[10px] font-black uppercase tracking-wider bg-slate-900 text-white px-2 py-0.5 rounded">
                      PRO-FORMA REQUISITION
                    </span>
                    <div className="text-xs font-mono font-bold text-slate-900 mt-1">
                      {generatedReceipt ? generatedReceipt.receiptNumber : 'GBM-PRO-SAMPLE'}
                    </div>
                    <div className="text-[10px] text-slate-500 font-medium">
                      Date: {generatedReceipt ? generatedReceipt.issueDate : new Date().toLocaleDateString('en-GB')}
                    </div>
                  </div>
                </div>
              </div>

              {/* Client & Port Metadata Box */}
              <div className="relative bg-slate-50 border border-slate-200 rounded-lg p-3.5 mb-5 text-xs grid grid-cols-2 gap-3">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Procuring Entity / Client:
                  </span>
                  <span className="font-bold text-slate-900 block leading-tight">
                    {generatedReceipt ? generatedReceipt.organizationName : orgName}
                  </span>
                  <span className="text-slate-600 block text-[11px]">
                    Attn: {generatedReceipt ? generatedReceipt.contactPerson : contactPerson}
                  </span>
                  <span className="text-slate-500 block text-[10px]">
                    {generatedReceipt ? generatedReceipt.officialEmail : officialEmail} • {generatedReceipt ? generatedReceipt.phone : phone}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Maritime Supply Terms:
                  </span>
                  <span className="font-semibold text-slate-900 block">
                    Port: {generatedReceipt ? generatedReceipt.portOfDischarge : portOfDischarge}
                  </span>
                  <span className="text-slate-600 block">
                    Country: {generatedReceipt ? generatedReceipt.destinationCountry : country}
                  </span>
                  <span className="text-emerald-800 font-mono font-bold text-[11px] block">
                    Incoterm: {generatedReceipt ? generatedReceipt.incoterm : incoterm}
                  </span>
                </div>
              </div>

              {/* Itemized Table */}
              <div className="relative mb-5 overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b-2 border-slate-900 text-[11px] uppercase tracking-wider text-slate-600">
                      <th className="py-1.5 font-bold">Item Description & Specs</th>
                      <th className="py-1.5 text-center font-bold">Qty</th>
                      <th className="py-1.5 text-right font-bold">Unit Price</th>
                      <th className="py-1.5 text-right font-bold">Amount (USD)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {(generatedReceipt ? generatedReceipt.items : selectedItems.map(si => ({
                      name: si.item.name,
                      quantity: si.quantity,
                      unit: si.item.unit,
                      unitPrice: si.item.estUnitPriceUSD,
                      total: si.quantity * si.item.estUnitPriceUSD,
                      specification: si.customSpec || si.item.specification,
                    }))).map((it, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/50">
                        <td className="py-2 pr-2">
                          <span className="font-bold text-slate-900 block">{it.name}</span>
                          <span className="text-[10px] text-slate-500 block leading-tight">{it.specification}</span>
                        </td>
                        <td className="py-2 text-center font-mono whitespace-nowrap">
                          {it.quantity} {it.unit}
                        </td>
                        <td className="py-2 text-right font-mono text-slate-700 whitespace-nowrap">
                          ${it.unitPrice.toLocaleString()}
                        </td>
                        <td className="py-2 text-right font-mono font-bold text-slate-900 whitespace-nowrap">
                          ${it.total.toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Financial Totals */}
              <div className="relative border-t-2 border-slate-900 pt-3 space-y-1.5 text-xs text-right">
                <div className="flex justify-between text-slate-600">
                  <span>Materials FOB/Ex-Mill Subtotal:</span>
                  <span className="font-mono">${(generatedReceipt ? generatedReceipt.subtotal : subtotal).toLocaleString()} USD</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Ocean Charter Freight, Handling & Marine Insurance:</span>
                  <span className="font-mono">${(generatedReceipt ? generatedReceipt.logisticsSurchargeEst : logisticsSurcharge).toLocaleString()} USD</span>
                </div>
                <div className="flex justify-between text-sm font-extrabold text-slate-900 border-t border-slate-300 pt-2">
                  <span>ESTIMATED TOTAL REQUISITION VALUE:</span>
                  <span className="font-mono text-emerald-800 text-base">
                    ${(generatedReceipt ? generatedReceipt.estimatedGrandTotal : grandTotal).toLocaleString()} USD
                  </span>
                </div>
              </div>

              {/* Special notes & Signature block */}
              <div className="relative mt-6 pt-4 border-t border-slate-200 grid grid-cols-2 gap-4 text-[10px] text-slate-600 items-end">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="h-7 w-7 rounded bg-slate-100 border border-slate-300 flex items-center justify-center text-slate-700 font-mono font-bold text-[9px]">
                      QR
                    </div>
                    <div>
                      <span className="font-bold text-slate-900 block">AUTHENTIC PRO-FORMA SLIP</span>
                      <span className="font-mono text-[9px] text-slate-500">
                        {generatedReceipt ? generatedReceipt.verificationHash : 'VERIFIED:GBM-HASH-7F4A'}
                      </span>
                    </div>
                  </div>
                  <p className="text-[9px] text-slate-500 italic">
                    Valid for 45 calendar days. Irrevocable Letter of Credit (L/C) or Sovereign Bank Guarantee.
                  </p>
                </div>

                {/* Stamp & Authorized Signature */}
                <div className="text-right">
                  <div className="inline-block border-2 border-emerald-800 rounded-lg p-1.5 text-center text-emerald-800 rotate-[-3deg] mb-1">
                    <span className="block text-[8px] font-black uppercase tracking-wider">GREEN BULK MARITIME LTD.</span>
                    <span className="block text-[7px] font-bold">PUBLIC TENDER DESK • FUJAIRAH UAE</span>
                    <span className="block text-[8px] font-mono font-bold">APPROVED FOR BIDDING</span>
                  </div>
                  <div className="text-[9px] font-semibold text-slate-800">
                    Managing Director / Authorized Signatory
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Submit Action Confirmation */}
            {generatedReceipt && (
              <div className="p-4 rounded-xl bg-slate-900 border border-emerald-500/30 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="space-y-0.5 text-xs text-left">
                  <span className="font-bold text-white block">Ready to Submit to Tender Desk?</span>
                  <span className="text-slate-400">
                    Dispatches directly to <strong className="text-emerald-400">projects@greenbulkmairtime.com</strong>
                  </span>
                </div>

                {submitSuccess ? (
                  <div className="px-4 py-2 rounded-lg bg-emerald-950 border border-emerald-600 text-emerald-300 font-bold text-xs flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    <span>Dispatched Successfully! Ref logged.</span>
                  </div>
                ) : (
                  <button
                    onClick={handleSubmitToTenderDesk}
                    className="px-4 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-xs flex items-center gap-2 transition-all cursor-pointer shrink-0"
                  >
                    <Send className="h-3.5 w-3.5" />
                    <span>Transmit Requisition</span>
                  </button>
                )}
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
