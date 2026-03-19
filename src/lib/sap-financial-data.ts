// Synthetic SAP-style financial data for advanced KPIs

export interface DSOData {
  month: string;
  dso: number;
  target: number;
}

export interface AgingBucket {
  bucket: string;
  amount: number;
  percentage: number;
  color: string;
}

export interface OverdueReceivable {
  customer: string;
  amount: number;
  daysPastDue: number;
  risk: 'high' | 'medium' | 'low';
  invoiceCount: number;
}

export interface DisputeItem {
  id: string;
  customer: string;
  amount: number;
  reason: string;
  status: 'open' | 'in_review' | 'resolved';
  daysOpen: number;
}

export interface CashCollection {
  month: string;
  collected: number;
  target: number;
}

export interface CashLiquidity {
  date: string;
  balance: number;
  inflow: number;
  outflow: number;
}

export interface WriteOff {
  quarter: string;
  amount: number;
  recovered: number;
}

export interface HighRiskInvoice {
  invoiceNo: string;
  customer: string;
  amount: number;
  dueDate: string;
  risk: number;
  reason: string;
}

export interface PayableItem {
  vendor: string;
  amount: number;
  dueDate: string;
  status: 'pending' | 'approved' | 'paid';
  category: string;
}

export interface ForecastData {
  month: string;
  actual: number | null;
  forecast: number;
  variance: number | null;
}

export const dsoTrend: DSOData[] = [
  { month: 'Jul', dso: 48, target: 40 },
  { month: 'Aug', dso: 46, target: 40 },
  { month: 'Sep', dso: 44, target: 40 },
  { month: 'Oct', dso: 43, target: 40 },
  { month: 'Nov', dso: 41, target: 40 },
  { month: 'Dec', dso: 39, target: 40 },
  { month: 'Jan', dso: 42, target: 38 },
  { month: 'Feb', dso: 40, target: 38 },
  { month: 'Mar', dso: 38, target: 38 },
];

export const agingDistribution: AgingBucket[] = [
  { bucket: 'Current', amount: 4200000, percentage: 42, color: 'hsl(152, 60%, 40%)' },
  { bucket: '1-30 Days', amount: 2500000, percentage: 25, color: 'hsl(200, 80%, 50%)' },
  { bucket: '31-60 Days', amount: 1500000, percentage: 15, color: 'hsl(38, 92%, 50%)' },
  { bucket: '61-90 Days', amount: 1000000, percentage: 10, color: 'hsl(25, 85%, 55%)' },
  { bucket: '90+ Days', amount: 800000, percentage: 8, color: 'hsl(0, 72%, 51%)' },
];

export const overdueReceivables: OverdueReceivable[] = [
  { customer: 'Acme Corp', amount: 850000, daysPastDue: 95, risk: 'high', invoiceCount: 12 },
  { customer: 'GlobalTech Ltd', amount: 620000, daysPastDue: 72, risk: 'high', invoiceCount: 8 },
  { customer: 'Pinnacle Systems', amount: 450000, daysPastDue: 58, risk: 'medium', invoiceCount: 5 },
  { customer: 'Vertex Industries', amount: 380000, daysPastDue: 45, risk: 'medium', invoiceCount: 6 },
  { customer: 'NovaTech Solutions', amount: 290000, daysPastDue: 34, risk: 'low', invoiceCount: 3 },
  { customer: 'Meridian Group', amount: 210000, daysPastDue: 28, risk: 'low', invoiceCount: 4 },
];

export const disputes: DisputeItem[] = [
  { id: 'DSP-001', customer: 'Acme Corp', amount: 125000, reason: 'Pricing discrepancy', status: 'open', daysOpen: 18 },
  { id: 'DSP-002', customer: 'GlobalTech Ltd', amount: 89000, reason: 'Quality issue', status: 'in_review', daysOpen: 12 },
  { id: 'DSP-003', customer: 'Pinnacle Systems', amount: 67000, reason: 'Delivery delay', status: 'open', daysOpen: 25 },
  { id: 'DSP-004', customer: 'Vertex Industries', amount: 45000, reason: 'Duplicate invoice', status: 'resolved', daysOpen: 5 },
  { id: 'DSP-005', customer: 'NovaTech Solutions', amount: 32000, reason: 'Service not rendered', status: 'in_review', daysOpen: 8 },
];

export const cashCollections: CashCollection[] = [
  { month: 'Jul', collected: 5200, target: 5500 },
  { month: 'Aug', collected: 5800, target: 5700 },
  { month: 'Sep', collected: 6100, target: 6000 },
  { month: 'Oct', collected: 5900, target: 6200 },
  { month: 'Nov', collected: 6400, target: 6300 },
  { month: 'Dec', collected: 6800, target: 6500 },
  { month: 'Jan', collected: 7100, target: 6800 },
  { month: 'Feb', collected: 6900, target: 7000 },
  { month: 'Mar', collected: 7300, target: 7200 },
];

