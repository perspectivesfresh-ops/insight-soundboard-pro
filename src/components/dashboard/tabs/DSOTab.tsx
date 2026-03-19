import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { dsoTrend } from '@/lib/sap-financial-data';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

export function DSOTab() {
  const current = dsoTrend[dsoTrend.length - 1];
  const previous = dsoTrend[dsoTrend.length - 2];
  const change = current.dso - previous.dso;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard label="Current DSO" value={`${current.dso} days`} />
        <StatCard label="Target DSO" value={`${current.target} days`} />
        <StatCard label="MoM Change" value={`${change > 0 ? '+' : ''}${change} days`} />
        <StatCard label="Best (9mo)" value={`${Math.min(...dsoTrend.map(d => d.dso))} days`} />
      </div>
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-2"><CardTitle className="text-sm font-display">DSO Trend vs Target</CardTitle></CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dsoTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 91%)" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="hsl(220, 10%, 46%)" />
              <YAxis tick={{ fontSize: 11 }} stroke="hsl(220, 10%, 46%)" domain={[30, 55]} />
              <Tooltip />
              <Line type="monotone" dataKey="dso" stroke="hsl(263, 70%, 50%)" strokeWidth={2.5} dot={{ r: 4, fill: 'hsl(263, 70%, 50%)' }} name="Actual DSO" />
              <Line type="monotone" dataKey="target" stroke="hsl(152, 60%, 40%)" strokeWidth={2} strokeDasharray="6 3" dot={false} name="Target" />
            </LineChart>
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
