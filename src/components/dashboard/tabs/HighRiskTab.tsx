import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { highRiskInvoices, disputes } from '@/lib/sap-financial-data';
import { AlertTriangle } from 'lucide-react';

export function HighRiskTab() {
  return (
    <div className="space-y-4">
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-display flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-destructive" /> High Risk Invoices
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="border-b text-left text-xs text-muted-foreground">
                <th className="px-5 py-2 font-medium">Invoice</th>
                <th className="px-5 py-2 font-medium">Customer</th>
                <th className="px-5 py-2 font-medium">Amount</th>
                <th className="px-5 py-2 font-medium">Due Date</th>
                <th className="px-5 py-2 font-medium">Risk Score</th>
                <th className="px-5 py-2 font-medium">Reason</th>
              </tr></thead>
              <tbody>
                {highRiskInvoices.map((inv) => (
                  <tr key={inv.invoiceNo} className="border-b last:border-0">
                    <td className="px-5 py-3 font-mono text-xs">{inv.invoiceNo}</td>
                    <td className="px-5 py-3 font-medium">{inv.customer}</td>
                    <td className="px-5 py-3 font-semibold">${(inv.amount / 1e3).toFixed(0)}K</td>
                    <td className="px-5 py-3 text-muted-foreground">{inv.dueDate}</td>
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
                ))}
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
