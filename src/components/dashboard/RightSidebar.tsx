import { useState } from 'react';
import { BarChart3, Bell, Brain, MessageCircle, ChevronRight, ChevronLeft } from 'lucide-react';
import { getSAPKPIs } from '@/lib/sap-financial-data';
import { Button } from '@/components/ui/button';

export function RightSidebar() {
  const [expanded, setExpanded] = useState(false);
  const kpis = getSAPKPIs();

  if (!expanded) {
    return (
      <aside className="hidden lg:flex flex-col items-center gap-3 py-4 px-2 border-l bg-card w-14 shrink-0">
        <Button variant="ghost" size="icon" className="h-9 w-9" onClick={() => setExpanded(true)}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <div className="flex flex-col gap-3 mt-2">
          <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center cursor-pointer hover:bg-primary/20 transition-colors" title="KPIs">
            <BarChart3 className="h-4 w-4 text-primary" />
          </div>
          <div className="relative h-9 w-9 rounded-lg bg-destructive/10 flex items-center justify-center cursor-pointer hover:bg-destructive/20 transition-colors" title="Alerts">
            <Bell className="h-4 w-4 text-destructive" />
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-destructive text-[10px] text-destructive-foreground flex items-center justify-center font-bold">3</span>
          </div>
          <div className="h-9 w-9 rounded-lg bg-accent flex items-center justify-center cursor-pointer hover:bg-accent/80 transition-colors" title="AI Insights">
            <Brain className="h-4 w-4 text-accent-foreground" />
          </div>
          <div className="h-9 w-9 rounded-lg bg-success/10 flex items-center justify-center cursor-pointer hover:bg-success/20 transition-colors" title="Chat">
            <MessageCircle className="h-4 w-4 text-success" />
          </div>
        </div>
      </aside>
    );
  }

  return (
    <aside className="hidden lg:flex flex-col border-l bg-card w-72 shrink-0 overflow-y-auto">
      <div className="flex items-center justify-between p-3 border-b">
        <h3 className="text-sm font-display font-semibold">Quick Access</h3>
        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setExpanded(false)}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* KPI Summary */}
      <div className="p-3 space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          <BarChart3 className="h-3.5 w-3.5" /> Key Metrics
        </div>
        <div className="grid grid-cols-2 gap-2">
          <MiniKPI label="DSO" value={`${kpis.currentDSO}d`} />
          <MiniKPI label="Collection" value={`${kpis.collectionRate}%`} />
          <MiniKPI label="Overdue" value={`$${(kpis.overdueTotal / 1e6).toFixed(1)}M`} />
          <MiniKPI label="Liquidity" value={`$${(kpis.liquidityBalance / 1e3).toFixed(0)}K`} />
        </div>
      </div>

      {/* Alerts */}
      <div className="p-3 space-y-2 border-t">
        <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          <Bell className="h-3.5 w-3.5" /> Alerts
        </div>
        <AlertItem color="destructive" text="3 invoices exceed 90-day aging" />
        <AlertItem color="warning" text="DSO approaching target threshold" />
        <AlertItem color="primary" text="Q1 forecast variance detected" />
      </div>

      {/* AI Insight */}
      <div className="p-3 space-y-2 border-t">
        <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          <Brain className="h-3.5 w-3.5" /> AI Insight
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Collection efficiency improved 4.2% MoM. Consider accelerating follow-up on Acme Corp's $850K overdue balance.
        </p>
      </div>
    </aside>
  );
}

function MiniKPI({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-muted/50 p-2">
      <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{label}</p>
      <p className="text-sm font-display font-bold text-foreground">{value}</p>
    </div>
  );
}

function AlertItem({ color, text }: { color: string; text: string }) {
  const dotColor = color === 'destructive' ? 'bg-destructive' : color === 'warning' ? 'bg-warning' : 'bg-primary';
  return (
    <div className="flex items-start gap-2">
      <div className={`h-2 w-2 rounded-full mt-1.5 shrink-0 ${dotColor}`} />
      <p className="text-xs text-muted-foreground">{text}</p>
    </div>
  );
}
