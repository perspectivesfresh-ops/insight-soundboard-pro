import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { arProcessFlow } from '@/lib/sap-financial-data';
import { ArrowRight, AlertTriangle, CheckCircle, Circle, Loader2, XCircle } from 'lucide-react';

export function ProcessFlowTab() {
  return (
    <div className="space-y-4">
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-display">Accounts Receivable Lifecycle</CardTitle>
          <p className="text-xs text-muted-foreground">End-to-end process flow with AI anomaly detection</p>
        </CardHeader>
        <CardContent>
          {/* Horizontal scrollable flow */}
          <div className="overflow-x-auto pb-4">
            <div className="flex items-start gap-0 min-w-max">
              {arProcessFlow.map((step, i) => (
                <div key={step.id} className="flex items-start">
                  <FlowNode step={step} />
                  {i < arProcessFlow.length - 1 && (
                    <div className="flex items-center pt-10 px-1">
                      <ArrowRight className="h-5 w-5 text-muted-foreground/50 shrink-0" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Anomaly Highlights */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-display flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-warning" /> AI-Detected Anomalies
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {arProcessFlow.filter(s => s.anomaly).map((step) => (
              <div key={step.id} className="flex items-start gap-3 p-3 rounded-lg bg-warning/5 border border-warning/20">
                <AlertTriangle className="h-4 w-4 text-warning mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-medium">{step.label}</p>
                  <p className="text-xs text-muted-foreground">{step.anomaly}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Detail Grid */}
      <div className="grid md:grid-cols-3 gap-3">
        {arProcessFlow.filter(s => s.metrics).map((step) => (
          <Card key={step.id} className="border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <StatusIcon status={step.status} />
                <p className="text-xs font-semibold">{step.label}</p>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {step.metrics?.map((m) => (
                  <div key={m.label} className="rounded bg-muted/50 p-2">
                    <p className="text-[10px] text-muted-foreground">{m.label}</p>
                    <p className="text-sm font-display font-bold">{m.value}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function FlowNode({ step }: { step: typeof arProcessFlow[0] }) {
  const statusStyles: Record<string, string> = {
    active: 'border-primary bg-primary/5',
    warning: 'border-warning bg-warning/5',
    error: 'border-destructive bg-destructive/5',
    completed: 'border-success bg-success/5',
    idle: 'border-border bg-muted/30',
  };

  return (
    <div className={`w-[130px] rounded-xl border-2 p-3 ${statusStyles[step.status]} transition-all hover:shadow-md`}>
      <div className="flex items-center gap-1.5 mb-1">
        <StatusIcon status={step.status} />
        <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground capitalize">{step.status}</span>
      </div>
      <p className="text-xs font-display font-bold leading-tight mb-1">{step.label}</p>
      <p className="text-[10px] text-muted-foreground leading-tight">{step.description}</p>
      {step.anomaly && (
        <div className="mt-2 p-1.5 rounded bg-warning/10 border border-warning/20">
          <p className="text-[9px] text-warning font-medium">⚠ Anomaly detected</p>
        </div>
      )}
    </div>
  );
}

function StatusIcon({ status }: { status: string }) {
  const size = 'h-3.5 w-3.5';
  switch (status) {
    case 'active': return <Loader2 className={`${size} text-primary animate-spin`} />;
    case 'warning': return <AlertTriangle className={`${size} text-warning`} />;
    case 'error': return <XCircle className={`${size} text-destructive`} />;
    case 'completed': return <CheckCircle className={`${size} text-success`} />;
    default: return <Circle className={`${size} text-muted-foreground`} />;
  }
}
