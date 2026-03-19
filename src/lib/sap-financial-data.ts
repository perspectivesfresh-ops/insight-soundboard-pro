// Synthetic SAP-style financial data for advanced KPIs

// ── Types ──────────────────────────────────────────────────

export interface DSOData { month: string; dso: number; target: number; }
export interface AgingBucket { bucket: string; amount: number; percentage: number; color: string; }
export interface OverdueReceivable { customer: string; amount: number; daysPastDue: number; risk: 'high' | 'medium' | 'low'; invoiceCount: number; }
export interface DisputeItem { id: string; customer: string; amount: number; reason: string; status: 'open' | 'in_review' | 'resolved'; daysOpen: number; }
export interface CashCollection { month: string; collected: number; target: number; }
export interface CashLiquidity { date: string; balance: number; inflow: number; outflow: number; }
export interface WriteOff { quarter: string; amount: number; recovered: number; }
export interface HighRiskInvoice { invoiceNo: string; customer: string; amount: number; dueDate: string; risk: number; reason: string; dso: number; riskLevel: 'low' | 'medium' | 'high'; }
export interface PayableItem { vendor: string; amount: number; dueDate: string; status: 'pending' | 'approved' | 'paid'; category: string; }
export interface ForecastData { month: string; actual: number | null; forecast: number; variance: number | null; }

// SAP ACDOCA-style GL entries
export interface GLEntry { docNo: string; companyCode: string; account: string; accountName: string; amount: number; currency: string; postingDate: string; documentType: string; }
// SAP BSID-style receivables
export interface ReceivableEntry { docNo: string; customer: string; customerName: string; amount: number; dueDate: string; clearingDate: string | null; daysPastDue: number; }
// SAP BSEG-style payable entries
export interface PayableEntry { docNo: string; vendor: string; vendorName: string; amount: number; dueDate: string; paymentDate: string | null; status: 'open' | 'cleared'; }

// Cash management KPIs
export interface CashKPI { label: string; value: string; numericValue: number; unit: string; status: 'good' | 'warning' | 'critical'; trend: number; description: string; }

// ── Data ───────────────────────────────────────────────────

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
  { invoiceNo: 'INV-4521', customer: 'Acme Corp', amount: 320000, dueDate: '2024-01-15', risk: 92, reason: 'Payment history + aging', dso: 135, riskLevel: 'high' },
  { invoiceNo: 'INV-4498', customer: 'GlobalTech Ltd', amount: 275000, dueDate: '2024-01-22', risk: 87, reason: 'Credit score decline', dso: 125, riskLevel: 'high' },
  { invoiceNo: 'INV-4510', customer: 'Pinnacle Systems', amount: 195000, dueDate: '2024-02-01', risk: 78, reason: 'Dispute pending', dso: 98, riskLevel: 'medium' },
  { invoiceNo: 'INV-4533', customer: 'Vertex Industries', amount: 165000, dueDate: '2024-02-10', risk: 72, reason: 'Sector downturn', dso: 92, riskLevel: 'medium' },
  { invoiceNo: 'INV-4545', customer: 'NovaTech Solutions', amount: 140000, dueDate: '2024-02-18', risk: 65, reason: 'Late payment trend', dso: 88, riskLevel: 'medium' },
  { invoiceNo: 'INV-4558', customer: 'Meridian Group', amount: 120000, dueDate: '2024-02-25', risk: 58, reason: 'Volume decrease', dso: 75, riskLevel: 'low' },
  { invoiceNo: 'INV-4562', customer: 'Summit Partners', amount: 98000, dueDate: '2024-03-01', risk: 52, reason: 'New customer risk', dso: 68, riskLevel: 'low' },
  { invoiceNo: 'INV-4571', customer: 'Crestline Inc', amount: 87000, dueDate: '2024-03-05', risk: 48, reason: 'Industry volatility', dso: 62, riskLevel: 'low' },
  { invoiceNo: 'INV-4580', customer: 'BluePeak Analytics', amount: 76000, dueDate: '2024-03-10', risk: 44, reason: 'Slow payment pattern', dso: 60, riskLevel: 'low' },
  { invoiceNo: 'INV-4589', customer: 'Ironclad Systems', amount: 65000, dueDate: '2024-03-15', risk: 40, reason: 'Regional economic risk', dso: 55, riskLevel: 'low' },
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

