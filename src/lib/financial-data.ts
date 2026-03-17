export type TimePeriod = 'monthly' | 'quarterly' | 'yearly';
export type Department = 'all' | 'engineering' | 'sales' | 'marketing' | 'operations' | 'hr';

export interface KPI {
  label: string;
  value: string;
  change: number;
  trend: 'up' | 'down';
  prefix?: string;
}

export interface RevenueData {
  name: string;
  revenue: number;
  expenses: number;
  profit: number;
}

export interface ExpenseBreakdown {
  name: string;
  value: number;
  color: string;
}

const monthlyData: RevenueData[] = [
  { name: 'Jan', revenue: 4200, expenses: 3100, profit: 1100 },
  { name: 'Feb', revenue: 4500, expenses: 3200, profit: 1300 },
  { name: 'Mar', revenue: 4800, expenses: 3000, profit: 1800 },
  { name: 'Apr', revenue: 5100, expenses: 3400, profit: 1700 },
  { name: 'May', revenue: 5400, expenses: 3300, profit: 2100 },
  { name: 'Jun', revenue: 5800, expenses: 3500, profit: 2300 },
  { name: 'Jul', revenue: 6100, expenses: 3600, profit: 2500 },
  { name: 'Aug', revenue: 5900, expenses: 3400, profit: 2500 },
  { name: 'Sep', revenue: 6300, expenses: 3700, profit: 2600 },
  { name: 'Oct', revenue: 6600, expenses: 3800, profit: 2800 },
  { name: 'Nov', revenue: 6900, expenses: 3900, profit: 3000 },
  { name: 'Dec', revenue: 7200, expenses: 4000, profit: 3200 },
];

const quarterlyData: RevenueData[] = [
  { name: 'Q1', revenue: 13500, expenses: 9300, profit: 4200 },
  { name: 'Q2', revenue: 16300, expenses: 10200, profit: 6100 },
  { name: 'Q3', revenue: 18300, expenses: 10700, profit: 7600 },
  { name: 'Q4', revenue: 20700, expenses: 11700, profit: 9000 },
];

const yearlyData: RevenueData[] = [
  { name: '2021', revenue: 42000, expenses: 32000, profit: 10000 },
  { name: '2022', revenue: 52000, expenses: 37000, profit: 15000 },
  { name: '2023', revenue: 61000, expenses: 40000, profit: 21000 },
  { name: '2024', revenue: 68800, expenses: 41900, profit: 26900 },
];

export const expenseBreakdown: ExpenseBreakdown[] = [
  { name: 'Salaries', value: 42, color: 'hsl(263, 70%, 50%)' },
  { name: 'Operations', value: 18, color: 'hsl(152, 60%, 40%)' },
  { name: 'Marketing', value: 15, color: 'hsl(38, 92%, 50%)' },
  { name: 'R&D', value: 14, color: 'hsl(200, 80%, 50%)' },
  { name: 'Admin', value: 11, color: 'hsl(340, 65%, 55%)' },
];

export const departmentMultipliers: Record<Department, number> = {
  all: 1,
  engineering: 0.35,
  sales: 0.25,
  marketing: 0.15,
  operations: 0.18,
  hr: 0.07,
};

export function getRevenueData(period: TimePeriod): RevenueData[] {
  switch (period) {
    case 'monthly': return monthlyData;
    case 'quarterly': return quarterlyData;
    case 'yearly': return yearlyData;
  }
}

export function getKPIs(period: TimePeriod, department: Department): KPI[] {
  const mult = departmentMultipliers[department];
  const data = getRevenueData(period);
  const latest = data[data.length - 1];
  const prev = data[data.length - 2];

  const revChange = ((latest.revenue - prev.revenue) / prev.revenue) * 100;
  const expChange = ((latest.expenses - prev.expenses) / prev.expenses) * 100;
  const profitMargin = ((latest.profit / latest.revenue) * 100);
  const cashFlow = latest.profit * 0.85;
  const ebitda = latest.profit * 1.15;

  return [
    { label: 'Revenue', value: `$${(latest.revenue * mult / 1000).toFixed(1)}M`, change: +revChange.toFixed(1), trend: revChange > 0 ? 'up' : 'down', prefix: '$' },
    { label: 'Expenses', value: `$${(latest.expenses * mult / 1000).toFixed(1)}M`, change: +expChange.toFixed(1), trend: expChange > 0 ? 'up' : 'down', prefix: '$' },
    { label: 'Profit Margin', value: `${profitMargin.toFixed(1)}%`, change: 2.3, trend: 'up' },
    { label: 'Cash Flow', value: `$${(cashFlow * mult / 1000).toFixed(1)}M`, change: 8.4, trend: 'up', prefix: '$' },
    { label: 'EBITDA', value: `$${(ebitda * mult / 1000).toFixed(1)}M`, change: 5.7, trend: 'up', prefix: '$' },
  ];
}

export function generateInsight(period: TimePeriod, department: Department): string {
  const kpis = getKPIs(period, department);
  const rev = kpis[0];
  const dept = department === 'all' ? 'across all departments' : `in the ${department} department`;
  return `Revenue is ${rev.value} ${dept}, ${rev.trend === 'up' ? 'up' : 'down'} ${Math.abs(rev.change)}% compared to the previous period. Profit margin stands at ${kpis[2].value} with cash flow at ${kpis[3].value}. EBITDA is trending positively at ${kpis[4].value}.`;
}
