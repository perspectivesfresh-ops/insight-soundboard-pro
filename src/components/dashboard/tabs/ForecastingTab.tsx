import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { forecastData } from '@/lib/sap-financial-data';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useI18n } from '@/lib/i18n-context';

export function ForecastingTab() {
  const { t } = useI18n();
  const actualData = forecastData.filter(d => d.actual !== null);
  const avgVariance = actualData.reduce((s, d) => s + Math.abs(d.variance ?? 0), 0) / actualData.length;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        <StatCard label={t('forecast.avgVariance')} value={`$${avgVariance.toFixed(0)}K`} sub={t('forecast.vsForecast')} />
        <StatCard label={t('forecast.forecastAccuracy')} value="97.2%" sub={t('forecast.last6Months')} />
        <StatCard label={t('forecast.nextMonth')} value={`$${(forecastData[6].forecast / 1e3).toFixed(1)}M`} sub={t('forecast.projectedRevenue')} />
      </div>
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-2"><CardTitle className="text-sm font-display">{t('forecast.actualVsForecast')}</CardTitle></CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={forecastData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 91%)" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="hsl(220, 10%, 46%)" />
              <YAxis tick={{ fontSize: 11 }} stroke="hsl(220, 10%, 46%)" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="actual" stroke="hsl(263, 70%, 50%)" strokeWidth={2} dot={{ r: 4 }} name={t('forecast.actual')} connectNulls={false} />
              <Line type="monotone" dataKey="forecast" stroke="hsl(38, 92%, 50%)" strokeWidth={2} strokeDasharray="6 3" dot={{ r: 3 }} name={t('forecast.forecastLabel')} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}

function StatCard({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <Card className="border-0 shadow-sm">
      <CardContent className="p-4">
        <p className="text-[11px] text-muted-foreground">{label}</p>
        <p className="text-lg font-display font-bold text-foreground">{value}</p>
        <p className="text-[10px] text-muted-foreground">{sub}</p>
      </CardContent>
    </Card>
  );
}
