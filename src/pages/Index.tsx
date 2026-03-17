import { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Volume2 } from 'lucide-react';
import { KPICard } from '@/components/dashboard/KPICard';
import { RevenueChart } from '@/components/dashboard/RevenueChart';
import { ComparisonChart } from '@/components/dashboard/ComparisonChart';
import { ExpensePieChart } from '@/components/dashboard/ExpensePieChart';
import { getKPIs, getRevenueData, generateInsight, type TimePeriod, type Department } from '@/lib/financial-data';

export default function Index() {
  const [period, setPeriod] = useState<TimePeriod>('monthly');
  const [department, setDepartment] = useState<Department>('all');
  const [speaking, setSpeaking] = useState(false);

  const kpis = getKPIs(period, department);
  const chartData = getRevenueData(period);

  const speakDashboard = () => {
    if (speaking) {
      speechSynthesis.cancel();
      setSpeaking(false);
      return;
    }
    const text = generateInsight(period, department);
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.onend = () => setSpeaking(false);
    setSpeaking(true);
    speechSynthesis.speak(utterance);
  };

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">Financial Dashboard</h1>
          <p className="text-sm text-muted-foreground">Real-time insights across your organization</p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={period} onValueChange={(v) => setPeriod(v as TimePeriod)}>
            <SelectTrigger className="w-[130px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="quarterly">Quarterly</SelectItem>
              <SelectItem value="yearly">Yearly</SelectItem>
            </SelectContent>
          </Select>
          <Select value={department} onValueChange={(v) => setDepartment(v as Department)}>
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              <SelectItem value="engineering">Engineering</SelectItem>
              <SelectItem value="sales">Sales</SelectItem>
              <SelectItem value="marketing">Marketing</SelectItem>
              <SelectItem value="operations">Operations</SelectItem>
              <SelectItem value="hr">HR</SelectItem>
            </SelectContent>
          </Select>
          <Button variant={speaking ? 'destructive' : 'default'} size="sm" onClick={speakDashboard} className="gap-2">
            <Volume2 className="h-4 w-4" />
            {speaking ? 'Stop' : 'Speak'}
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {kpis.map((kpi, i) => (
          <KPICard key={kpi.label} kpi={kpi} index={i} />
        ))}
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-4">
        <RevenueChart data={chartData} />
        <ComparisonChart data={chartData} />
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <ExpensePieChart />
        <div className="bg-card rounded-lg border-0 shadow-sm p-6">
          <h3 className="text-base font-display font-semibold mb-3">AI Insights</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{generateInsight(period, department)}</p>
          <div className="mt-4 p-3 bg-accent rounded-lg">
            <p className="text-xs font-medium text-accent-foreground">💡 Recommendation</p>
            <p className="text-xs text-muted-foreground mt-1">Consider reallocating 3% of marketing budget to R&D based on current growth trajectories.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
