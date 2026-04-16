import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/auth-context';
import { useI18n } from '@/lib/i18n-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Lock, User, Globe } from 'lucide-react';
import guidantLogo from '@/assets/guidant-logo.png';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const { lang, setLang, t } = useI18n();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const err = login(username, password);
    if (err) {
      setError(err === 'Invalid username' ? t('login.invalidUsername') : t('login.invalidPassword'));
    } else {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      {/* Language switcher */}
      <button
        onClick={() => setLang(lang === 'en' ? 'fr' : 'en')}
        className="fixed top-4 right-4 flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-muted-foreground hover:text-foreground hover:bg-accent transition-colors border border-border"
        title={lang === 'en' ? 'Passer en français' : 'Switch to English'}
      >
        <Globe className="h-3.5 w-3.5" />
        {lang === 'en' ? 'FR' : 'EN'}
      </button>

      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center gap-4">
          <div className="h-32 w-52 rounded-2xl flex items-center justify-center shadow-lg bg-primary-foreground">
            <img src={guidantLogo} alt="Guidant.AI" className="h-24 w-auto object-contain" />
          </div>
          <div className="text-center">
            <p className="text-sm text-muted-foreground mt-1">{t('login.subtitle')}</p>
          </div>
        </div>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-sm font-medium">{t('login.username')}</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="username"
                    placeholder={t('login.usernamePlaceholder')}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="pl-10"
                    autoComplete="username" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">{t('login.password')}</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                    autoComplete="current-password" />
                </div>
              </div>

              {error && <p className="text-sm text-destructive font-medium">{error}</p>}

              <Button type="submit" className="w-full h-11 font-semibold">
                {t('login.signIn')}
              </Button>
            </form>

            <div className="mt-6 p-4 rounded-lg bg-muted/50">
              <p className="text-xs font-semibold text-muted-foreground mb-2">{t('login.demoCredentials')}</p>
              <div className="space-y-1 text-xs text-muted-foreground">
                <p><span className="font-medium text-foreground">sarah.miller</span> / cfo2024 — CFO</p>
                <p><span className="font-medium text-foreground">john.mcghee</span> / treasurer2024 — Treasurer</p>
                <p><span className="font-medium text-foreground">lisa.mcdonald</span> / controller2024 — Controller</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-xs text-muted-foreground">{t('login.copyright')}</p>
      </div>
    </div>
  );
}