// ── SAP ACDOCA GL Entries ──────────────────────────────────
export const glEntries: GLEntry[] = [
  { docNo: 'GL-100001', companyCode: '1000', account: '400000', accountName: 'Revenue - Products', amount: 2850000, currency: 'USD', postingDate: '2024-01-15', documentType: 'RV' },
  { docNo: 'GL-100002', companyCode: '1000', account: '400100', accountName: 'Revenue - Services', amount: 1450000, currency: 'USD', postingDate: '2024-01-20', documentType: 'RV' },
  { docNo: 'GL-100003', companyCode: '1000', account: '500000', accountName: 'COGS - Materials', amount: -1200000, currency: 'USD', postingDate: '2024-01-22', documentType: 'RE' },
  { docNo: 'GL-100004', companyCode: '1000', account: '610000', accountName: 'Salaries & Wages', amount: -890000, currency: 'USD', postingDate: '2024-01-31', documentType: 'SA' },
  { docNo: 'GL-100005', companyCode: '1000', account: '620000', accountName: 'Marketing Expense', amount: -320000, currency: 'USD', postingDate: '2024-02-05', documentType: 'KR' },
  { docNo: 'GL-100006', companyCode: '1000', account: '630000', accountName: 'R&D Expense', amount: -450000, currency: 'USD', postingDate: '2024-02-10', documentType: 'KR' },
  { docNo: 'GL-100007', companyCode: '1000', account: '140000', accountName: 'Accounts Receivable', amount: 4300000, currency: 'USD', postingDate: '2024-02-15', documentType: 'DR' },
  { docNo: 'GL-100008', companyCode: '1000', account: '210000', accountName: 'Accounts Payable', amount: -1680000, currency: 'USD', postingDate: '2024-02-20', documentType: 'KR' },
];

// ── SAP BSID Receivable Entries ────────────────────────────
export const receivableEntries: ReceivableEntry[] = [
  { docNo: 'AR-200001', customer: 'C-1001', customerName: 'Acme Corp', amount: 320000, dueDate: '2024-01-15', clearingDate: null, daysPastDue: 65 },
  { docNo: 'AR-200002', customer: 'C-1002', customerName: 'GlobalTech Ltd', amount: 275000, dueDate: '2024-01-22', clearingDate: null, daysPastDue: 58 },
  { docNo: 'AR-200003', customer: 'C-1003', customerName: 'Pinnacle Systems', amount: 195000, dueDate: '2024-02-01', clearingDate: null, daysPastDue: 48 },
  { docNo: 'AR-200004', customer: 'C-1004', customerName: 'Vertex Industries', amount: 165000, dueDate: '2024-02-10', clearingDate: '2024-03-01', daysPastDue: 0 },
  { docNo: 'AR-200005', customer: 'C-1005', customerName: 'NovaTech Solutions', amount: 140000, dueDate: '2024-02-18', clearingDate: null, daysPastDue: 30 },
  { docNo: 'AR-200006', customer: 'C-1006', customerName: 'Meridian Group', amount: 120000, dueDate: '2024-02-25', clearingDate: '2024-03-10', daysPastDue: 0 },
  { docNo: 'AR-200007', customer: 'C-1007', customerName: 'Summit Partners', amount: 98000, dueDate: '2024-03-01', clearingDate: null, daysPastDue: 18 },
  { docNo: 'AR-200008', customer: 'C-1008', customerName: 'Crestline Inc', amount: 87000, dueDate: '2024-03-05', clearingDate: null, daysPastDue: 14 },
];

