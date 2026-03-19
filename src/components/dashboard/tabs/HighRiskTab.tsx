import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { highRiskInvoices, disputes, getHighRiskExposure, getDSORiskLevel } from '@/lib/sap-financial-data';
import { AlertTriangle, ShieldAlert, DollarSign, TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie, Legend } from 'recharts';

export function HighRiskTab() {
  const exposure = getHighRiskExposure();
  const riskDistribution = [
    { name: 'High (DSO ≥ 120)', value: exposure.byRisk.high, color: 'hsl(0, 72%, 51%)' },
    { name: 'Medium (DSO ≥ 90)', value: exposure.byRisk.medium, color: 'hsl(38, 92%, 50%)' },
    { name: 'Low (DSO ≥ 60)', value: exposure.byRisk.low, color: 'hsl(200, 80%, 50%)' },
  ];

  const top10ByValue = [...highRiskInvoices].sort((a, b) => b.amount - a.amount).slice(0, 10);

  return (
    <div className="space-y-4">
      {/* Exposure Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <ExposureCard icon={DollarSign} label="Total Exposure" value={`$${(exposure.total / 1e6).toFixed(2)}M`} color="destructive" />
        <ExposureCard icon={ShieldAlert} label="High Risk" value={`$${(exposure.byRisk.high / 1e3).toFixed(0)}K`} color="destructive" />
        <ExposureCard icon={AlertTriangle} label="Medium Risk" value={`$${(exposure.byRisk.medium / 1e3).toFixed(0)}K`} color="warning" />
        <ExposureCard icon={TrendingUp} label="Invoices at Risk" value={`${exposure.count}`} color="primary" />
      </div>

      {/* DSO Thresholds Legend */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-4">
          <p className="text-xs font-semibold text-muted-foreground mb-2">DSO Risk Thresholds</p>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2"><div className="h-3 w-3 rounded-full bg-destructive" /><span className="text-xs">DSO ≥ 120 → High Risk</span></div>
            <div className="flex items-center gap-2"><div className="h-3 w-3 rounded-full bg-warning" /><span className="text-xs">DSO ≥ 90 → Medium Risk</span></div>
            <div className="flex items-center gap-2"><div className="h-3 w-3 rounded-full" style={{ background: 'hsl(200, 80%, 50%)' }} /><span className="text-xs">DSO ≥ 60 → Low Risk</span></div>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-4">
        {/* Risk Distribution Pie */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2"><CardTitle className="text-sm font-display">Risk Distribution by Exposure</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={riskDistribution} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} label={({ name, percent }) => `${name.split(' ')[0]} ${(percent * 100).toFixed(0)}%`} labelLine={false} fontSize={10}>
                  {riskDistribution.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Pie>
                <Tooltip formatter={(v: number) => `$${(v / 1e3).toFixed(0)}K`} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Top 10 by Value Chart */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2"><CardTitle className="text-sm font-display">Top 10 Invoices by Value</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={top10ByValue} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 91%)" />
                <XAxis type="number" tick={{ fontSize: 10 }} tickFormatter={(v) => `$${(v / 1e3).toFixed(0)}K`} stroke="hsl(220, 10%, 46%)" />
                <YAxis type="category" dataKey="customer" tick={{ fontSize: 10 }} width={100} stroke="hsl(220, 10%, 46%)" />
                <Tooltip formatter={(v: number) => `$${(v / 1e3).toFixed(0)}K`} />
                <Bar dataKey="amount" radius={[0, 4, 4, 0]}>
                  {top10ByValue.map((entry, i) => (
                    <Cell key={i} fill={entry.riskLevel === 'high' ? 'hsl(0, 72%, 51%)' : entry.riskLevel === 'medium' ? 'hsl(38, 92%, 50%)' : 'hsl(200, 80%, 50%)'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Invoice Table */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-display flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-destructive" /> High Risk Invoice Details
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="border-b text-left text-xs text-muted-foreground">
                <th className="px-5 py-2 font-medium">Invoice</th>
                <th className="px-5 py-2 font-medium">Customer</th>
                <th className="px-5 py-2 font-medium">Amount</th>
                <th className="px-5 py-2 font-medium">DSO</th>
                <th className="px-5 py-2 font-medium">Risk Level</th>
                <th className="px-5 py-2 font-medium">Risk Score</th>
                <th className="px-5 py-2 font-medium">Reason</th>
              </tr></thead>
              <tbody>
                {highRiskInvoices.map((inv) => {
                  const riskLevel = getDSORiskLevel(inv.dso);
                  const riskColor = riskLevel === 'high' ? 'destructive' : riskLevel === 'medium' ? 'secondary' : 'outline';
                  return (
                    <tr key={inv.invoiceNo} className="border-b last:border-0">
                      <td className="px-5 py-3 font-mono text-xs">{inv.invoiceNo}</td>
                      <td className="px-5 py-3 font-medium">{inv.customer}</td>
                      <td className="px-5 py-3 font-semibold">${(inv.amount / 1e3).toFixed(0)}K</td>
                      <td className="px-5 py-3">{inv.dso}d</td>
                      <td className="px-5 py-3"><Badge variant={riskColor} className="text-[10px] capitalize">{riskLevel}</Badge></td>
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-12 h-2 rounded-full bg-muted overflow-hidden">
                            <div className="h-full rounded-full bg-destructive" style={{ width: `${inv.risk}%` }} />
                          </div>
                          <span className="text-xs font-semibold text-destructive">{inv.risk}%</span>
                        </div>
                      </td>
                      <td className="px-5 py-3 text-xs text-muted-foreground">{inv.reason}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Disputes */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-2"><CardTitle className="text-sm font-display">Active Disputes</CardTitle></CardHeader>
        <CardContent className="p-0">
          <div className="divide-y">
            {disputes.filter(d => d.status !== 'resolved').map((d) => (
              <div key={d.id} className="flex items-center justify-between px-5 py-3">
                <div>
                  <p className="text-sm font-medium">{d.customer} <span className="text-xs text-muted-foreground font-mono ml-1">{d.id}</span></p>
                  <p className="text-xs text-muted-foreground">{d.reason} · {d.daysOpen}d open</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold">${(d.amount / 1e3).toFixed(0)}K</span>
                  <Badge variant={d.status === 'open' ? 'destructive' : 'secondary'} className="text-[10px]">{d.status.replace('_', ' ')}</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function ExposureCard({ icon: Icon, label, value, color }: { icon: React.ElementType; label: string; value: string; color: string }) {
  const colorMap: Record<string, string> = {
    destructive: 'bg-destructive/10 text-destructive',
    warning: 'bg-warning/10 text-warning',
    primary: 'bg-primary/10 text-primary',
  };
  return (
    <Card className="border-0 shadow-sm">
      <CardContent className="p-4">
        <div className={`h-8 w-8 rounded-lg ${colorMap[color]} flex items-center justify-center mb-2`}>
          <Icon className="h-4 w-4" />
        </div>
        <p className="text-[11px] text-muted-foreground">{label}</p>
        <p className="text-lg font-display font-bold text-foreground">{value}</p>
      </CardContent>
    </Card>
  );
}
