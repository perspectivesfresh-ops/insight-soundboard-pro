import { useState } from 'react';
import { Video, VideoOff, Mic, MicOff, Monitor, Users, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useI18n } from '@/lib/i18n-context';

const participants = [
  { name: 'You (CFO)', initials: 'CF', active: true },
  { name: 'Sarah Mitchell', initials: 'SM', active: false },
  { name: 'James Chen', initials: 'JC', active: false },
  { name: 'Rachel Adams', initials: 'RA', active: false },
];

export default function VideoConference() {
  const [inMeeting, setInMeeting] = useState(false);
  const [videoOn, setVideoOn] = useState(true);
  const [micOn, setMicOn] = useState(true);
  const [sharing, setSharing] = useState(false);
  const { t } = useI18n();

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-display font-bold text-foreground">{t('videoPage.title')}</h1>
        <p className="text-sm text-muted-foreground">{t('videoPage.subtitle')}</p>
      </div>

      {!inMeeting ? (
        <Card className="border-0 shadow-sm">
          <CardContent className="p-8 text-center space-y-4">
            <div className="h-20 w-20 rounded-full bg-accent mx-auto flex items-center justify-center">
              <Video className="h-8 w-8 text-accent-foreground" />
            </div>
            <h2 className="text-lg font-display font-semibold">{t('videoPage.startOrJoin')}</h2>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">{t('videoPage.description')}</p>
            <div className="flex justify-center gap-3">
              <Button onClick={() => setInMeeting(true)} className="gap-2">
                <Video className="h-4 w-4" /> {t('videoPage.startMeeting')}
              </Button>
              <Button variant="outline" onClick={() => setInMeeting(true)} className="gap-2">
                <Users className="h-4 w-4" /> {t('videoPage.joinMeeting')}
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <>
          <Card className="border-0 shadow-sm overflow-hidden">
            <div className="bg-foreground/95 aspect-video relative flex items-center justify-center">
              <div className="grid grid-cols-2 gap-3 p-4 w-full max-w-2xl">
                {participants.map((p) => (
                  <div key={p.name} className="bg-foreground/50 rounded-xl aspect-video flex items-center justify-center relative">
                    <div className="h-14 w-14 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg">
                      {p.initials}
                    </div>
                    <span className="absolute bottom-2 left-3 text-xs text-white/80">{p.name}</span>
                  </div>
                ))}
              </div>
              {sharing && (
                <div className="absolute top-3 left-3 bg-destructive text-destructive-foreground text-xs px-2 py-1 rounded-md flex items-center gap-1">
                  <Monitor className="h-3 w-3" /> {t('videoPage.sharingDashboard')}
                </div>
              )}
            </div>
          </Card>

          <div className="flex justify-center gap-3">
            <Button variant={micOn ? 'outline' : 'destructive'} size="icon" onClick={() => setMicOn(!micOn)}>
              {micOn ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
            </Button>
            <Button variant={videoOn ? 'outline' : 'destructive'} size="icon" onClick={() => setVideoOn(!videoOn)}>
              {videoOn ? <Video className="h-4 w-4" /> : <VideoOff className="h-4 w-4" />}
            </Button>
            <Button variant={sharing ? 'default' : 'outline'} size="icon" onClick={() => setSharing(!sharing)}>
              <Monitor className="h-4 w-4" />
            </Button>
            <Button variant="destructive" onClick={() => setInMeeting(false)} className="gap-2 px-6">
              {t('videoPage.leaveMeeting')}
            </Button>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <Card className="border-0 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-display flex items-center gap-2">
                  <Users className="h-4 w-4" /> {t('videoPage.participants')} ({participants.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {participants.map((p) => (
                  <div key={p.name} className="flex items-center gap-3 py-1">
                    <div className="h-8 w-8 rounded-full bg-accent flex items-center justify-center text-xs font-bold text-accent-foreground">{p.initials}</div>
                    <span className="text-sm">{p.name}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-display flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" /> {t('videoPage.aiMeetingNotes')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-accent rounded-lg p-3 text-xs text-muted-foreground space-y-1">
                  <p>{t('videoPage.meetingStarted')}</p>
                  <p>{t('videoPage.dashboardShared')}</p>
                  <p>{t('videoPage.awaitingDiscussion')}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  );
}
