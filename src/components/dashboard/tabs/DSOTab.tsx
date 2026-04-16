import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { dsoTrend } from '@/lib/sap-financial-data';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useI18n } from '@/lib/i18n-context';

export function DSOTab() {
  const { t } = useI18n();
  const current = dsoTrend[dsoTrend.length - 1];
  const previous = dsoTrend[dsoTrend.length - 2];
  const change = current.dso - previous.dso;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard label={t('dsoTab.currentDSO')} value={`${current.dso} ${t('kpi.days')}`} />
        <StatCard label={t('dsoTab.targetDSO')} value={`${current.target} ${t('kpi.days')}`} />
        <StatCard label={t('dsoTab.momChange')} value={`${change > 0 ? '+' : ''}${change} ${t('kpi.days')}`} />
        <StatCard label={t('dsoTab.best9mo')} value={`${Math.min(...dsoTrend.map(d => d.dso))} ${t('kpi.days')}`} />
      </div>
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-2"><CardTitle className="text-sm font-display">{t('dsoTab.dsoTrendVsTarget')}</CardTitle></CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dsoTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 91%)" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="hsl(220, 10%, 46%)" />
              <YAxis tick={{ fontSize: 11 }} stroke="hsl(220, 10%, 46%)" domain={[30, 55]} />
              <Tooltip />
              <Line type="monotone" dataKey="dso" stroke="hsl(263, 70%, 50%)" strokeWidth={2.5} dot={{ r: 4, fill: 'hsl(263, 70%, 50%)' }} name={t('dsoTab.actualDSO')} />
              <Line type="monotone" dataKey="target" stroke="hsl(152, 60%, 40%)" strokeWidth={2} strokeDasharray="6 3" dot={false} name={t('dsoTab.target')} />
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
