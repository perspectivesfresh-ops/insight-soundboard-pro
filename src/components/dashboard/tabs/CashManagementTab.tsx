import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cashCollections, cashLiquidity, writeOffs } from '@/lib/sap-financial-data';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export function CashManagementTab() {
  const totalWriteOff = writeOffs.reduce((s, w) => s + w.amount, 0);
  const totalRecovered = writeOffs.reduce((s, w) => s + w.recovered, 0);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard label="Current Balance" value={`$${(cashLiquidity[cashLiquidity.length - 1].balance / 1e3).toFixed(0)}K`} />
        <StatCard label="Collection Rate" value="101.4%" />
        <StatCard label="Total Write-offs" value={`$${(totalWriteOff / 1e3).toFixed(0)}K`} />
        <StatCard label="Recovered" value={`$${(totalRecovered / 1e3).toFixed(0)}K`} />
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

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <Card className="border-0 shadow-sm">
      <CardContent className="p-4">
        <p className="text-[11px] text-muted-foreground">{label}</p>
        <p className="text-lg font-display font-bold text-foreground">{value}</p>
      </CardContent>
    </Card>
  );
}
