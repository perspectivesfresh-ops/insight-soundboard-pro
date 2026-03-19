import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { payables } from '@/lib/sap-financial-data';

export function AccountsPayableTab() {
  const statusColor = (s: string) => s === 'paid' ? 'bg-success/10 text-success' : s === 'approved' ? 'bg-primary/10 text-primary' : 'bg-warning/10 text-warning';
  const totalPending = payables.filter(p => p.status !== 'paid').reduce((s, p) => s + p.amount, 0);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <MiniStat label="Total Payables" value={`$${(payables.reduce((s, p) => s + p.amount, 0) / 1e3).toFixed(0)}K`} />
        <MiniStat label="Pending" value={`$${(totalPending / 1e3).toFixed(0)}K`} />
        <MiniStat label="Approved" value={`${payables.filter(p => p.status === 'approved').length}`} />
        <MiniStat label="Paid" value={`${payables.filter(p => p.status === 'paid').length}`} />
      </div>
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-2"><CardTitle className="text-sm font-display">Payable Items</CardTitle></CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="border-b text-left text-xs text-muted-foreground">
                <th className="px-5 py-2 font-medium">Vendor</th>
                <th className="px-5 py-2 font-medium">Category</th>
                <th className="px-5 py-2 font-medium">Amount</th>
                <th className="px-5 py-2 font-medium">Due Date</th>
                <th className="px-5 py-2 font-medium">Status</th>
              </tr></thead>
              <tbody>
                {payables.map((p) => (
                  <tr key={p.vendor} className="border-b last:border-0">
                    <td className="px-5 py-3 font-medium">{p.vendor}</td>
                    <td className="px-5 py-3 text-muted-foreground">{p.category}</td>
                    <td className="px-5 py-3 font-semibold">${(p.amount / 1e3).toFixed(0)}K</td>
                    <td className="px-5 py-3 text-muted-foreground">{p.dueDate}</td>
                    <td className="px-5 py-3"><Badge className={`text-[10px] ${statusColor(p.status)}`}>{p.status}</Badge></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <Card className="border-0 shadow-sm">
      <CardContent className="p-4">
        <p className="text-[11px] text-muted-foreground">{label}</p>
        <p className="text-lg font-display font-bold text-foreground">{value}</p>
      </CardContent>
    </Card>
  );
}
