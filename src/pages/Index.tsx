import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useAuth } from '@/lib/auth-context';
import { useI18n } from '@/lib/i18n-context';
import { OverviewTab } from '@/components/dashboard/tabs/OverviewTab';
import { AccountsReceivableTab } from '@/components/dashboard/tabs/AccountsReceivableTab';
import { AccountsPayableTab } from '@/components/dashboard/tabs/AccountsPayableTab';
import { ForecastingTab } from '@/components/dashboard/tabs/ForecastingTab';
import { AIInsightsTab } from '@/components/dashboard/tabs/AIInsightsTab';
import { DSOTab } from '@/components/dashboard/tabs/DSOTab';
import { AgingReportsTab } from '@/components/dashboard/tabs/AgingReportsTab';
import { HighRiskTab } from '@/components/dashboard/tabs/HighRiskTab';
import { CashManagementTab } from '@/components/dashboard/tabs/CashManagementTab';
import { ProcessFlowTab } from '@/components/dashboard/tabs/ProcessFlowTab';
import { AgenticAITab } from '@/components/dashboard/tabs/AgenticAITab';
import { RightSidebar } from '@/components/dashboard/RightSidebar';

export default function Index() {
  const { user } = useAuth();
  const { t } = useI18n();
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { value: 'overview', label: t('tabs.overview') },
    { value: 'ar', label: t('tabs.accountsReceivable') },
    { value: 'ap', label: t('tabs.accountsPayable') },
    { value: 'forecasting', label: t('tabs.forecasting') },
    { value: 'ai-insights', label: t('tabs.aiInsights') },
    { value: 'process-flow', label: t('tabs.processFlow') },
    { value: 'dso', label: t('tabs.dso') },
    { value: 'aging', label: t('tabs.agingReports') },
    { value: 'high-risk', label: t('tabs.highRiskInvoices') },
    { value: 'cash', label: t('tabs.cashManagement') },
    { value: 'agentic-ai', label: t('tabs.agenticAI') },
  ];

  return (
    <div className="flex flex-1 overflow-hidden">
      <div className="flex-1 overflow-auto">
        <div className="p-4 md:p-6 max-w-[1400px] mx-auto space-y-4">
          <div>
            <h1 className="text-xl font-display font-bold text-foreground">
              {t('dashboard.welcomeBack')}, {user?.name?.split(' ')[0] ?? 'User'}
            </h1>
            <p className="text-sm text-muted-foreground">{user?.roleLabel} · {t('dashboard.financialPlatform')}</p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <div className="overflow-x-auto -mx-4 px-4">
              <TabsList className="h-auto flex-wrap gap-1 bg-transparent p-0">
                {tabs.map((tab) => (
                  <TabsTrigger
                    key={tab.value}
                    value={tab.value}
                    className="text-xs px-3 py-1.5 rounded-full border border-border data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:border-primary"
                  >
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            <TabsContent value="overview"><OverviewTab /></TabsContent>
            <TabsContent value="ar"><AccountsReceivableTab /></TabsContent>
            <TabsContent value="ap"><AccountsPayableTab /></TabsContent>
            <TabsContent value="forecasting"><ForecastingTab /></TabsContent>
            <TabsContent value="ai-insights"><AIInsightsTab /></TabsContent>
            <TabsContent value="process-flow"><ProcessFlowTab /></TabsContent>
            <TabsContent value="dso"><DSOTab /></TabsContent>
            <TabsContent value="aging"><AgingReportsTab /></TabsContent>
            <TabsContent value="high-risk"><HighRiskTab /></TabsContent>
            <TabsContent value="cash"><CashManagementTab /></TabsContent>
            <TabsContent value="agentic-ai"><AgenticAITab /></TabsContent>
          </Tabs>
        </div>
      </div>

      <RightSidebar />
    </div>
  );
}
