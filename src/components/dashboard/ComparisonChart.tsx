import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import type { RevenueData } from '@/lib/financial-data';
import { useI18n } from '@/lib/i18n-context';

interface ComparisonChartProps {
  data: RevenueData[];
}

export function ComparisonChart({ data }: ComparisonChartProps) {
  const { t } = useI18n();
  return (
    <Card className="border-0 shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-display">{t('charts.periodComparison')}</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 91%)" />
            <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="hsl(220, 10%, 46%)" />
            <YAxis tick={{ fontSize: 12 }} stroke="hsl(220, 10%, 46%)" />
            <Tooltip contentStyle={{ borderRadius: '0.75rem', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
            <Legend />
            <Bar dataKey="revenue" fill="hsl(263, 70%, 50%)" radius={[4, 4, 0, 0]} name={t('common.revenue')} />
            <Bar dataKey="expenses" fill="hsl(38, 92%, 50%)" radius={[4, 4, 0, 0]} name={t('common.expenses')} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
