import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { agingDistribution } from '@/lib/sap-financial-data';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Progress } from '@/components/ui/progress';

export function AgingReportsTab() {
  const total = agingDistribution.reduce((s, b) => s + b.amount, 0);

  return (
    <div className="space-y-4">
      <div className="grid lg:grid-cols-2 gap-4">
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2"><CardTitle className="text-sm font-display">Aging Distribution</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie data={agingDistribution} dataKey="amount" nameKey="bucket" cx="50%" cy="50%" outerRadius={100} innerRadius={55} paddingAngle={3}>
                  {agingDistribution.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Pie>
                <Tooltip formatter={(v: number) => `$${(v / 1e6).toFixed(2)}M`} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2"><CardTitle className="text-sm font-display">Bucket Breakdown</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            {agingDistribution.map((bucket) => (
              <div key={bucket.bucket}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium">{bucket.bucket}</span>
                  <span className="text-muted-foreground">${(bucket.amount / 1e6).toFixed(2)}M ({bucket.percentage}%)</span>
                </div>
                <Progress value={bucket.percentage} className="h-2" />
              </div>
            ))}
            <div className="pt-2 border-t flex justify-between text-sm font-semibold">
              <span>Total</span>
              <span>${(total / 1e6).toFixed(1)}M</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
