import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { overdueReceivables, agingDistribution } from '@/lib/sap-financial-data';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { useI18n } from '@/lib/i18n-context';

export function AccountsReceivableTab() {
  const { t } = useI18n();
  return (
    <div className="space-y-4">
      <div className="grid lg:grid-cols-2 gap-4">
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2"><CardTitle className="text-sm font-display">{t('ar.agingDistribution')}</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={agingDistribution}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 91%)" />
                <XAxis dataKey="bucket" tick={{ fontSize: 11 }} stroke="hsl(220, 10%, 46%)" />
                <YAxis tick={{ fontSize: 11 }} stroke="hsl(220, 10%, 46%)" tickFormatter={(v) => `$${(v / 1e6).toFixed(1)}M`} />
                <Tooltip formatter={(v: number) => `$${(v / 1e6).toFixed(2)}M`} />
                <Bar dataKey="amount" radius={[4, 4, 0, 0]}>
                  {agingDistribution.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2"><CardTitle className="text-sm font-display">{t('ar.topOverdueCustomers')}</CardTitle></CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">
              {overdueReceivables.map((r) => (
                <div key={r.customer} className="flex items-center justify-between px-5 py-3">
                  <div>
                    <p className="text-sm font-medium text-foreground">{r.customer}</p>
                    <p className="text-xs text-muted-foreground">{r.invoiceCount} {t('ar.invoices')} · {r.daysPastDue}d {t('ar.overdue')}</p>
                  </div>
                  <div className="text-right flex items-center gap-2">
                    <span className="text-sm font-semibold">${(r.amount / 1e3).toFixed(0)}K</span>
                    <Badge variant={r.risk === 'high' ? 'destructive' : r.risk === 'medium' ? 'secondary' : 'outline'} className="text-[10px]">
                      {r.risk}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
