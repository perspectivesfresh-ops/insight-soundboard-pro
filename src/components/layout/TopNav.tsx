import { NavLink, useLocation } from 'react-router-dom';
import { LayoutDashboard, Mic, Phone, Video, LogOut, Globe } from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import { useI18n } from '@/lib/i18n-context';
import { Button } from '@/components/ui/button';
import guidantLogo from '@/assets/guidant-logo.png';

export function TopNav() {
  const location = useLocation();
  const { user, logout } = useAuth();
  const { lang, setLang, t } = useI18n();

  const navItems = [
    { to: '/', icon: LayoutDashboard, label: t('nav.dashboard') },
    { to: '/voice', icon: Mic, label: t('nav.voiceAssistant') },
    { to: '/call', icon: Phone, label: t('nav.callController') },
    { to: '/video', icon: Video, label: t('nav.videoConference') },
  ];

  return (
    <header className="sticky top-0 z-50 bg-primary text-primary-foreground shadow-md">
      <div className="max-w-[1600px] mx-auto flex items-center justify-between px-4 md:px-6 h-16">
        <img src={guidantLogo} alt="Guidant.AI" className="h-12 brightness-0 invert" />
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map(({ to, icon: Icon, label }) => {
            const active = location.pathname === to;
            return (
              <NavLink
                key={to}
                to={to}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  active ? 'bg-white/20 text-white' : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                <Icon className="h-4 w-4" />
                {label}
              </NavLink>
            );
          })}
        </nav>
        <div className="flex items-center gap-3">
          {/* Language Switcher */}
          <button
            onClick={() => setLang(lang === 'en' ? 'fr' : 'en')}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-semibold text-white/80 hover:text-white hover:bg-white/10 transition-colors border border-white/20"
            title={lang === 'en' ? 'Passer en français' : 'Switch to English'}
          >
            <Globe className="h-3.5 w-3.5" />
            {lang === 'en' ? 'FR' : 'EN'}
          </button>
          <div className="text-right hidden sm:block">
            <p className="text-xs font-medium leading-tight">{user?.name}</p>
            <p className="text-[10px] text-white/60">{user?.roleLabel}</p>
          </div>
          <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold">
            {user?.initials}
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-white/70 hover:text-white hover:bg-white/10" onClick={logout}>
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}