export const cashLiquidity: CashLiquidity[] = [
  { date: 'Week 1', balance: 12500, inflow: 3200, outflow: 2800 },
  { date: 'Week 2', balance: 12900, inflow: 3500, outflow: 3100 },
  { date: 'Week 3', balance: 13300, inflow: 3800, outflow: 3400 },
  { date: 'Week 4', balance: 13700, inflow: 4100, outflow: 3700 },
  { date: 'Week 5', balance: 14100, inflow: 3900, outflow: 3500 },
  { date: 'Week 6', balance: 14500, inflow: 4200, outflow: 3800 },
];

export const writeOffs: WriteOff[] = [
  { quarter: 'Q1 2023', amount: 180000, recovered: 45000 },
  { quarter: 'Q2 2023', amount: 150000, recovered: 62000 },
  { quarter: 'Q3 2023', amount: 120000, recovered: 38000 },
  { quarter: 'Q4 2023', amount: 95000, recovered: 28000 },
  { quarter: 'Q1 2024', amount: 110000, recovered: 42000 },
  { quarter: 'Q2 2024', amount: 85000, recovered: 35000 },
];

export const highRiskInvoices: HighRiskInvoice[] = [
  { invoiceNo: 'INV-4521', customer: 'Acme Corp', amount: 320000, dueDate: '2024-01-15', risk: 92, reason: 'Payment history + aging' },
  { invoiceNo: 'INV-4498', customer: 'GlobalTech Ltd', amount: 275000, dueDate: '2024-01-22', risk: 87, reason: 'Credit score decline' },
  { invoiceNo: 'INV-4510', customer: 'Pinnacle Systems', amount: 195000, dueDate: '2024-02-01', risk: 78, reason: 'Dispute pending' },
  { invoiceNo: 'INV-4533', customer: 'Vertex Industries', amount: 165000, dueDate: '2024-02-10', risk: 72, reason: 'Sector downturn' },
  { invoiceNo: 'INV-4545', customer: 'NovaTech Solutions', amount: 140000, dueDate: '2024-02-18', risk: 65, reason: 'Late payment trend' },
];

export const payables: PayableItem[] = [
  { vendor: 'AWS Cloud Services', amount: 285000, dueDate: '2024-03-15', status: 'approved', category: 'Technology' },
  { vendor: 'Office Solutions Inc', amount: 125000, dueDate: '2024-03-20', status: 'pending', category: 'Operations' },
  { vendor: 'TalentForce HR', amount: 195000, dueDate: '2024-03-22', status: 'approved', category: 'HR' },
  { vendor: 'MarketEdge Agency', amount: 165000, dueDate: '2024-03-25', status: 'pending', category: 'Marketing' },
  { vendor: 'DataSecure Systems', amount: 98000, dueDate: '2024-03-28', status: 'paid', category: 'Security' },
];

export const forecastData: ForecastData[] = [
  { month: 'Jul', actual: 5800, forecast: 5600, variance: 200 },
  { month: 'Aug', actual: 5900, forecast: 5900, variance: 0 },
  { month: 'Sep', actual: 6300, forecast: 6100, variance: 200 },
  { month: 'Oct', actual: 6600, forecast: 6500, variance: 100 },
  { month: 'Nov', actual: 6900, forecast: 7000, variance: -100 },
  { month: 'Dec', actual: 7200, forecast: 7100, variance: 100 },
  { month: 'Jan', actual: null, forecast: 7400, variance: null },
  { month: 'Feb', actual: null, forecast: 7600, variance: null },
  { month: 'Mar', actual: null, forecast: 7900, variance: null },
];

// Summary KPIs for the dashboard header
export function getSAPKPIs() {
  const totalReceivables = agingDistribution.reduce((s, b) => s + b.amount, 0);
  const overdueTotal = overdueReceivables.reduce((s, r) => s + r.amount, 0);
  const openDisputes = disputes.filter(d => d.status !== 'resolved').length;
  const disputeValue = disputes.filter(d => d.status !== 'resolved').reduce((s, d) => s + d.amount, 0);
  const latestCollection = cashCollections[cashCollections.length - 1];
  const collectionRate = ((latestCollection.collected / latestCollection.target) * 100).toFixed(1);
  const currentDSO = dsoTrend[dsoTrend.length - 1].dso;
  const totalWriteOffs = writeOffs.reduce((s, w) => s + w.amount, 0);
  const totalRecovered = writeOffs.reduce((s, w) => s + w.recovered, 0);

  return {
    totalReceivables,
    overdueTotal,
    openDisputes,
    disputeValue,
    collectionRate: +collectionRate,
    currentDSO,
    totalWriteOffs,
    totalRecovered,
    liquidityBalance: cashLiquidity[cashLiquidity.length - 1].balance,
  };
}
