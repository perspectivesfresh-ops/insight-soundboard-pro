import { TrendingUp, TrendingDown } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import type { KPI } from '@/lib/financial-data';

interface KPICardProps {
  kpi: KPI;
  index: number;
}

export function KPICard({ kpi, index }: KPICardProps) {
  const isPositive = kpi.trend === 'up';

  return (
    <Card className="animate-fade-in border-0 shadow-sm hover:shadow-md transition-shadow" style={{ animationDelay: `${index * 80}ms` }}>
      <CardContent className="p-5">
        <p className="text-sm font-medium text-muted-foreground mb-1">{kpi.label}</p>
        <p className="text-2xl font-display font-bold text-foreground">{kpi.value}</p>
        <div className={`flex items-center gap-1 mt-2 text-sm font-medium ${isPositive ? 'text-success' : 'text-destructive'}`}>
          {isPositive ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
          <span>{Math.abs(kpi.change)}%</span>
          <span className="text-muted-foreground font-normal">vs prev</span>
        </div>
      </CardContent>
    </Card>
  );
}
