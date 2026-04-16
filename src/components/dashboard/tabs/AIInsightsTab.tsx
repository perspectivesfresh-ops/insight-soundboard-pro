import { Card, CardContent } from '@/components/ui/card';
import { Brain, TrendingUp, AlertTriangle, Lightbulb, Target } from 'lucide-react';
import { useI18n } from '@/lib/i18n-context';

export function AIInsightsTab() {
  const { t } = useI18n();

  const insights = [
    { icon: TrendingUp, title: t('aiInsightsTab.revenueTrajectory'), text: 'Revenue growth rate of 4.3% MoM exceeds industry benchmark of 2.8%. Current trajectory projects $89M annual run rate by Q4.', type: 'positive' },
    { icon: AlertTriangle, title: t('aiInsightsTab.receivablesRisk'), text: 'Acme Corp and GlobalTech Ltd represent 53% of overdue receivables. Recommend escalation to senior collections team within 7 days.', type: 'warning' },
    { icon: Lightbulb, title: t('aiInsightsTab.cashFlowOptimization'), text: 'Implementing dynamic discounting on AP could free up $340K in working capital over the next quarter.', type: 'insight' },
    { icon: Target, title: t('aiInsightsTab.dsoImprovement'), text: 'DSO improved from 48 to 38 days over 9 months. Continue current collection strategies to hit 35-day target by Q3.', type: 'positive' },
    { icon: AlertTriangle, title: t('aiInsightsTab.disputePattern'), text: 'Pricing discrepancy disputes increased 22% this quarter. Root cause analysis suggests catalog sync issues with ERP system.', type: 'warning' },
    { icon: Lightbulb, title: t('aiInsightsTab.budgetReallocation'), text: 'Marketing ROI declining 8% QoQ. Consider shifting 5% of marketing budget to product development for higher long-term returns.', type: 'insight' },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
          <Brain className="h-4 w-4 text-primary" />
        </div>
        <div>
          <h2 className="text-sm font-display font-semibold">{t('aiInsightsTab.title')}</h2>
          <p className="text-xs text-muted-foreground">{t('aiInsightsTab.subtitle')}</p>
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-3">
        {insights.map((ins, i) => {
          const colors = ins.type === 'positive' ? 'border-l-success' : ins.type === 'warning' ? 'border-l-warning' : 'border-l-primary';
          return (
            <Card key={i} className={`border-0 shadow-sm border-l-4 ${colors}`}>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <ins.icon className="h-4 w-4 text-muted-foreground" />
                  <h3 className="text-sm font-semibold">{ins.title}</h3>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{ins.text}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
