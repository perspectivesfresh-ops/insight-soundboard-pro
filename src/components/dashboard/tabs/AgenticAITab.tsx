import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { agentStatuses, getSAPKPIs, highRiskInvoices, dsoTrend, getCashManagementKPIs } from '@/lib/sap-financial-data';
import { Brain, Send, Volume2, VolumeX, Bot, User } from 'lucide-react';
import { useI18n } from '@/lib/i18n-context';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

function getAIResponse(query: string): string {
  const q = query.toLowerCase();
  const kpis = getSAPKPIs();
  const cashKPIs = getCashManagementKPIs();

  if (q.includes('dso') && (q.includes('increase') || q.includes('why') || q.includes('augment') || q.includes('pourquoi'))) {
    return `DSO increased from ${dsoTrend[dsoTrend.length - 3].dso} to ${dsoTrend[dsoTrend.length - 2].dso} days last period due to delayed payments from Acme Corp ($850K overdue, 95 days past due) and GlobalTech Ltd ($620K, 72 days). The primary driver is the 90+ day aging bucket growing to $800K (8% of total receivables). Recommendation: Escalate collection efforts on top 2 delinquent accounts.`;
  }
  if (q.includes('high') && q.includes('risk') || q.includes('haut') && q.includes('risque')) {
    const top3 = highRiskInvoices.slice(0, 3);
    return `There are ${highRiskInvoices.length} high-risk invoices totaling $${(highRiskInvoices.reduce((s, i) => s + i.amount, 0) / 1e6).toFixed(2)}M. Top 3:\n• ${top3.map(i => `${i.invoiceNo} (${i.customer}): $${(i.amount / 1e3).toFixed(0)}K — Risk ${i.risk}% — ${i.reason}`).join('\n• ')}`;
  }
  if (q.includes('cash') || q.includes('liquidity') || q.includes('trésorerie') || q.includes('liquidité')) {
    const pos = cashKPIs.find(k => k.label === 'Cash Position');
    const fcf = cashKPIs.find(k => k.label === 'Free Cash Flow');
    return `Current cash position: ${pos?.value}. Free Cash Flow: ${fcf?.value}. Collection rate is at ${kpis.collectionRate}%, exceeding target. Cash Conversion Cycle stands at ${cashKPIs.find(k => k.label === 'CCC')?.value}.`;
  }
  if (q.includes('collection') || q.includes('overdue') || q.includes('recouvrement') || q.includes('retard')) {
    return `Collection rate: ${kpis.collectionRate}%. Total overdue: $${(kpis.overdueTotal / 1e6).toFixed(1)}M across 6 customers. ${kpis.openDisputes} open disputes valued at $${(kpis.disputeValue / 1e3).toFixed(0)}K. Write-off recovery rate: ${((kpis.totalRecovered / kpis.totalWriteOffs) * 100).toFixed(0)}%.`;
  }
  return `Based on current data: Total receivables are $${(kpis.totalReceivables / 1e6).toFixed(1)}M with DSO at ${kpis.currentDSO} days (target: 38). ${kpis.openDisputes} active disputes. Collection rate: ${kpis.collectionRate}%. I can answer questions about DSO trends, high-risk invoices, cash position, or collection performance.`;
}