// ── SAP BSEG Payable Entries ───────────────────────────────
export const payableEntries: PayableEntry[] = [
  { docNo: 'AP-300001', vendor: 'V-2001', vendorName: 'AWS Cloud Services', amount: 285000, dueDate: '2024-03-15', paymentDate: null, status: 'open' },
  { docNo: 'AP-300002', vendor: 'V-2002', vendorName: 'Office Solutions Inc', amount: 125000, dueDate: '2024-03-20', paymentDate: null, status: 'open' },
  { docNo: 'AP-300003', vendor: 'V-2003', vendorName: 'TalentForce HR', amount: 195000, dueDate: '2024-03-22', paymentDate: null, status: 'open' },
  { docNo: 'AP-300004', vendor: 'V-2004', vendorName: 'MarketEdge Agency', amount: 165000, dueDate: '2024-03-25', paymentDate: '2024-03-18', status: 'cleared' },
  { docNo: 'AP-300005', vendor: 'V-2005', vendorName: 'DataSecure Systems', amount: 98000, dueDate: '2024-03-28', paymentDate: '2024-03-20', status: 'cleared' },
];

// ── Cash Management KPIs ───────────────────────────────────
export function getCashManagementKPIs(): CashKPI[] {
  const currentBalance = cashLiquidity[cashLiquidity.length - 1].balance;
  const dso = dsoTrend[dsoTrend.length - 1].dso;
  const dpo = 45; // simulated
  const dio = 32; // simulated
  const ccc = dso + dio - dpo;
  const latestCollection = cashCollections[cashCollections.length - 1];
  const forecastAccuracy = ((latestCollection.collected / latestCollection.target) * 100);
  const fcf = 4200; // simulated in thousands

  return [
    { label: 'Cash Position', value: `$${(currentBalance / 1e3).toFixed(1)}M`, numericValue: currentBalance, unit: 'USD', status: currentBalance > 12000 ? 'good' : 'warning', trend: 3.2, description: 'Current liquid cash available' },
    { label: 'Forecast Accuracy', value: `${forecastAccuracy.toFixed(1)}%`, numericValue: forecastAccuracy, unit: '%', status: forecastAccuracy >= 98 ? 'good' : forecastAccuracy >= 95 ? 'warning' : 'critical', trend: 1.4, description: 'Cash flow forecast vs actual' },
    { label: 'DSO', value: `${dso} days`, numericValue: dso, unit: 'days', status: dso <= 40 ? 'good' : dso <= 50 ? 'warning' : 'critical', trend: -2.1, description: 'Days Sales Outstanding' },
    { label: 'DPO', value: `${dpo} days`, numericValue: dpo, unit: 'days', status: dpo >= 40 ? 'good' : 'warning', trend: 1.5, description: 'Days Payable Outstanding' },
    { label: 'CCC', value: `${ccc} days`, numericValue: ccc, unit: 'days', status: ccc <= 30 ? 'good' : ccc <= 45 ? 'warning' : 'critical', trend: -3.0, description: `Cash Conversion Cycle (DSO ${dso} + DIO ${dio} − DPO ${dpo})` },
    { label: 'Free Cash Flow', value: `$${(fcf / 1e3).toFixed(1)}M`, numericValue: fcf, unit: 'USD', status: fcf > 3000 ? 'good' : 'warning', trend: 5.8, description: 'Operating cash flow minus CapEx' },
  ];
}

// ── Process Flow Steps ─────────────────────────────────────
export interface ProcessFlowStep {
  id: string;
  label: string;
  description: string;
  status: 'active' | 'warning' | 'error' | 'completed' | 'idle';
  metrics?: { label: string; value: string }[];
  anomaly?: string;
}

