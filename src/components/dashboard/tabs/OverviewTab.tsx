import { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Volume2 } from 'lucide-react';
import { KPICard } from '@/components/dashboard/KPICard';
import { RevenueChart } from '@/components/dashboard/RevenueChart';
import { ComparisonChart } from '@/components/dashboard/ComparisonChart';
import { ExpensePieChart } from '@/components/dashboard/ExpensePieChart';
import { getKPIs, getRevenueData, generateInsight, type TimePeriod, type Department } from '@/lib/financial-data';
import { getSAPKPIs } from '@/lib/sap-financial-data';
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, TrendingDown, DollarSign, Clock, AlertTriangle, CheckCircle } from 'lucide-react';

export function OverviewTab() {
  const [period, setPeriod] = useState<TimePeriod>('monthly');
  const [department, setDepartment] = useState<Department>('all');
  const [speaking, setSpeaking] = useState(false);

  const kpis = getKPIs(period, department);
  const chartData = getRevenueData(period);
  const sapKPIs = getSAPKPIs();

  const speakDashboard = () => {
    if (speaking) { speechSynthesis.cancel(); setSpeaking(false); return; }
    const text = generateInsight(period, department);
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.onend = () => setSpeaking(false);
    setSpeaking(true);
    speechSynthesis.speak(utterance);
  };

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <Select value={period} onValueChange={(v) => setPeriod(v as TimePeriod)}>
          <SelectTrigger className="w-[120px] h-8 text-xs"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="monthly">Monthly</SelectItem>
            <SelectItem value="quarterly">Quarterly</SelectItem>
            <SelectItem value="yearly">Yearly</SelectItem>
          </SelectContent>
        </Select>
        <Select value={department} onValueChange={(v) => setDepartment(v as Department)}>
          <SelectTrigger className="w-[130px] h-8 text-xs"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Departments</SelectItem>
            <SelectItem value="engineering">Engineering</SelectItem>
            <SelectItem value="sales">Sales</SelectItem>
            <SelectItem value="marketing">Marketing</SelectItem>
            <SelectItem value="operations">Operations</SelectItem>
            <SelectItem value="hr">HR</SelectItem>
          </SelectContent>
        </Select>
        <Button variant={speaking ? 'destructive' : 'outline'} size="sm" onClick={speakDashboard} className="gap-1.5 h-8 text-xs">
          <Volume2 className="h-3.5 w-3.5" />
          {speaking ? 'Stop' : 'Speak'}
        </Button>
      </div>

      {/* Large Infographic KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        <InfographicKPI icon={DollarSign} label="Total Receivables" value={`$${(sapKPIs.totalReceivables / 1e6).toFixed(1)}M`} change={3.2} trend="up" color="primary" />
        <InfographicKPI icon={Clock} label="Current DSO" value={`${sapKPIs.currentDSO} days`} change={-2.1} trend="down" color="success" />
        <InfographicKPI icon={AlertTriangle} label="Overdue" value={`$${(sapKPIs.overdueTotal / 1e6).toFixed(1)}M`} change={5.4} trend="up" color="destructive" />
        <InfographicKPI icon={CheckCircle} label="Collection Rate" value={`${sapKPIs.collectionRate}%`} change={1.4} trend="up" color="success" />
        <InfographicKPI icon={DollarSign} label="Liquidity" value={`$${(sapKPIs.liquidityBalance / 1e3).toFixed(0)}K`} change={2.8} trend="up" color="primary" />
        <InfographicKPI icon={AlertTriangle} label="Open Disputes" value={`${sapKPIs.openDisputes}`} change={-1} trend="down" color="warning" />
      </div>

      {/* Standard KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {kpis.map((kpi, i) => <KPICard key={kpi.label} kpi={kpi} index={i} />)}
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-4">
        <RevenueChart data={chartData} />
        <ComparisonChart data={chartData} />
      </div>
      <div className="grid lg:grid-cols-2 gap-4">
        <ExpensePieChart />
        <Card className="border-0 shadow-sm">
          <CardContent className="p-5">
            <h3 className="text-sm font-display font-semibold mb-2">AI Insights</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">{generateInsight(period, department)}</p>
            <div className="mt-3 p-3 bg-accent rounded-lg">
              <p className="text-xs font-medium text-accent-foreground">💡 Recommendation</p>
              <p className="text-[11px] text-muted-foreground mt-1">Consider reallocating 3% of marketing budget to R&D based on current growth trajectories.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function InfographicKPI({ icon: Icon, label, value, change, trend, color }: {
  icon: React.ElementType; label: string; value: string; change: number; trend: 'up' | 'down'; color: string;
}) {
  const colorMap: Record<string, string> = {
    primary: 'bg-primary/10 text-primary',
    success: 'bg-success/10 text-success',
    destructive: 'bg-destructive/10 text-destructive',
    warning: 'bg-warning/10 text-warning',
  };
  const iconStyle = colorMap[color] || colorMap.primary;

  return (
    <Card className="border-0 shadow-sm animate-fade-in">
      <CardContent className="p-4">
        <div className={`h-8 w-8 rounded-lg ${iconStyle} flex items-center justify-center mb-2`}>
          <Icon className="h-4 w-4" />
        </div>
        <p className="text-[11px] text-muted-foreground mb-0.5">{label}</p>
        <p className="text-lg font-display font-bold text-foreground">{value}</p>
        <div className={`flex items-center gap-1 mt-1 text-xs ${trend === 'up' && color !== 'destructive' ? 'text-success' : trend === 'down' && color !== 'destructive' ? 'text-destructive' : color === 'destructive' && trend === 'up' ? 'text-destructive' : 'text-success'}`}>
          {trend === 'up' ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
          <span>{Math.abs(change)}%</span>
        </div>
      </CardContent>
    </Card>
  );
}
