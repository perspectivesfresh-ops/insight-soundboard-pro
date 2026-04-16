import { useState } from 'react';
import { Phone, PhoneOff, FileText, Clock, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { generateInsight } from '@/lib/financial-data';
import { useI18n } from '@/lib/i18n-context';

const contacts = [
  { name: 'Sarah Mitchell', role: 'Financial Controller', phone: '+1 (555) 012-3456', available: true },
  { name: 'James Chen', role: 'VP Finance', phone: '+1 (555) 678-9012', available: true },
  { name: 'Lisa Park', role: 'Treasury Manager', phone: '+1 (555) 345-6789', available: false },
];

export default function CallController() {
  const [calling, setCalling] = useState<string | null>(null);
  const [showBrief, setShowBrief] = useState(false);
  const { t } = useI18n();

  const handleCall = (name: string) => {
    setCalling(name);
    setTimeout(() => setCalling(null), 5000);
  };

  return (
    <div className="p-4 md:p-8 max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-display font-bold text-foreground">{t('callPage.title')}</h1>
        <p className="text-sm text-muted-foreground">{t('callPage.subtitle')}</p>
      </div>

      {calling && (
        <Card className="border-0 shadow-sm bg-primary text-primary-foreground">
          <CardContent className="p-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center">
                <Phone className="h-5 w-5 animate-pulse" />
              </div>
              <div>
                <p className="font-semibold">{t('callPage.calling')} {calling}...</p>
                <p className="text-sm text-white/70">{t('callPage.ringing')}</p>
              </div>
            </div>
            <Button variant="destructive" size="icon" onClick={() => setCalling(null)}>
              <PhoneOff className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      )}

      <div className="space-y-3">
        {contacts.map((contact) => (
          <Card key={contact.name} className="border-0 shadow-sm">
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-accent flex items-center justify-center">
                  <User className="h-5 w-5 text-accent-foreground" />
                </div>
                <div>
                  <p className="text-sm font-semibold">{contact.name}</p>
                  <p className="text-xs text-muted-foreground">{contact.role} · {contact.phone}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`h-2 w-2 rounded-full ${contact.available ? 'bg-success' : 'bg-muted-foreground'}`} />
                <Button size="sm" disabled={!contact.available || !!calling} onClick={() => handleCall(contact.name)}>
                  <Phone className="h-4 w-4 mr-1" /> {t('callPage.call')}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-display flex items-center gap-2">
            <FileText className="h-4 w-4" /> {t('callPage.aiCallBriefing')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Button variant="outline" size="sm" className="mb-3" onClick={() => setShowBrief(!showBrief)}>
            {showBrief ? t('callPage.hideBriefing') : t('callPage.generateBriefing')}
          </Button>
          {showBrief && (
            <div className="bg-accent rounded-lg p-4 text-sm text-foreground space-y-2 animate-fade-in">
              <p className="font-medium">{t('callPage.preCallSummary')}</p>
              <p className="text-muted-foreground">{generateInsight('monthly', 'all')}</p>
              <p className="text-muted-foreground">{t('callPage.discussionPoints')}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
