export interface Sector {
  id: string;
  name: string;
  shortDescription: string;
  iconName: string;
  imageUrl?: string;
  scopeOfSupply: string[];
  keyMaterials: string[];
  sampleContracts: string[];
  leadTimeWeeks: string;
  standardIncoterms: string[];
  badgeColor: string;
}

export interface Competency {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
  metrics: { label: string; value: string };
  highlights: string[];
}

export interface CountryHub {
  id: string;
  country: string;
  region: 'Middle East' | 'North Africa' | 'West Africa' | 'East Africa' | 'Southern Africa';
  role: 'Corporate Global HQ' | 'Regional Hub' | 'Strategic Trade Corridor' | 'Operational Branch';
  primaryPorts: string[];
  sectorsHandled: string[];
  coordinates: { x: number; y: number }; // Relative map coordinates (%)
  description: string;
  establishedProjects: number;
}

export interface ProjectRecord {
  id: string;
  title: string;
  clientCategory: 'Federal Government' | 'State Enterprise' | 'EPC Consortium' | 'Strategic Commercial';
  country: string;
  sector: string;
  year: string;
  volumeMetric: string;
  summary: string;
  deliverables: string[];
}

export interface ProcurementItem {
  id: string;
  sectorId: string;
  name: string;
  unit: string;
  defaultQty: number;
  estUnitPriceUSD: number;
  specification: string;
}

export interface RequisitionReceipt {
  receiptNumber: string;
  issueDate: string;
  organizationName: string;
  contactPerson: string;
  officialEmail: string;
  phone: string;
  destinationCountry: string;
  portOfDischarge: string;
  incoterm: string;
  items: Array<{
    name: string;
    quantity: number;
    unit: string;
    unitPrice: number;
    total: number;
    specification: string;
  }>;
  subtotal: number;
  logisticsSurchargeEst: number;
  estimatedGrandTotal: number;
  status: 'PRO-FORMA GENERATED' | 'OFFICIALLY SUBMITTED' | 'UNDER TENDER REVIEW';
  verificationHash: string;
  specialInstructions?: string;
}