export const arProcessFlow: ProcessFlowStep[] = [
  { id: 'ar', label: 'Accounts Receivable', description: 'Invoice generation & posting', status: 'active', metrics: [{ label: 'Open Items', value: '847' }, { label: 'Value', value: '$10M' }] },
  { id: 'dunning', label: 'Dunning Notice', description: 'Automated payment reminders', status: 'active', metrics: [{ label: 'Sent', value: '124' }, { label: 'Response', value: '68%' }] },
  { id: 'call-center', label: 'Call Center', description: 'Customer outreach & negotiation', status: 'warning', metrics: [{ label: 'Active Calls', value: '32' }, { label: 'Resolution', value: '54%' }], anomaly: 'Resolution rate dropped 12% this week' },
  { id: 'collections', label: 'Collections', description: 'Formal collection actions', status: 'active', metrics: [{ label: 'Cases', value: '18' }, { label: 'Recovered', value: '$420K' }] },
  { id: 'third-party', label: 'Third Party AR Sale', description: 'Factoring & AR sales', status: 'idle', metrics: [{ label: 'Sold', value: '$0' }, { label: 'Discount', value: 'N/A' }] },
  { id: 'cash', label: 'Cash', description: 'Payment received & applied', status: 'completed', metrics: [{ label: 'Collected', value: '$7.3M' }, { label: 'Rate', value: '101.4%' }] },
  { id: 'write-off', label: 'Write-Off', description: 'Uncollectable debt write-off', status: 'error', metrics: [{ label: 'YTD', value: '$85K' }, { label: 'vs Budget', value: '+12%' }], anomaly: 'Write-offs exceeding quarterly budget by 12%' },
  { id: 'settlement', label: 'Settlement', description: 'Dispute settlements & adjustments', status: 'active', metrics: [{ label: 'Pending', value: '4' }, { label: 'Value', value: '$281K' }] },
  { id: 'signal', label: 'Signal Processing', description: 'AI pattern detection & alerts', status: 'active', metrics: [{ label: 'Signals', value: '12' }, { label: 'Accuracy', value: '94%' }] },
];

// ── Agent Orchestration ────────────────────────────────────
export interface AgentStatus {
  name: string;
  role: string;
  status: 'idle' | 'active' | 'processing' | 'error';
  lastAction?: string;
  icon: string;
}

export const agentStatuses: AgentStatus[] = [
  { name: 'Orchestrator', role: 'Workflow Controller', status: 'idle', lastAction: 'Dispatched analysis task', icon: '🎯' },
  { name: 'Sensor', role: 'Data Collection', status: 'idle', lastAction: 'Ingested 2,847 records', icon: '📡' },
  { name: 'Analyzer', role: 'Data Analysis', status: 'idle', lastAction: 'Computed risk scores', icon: '🔬' },
  { name: 'Responder', role: 'Report Generator', status: 'idle', lastAction: 'Generated Q1 report', icon: '📊' },
  { name: 'Learner', role: 'Continuous Learning', status: 'idle', lastAction: 'Updated DSO model', icon: '🧠' },
];

// ── Risk thresholds ────────────────────────────────────────
export function getDSORiskLevel(dso: number): 'low' | 'medium' | 'high' {
  if (dso >= 120) return 'high';
  if (dso >= 90) return 'medium';
  return 'low';
}

export function getHighRiskExposure() {
  const total = highRiskInvoices.reduce((s, i) => s + i.amount, 0);
  const byRisk = { high: 0, medium: 0, low: 0 };
  highRiskInvoices.forEach(inv => { byRisk[inv.riskLevel] += inv.amount; });
  return { total, byRisk, count: highRiskInvoices.length };
}

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
    totalReceivables, overdueTotal, openDisputes, disputeValue,
    collectionRate: +collectionRate, currentDSO, totalWriteOffs, totalRecovered,
    liquidityBalance: cashLiquidity[cashLiquidity.length - 1].balance,
  };
}