export function AgenticAITab() {
  const { t } = useI18n();
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'assistant', content: t('agentic.greeting') },
  ]);
  const [input, setInput] = useState('');
  const [speaking, setSpeaking] = useState(false);
  const [agents, setAgents] = useState(agentStatuses);
  const chatEnd = useRef<HTMLDivElement>(null);

  useEffect(() => { chatEnd.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg: ChatMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);

    setAgents(prev => prev.map(a => ({ ...a, status: 'processing' as const })));
    setTimeout(() => {
      const response = getAIResponse(input);
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
      setAgents(agentStatuses);
    }, 800);

    setInput('');
  };

  const speakMessage = (text: string) => {
    if (speaking) { speechSynthesis.cancel(); setSpeaking(false); return; }
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.onend = () => setSpeaking(false);
    setSpeaking(true);
    speechSynthesis.speak(utterance);
  };

  const quickQueries = [
    t('agentic.quickWhyDSO'),
    t('agentic.quickHighRisk'),
    t('agentic.quickCashPosition'),
    t('agentic.quickCollection'),
  ];

  return (
    <div className="space-y-4">
      <div className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <Card className="border-0 shadow-sm h-full flex flex-col">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-display flex items-center gap-2">
                <Brain className="h-4 w-4 text-primary" /> {t('agentic.aiAssistant')}
                <Badge variant="secondary" className="text-[10px] ml-auto">NVIDIA RIVA</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col p-0">
              <div className="flex flex-wrap gap-1.5 px-4 py-2 border-b">
                {quickQueries.map((q) => (
                  <button key={q} onClick={() => { setInput(q); }} className="text-[10px] px-2.5 py-1 rounded-full border border-border hover:bg-accent transition-colors text-muted-foreground">
                    {q}
                  </button>
                ))}
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-3 max-h-[400px]">
                {messages.map((msg, i) => (
                  <div key={i} className={`flex gap-2 ${msg.role === 'user' ? 'justify-end' : ''}`}>
                    {msg.role === 'assistant' && (
                      <div className="h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <Bot className="h-3.5 w-3.5 text-primary" />
                      </div>
                    )}
                    <div className={`rounded-xl px-3.5 py-2.5 max-w-[80%] text-sm leading-relaxed ${msg.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                      {msg.content.split('\n').map((line, j) => <p key={j} className={j > 0 ? 'mt-1' : ''}>{line}</p>)}
                      {msg.role === 'assistant' && (
                        <button onClick={() => speakMessage(msg.content)} className="mt-1.5 text-[10px] text-muted-foreground hover:text-foreground flex items-center gap-1">
                          {speaking ? <VolumeX className="h-3 w-3" /> : <Volume2 className="h-3 w-3" />}
                          {speaking ? t('filters.stop') : t('agentic.listen')}
                        </button>
                      )}
                    </div>
                    {msg.role === 'user' && (
                      <div className="h-7 w-7 rounded-full bg-accent flex items-center justify-center shrink-0">
                        <User className="h-3.5 w-3.5 text-accent-foreground" />
                      </div>
                    )}
                  </div>
                ))}
                <div ref={chatEnd} />
              </div>

              <div className="p-3 border-t flex gap-2">
                <Input
                  placeholder={t('agentic.askPlaceholder')}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  className="text-sm"
                />
                <Button size="icon" onClick={handleSend} className="shrink-0">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-display">{t('agentic.agentOrchestration')}</CardTitle>
              <p className="text-[10px] text-muted-foreground">{t('agentic.realTimeStatus')}</p>
            </CardHeader>
            <CardContent className="space-y-2">
              {agents.map((agent) => (
                <div key={agent.name} className="flex items-center gap-3 p-2.5 rounded-lg bg-muted/50 border border-border/50">
                  <span className="text-lg">{agent.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold">{agent.name}</p>
                    <p className="text-[10px] text-muted-foreground truncate">{agent.role}</p>
                    {agent.lastAction && <p className="text-[9px] text-muted-foreground/70 truncate">{agent.lastAction}</p>}
                  </div>
                  <Badge
                    variant={agent.status === 'processing' ? 'default' : agent.status === 'error' ? 'destructive' : 'secondary'}
                    className="text-[9px] shrink-0 capitalize"
                  >
                    {agent.status === 'processing' ? '⚡ Active' : agent.status}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm mt-3">
            <CardContent className="p-4">
              <Button
                variant={speaking ? 'destructive' : 'default'}
                className="w-full gap-2"
                onClick={() => {
                  const kpis = getSAPKPIs();
                  speakMessage(`Dashboard summary. Total receivables: ${(kpis.totalReceivables / 1e6).toFixed(1)} million. Days sales outstanding: ${kpis.currentDSO} days. Collection rate: ${kpis.collectionRate} percent. ${kpis.openDisputes} open disputes. Overdue balance: ${(kpis.overdueTotal / 1e6).toFixed(1)} million.`);
                }}
              >
                <Volume2 className="h-4 w-4" />
                {speaking ? t('agentic.stopSpeaking') : t('agentic.speakDashboard')}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
