import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cashCollections, cashLiquidity, writeOffs, getCashManagementKPIs } from '@/lib/sap-financial-data';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { TrendingUp, TrendingDown } from 'lucide-react';

export function CashManagementTab() {
  const kpis = getCashManagementKPIs();

  return (
    <div className="space-y-4">
      {/* 6 KPI Tiles */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {kpis.map((kpi) => (
          <CashKPICard key={kpi.label} kpi={kpi} />
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        {/* Collections vs Target */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2"><CardTitle className="text-sm font-display">Collections vs Target</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={cashCollections}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 91%)" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="hsl(220, 10%, 46%)" />
                <YAxis tick={{ fontSize: 11 }} stroke="hsl(220, 10%, 46%)" />
                <Tooltip />
                <Legend />
                <Bar dataKey="collected" fill="hsl(263, 70%, 50%)" radius={[4, 4, 0, 0]} name="Collected" />
                <Bar dataKey="target" fill="hsl(220, 13%, 85%)" radius={[4, 4, 0, 0]} name="Target" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Liquidity Trend */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2"><CardTitle className="text-sm font-display">Cash Liquidity</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={cashLiquidity}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 91%)" />
                <XAxis dataKey="date" tick={{ fontSize: 11 }} stroke="hsl(220, 10%, 46%)" />
                <YAxis tick={{ fontSize: 11 }} stroke="hsl(220, 10%, 46%)" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="balance" stroke="hsl(263, 70%, 50%)" strokeWidth={2.5} name="Balance" />
                <Line type="monotone" dataKey="inflow" stroke="hsl(152, 60%, 40%)" strokeWidth={1.5} name="Inflow" />
                <Line type="monotone" dataKey="outflow" stroke="hsl(0, 72%, 51%)" strokeWidth={1.5} name="Outflow" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Cash Forecast vs Actual */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-2"><CardTitle className="text-sm font-display">Cash Forecast vs Actual</CardTitle></CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={cashCollections}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 91%)" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="hsl(220, 10%, 46%)" />
              <YAxis tick={{ fontSize: 11 }} stroke="hsl(220, 10%, 46%)" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="collected" stroke="hsl(263, 70%, 50%)" strokeWidth={2.5} name="Actual" dot={{ r: 4 }} />
              <Line type="monotone" dataKey="target" stroke="hsl(220, 13%, 75%)" strokeWidth={2} strokeDasharray="5 5" name="Forecast" dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Write-offs */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-2"><CardTitle className="text-sm font-display">Write-offs & Recovery</CardTitle></CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={writeOffs}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 91%)" />
              <XAxis dataKey="quarter" tick={{ fontSize: 11 }} stroke="hsl(220, 10%, 46%)" />
              <YAxis tick={{ fontSize: 11 }} stroke="hsl(220, 10%, 46%)" tickFormatter={(v) => `$${(v / 1e3).toFixed(0)}K`} />
              <Tooltip formatter={(v: number) => `$${(v / 1e3).toFixed(0)}K`} />
              <Legend />
              <Bar dataKey="amount" fill="hsl(0, 72%, 51%)" radius={[4, 4, 0, 0]} name="Write-off" />
              <Bar dataKey="recovered" fill="hsl(152, 60%, 40%)" radius={[4, 4, 0, 0]} name="Recovered" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}

function CashKPICard({ kpi }: { kpi: ReturnType<typeof getCashManagementKPIs>[0] }) {
  const statusColors: Record<string, string> = {
    good: 'border-l-success',
    warning: 'border-l-warning',
    critical: 'border-l-destructive',
  };

  return (
    <Card className={`border-0 shadow-sm border-l-4 ${statusColors[kpi.status]}`}>
      <CardContent className="p-4">
        <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{kpi.label}</p>
        <p className="text-lg font-display font-bold text-foreground mt-1">{kpi.value}</p>
        <div className={`flex items-center gap-1 mt-1 text-xs ${kpi.trend >= 0 ? 'text-success' : 'text-destructive'}`}>
          {kpi.trend >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
          <span>{Math.abs(kpi.trend)}%</span>
        </div>
        <p className="text-[10px] text-muted-foreground mt-1 leading-tight">{kpi.description}</p>
      </CardContent>
    </Card>
  );
}
