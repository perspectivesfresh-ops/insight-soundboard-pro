import { NavLink, useLocation } from 'react-router-dom';
import { LayoutDashboard, Mic, Phone, Video } from 'lucide-react';
import { useI18n } from '@/lib/i18n-context';

export function MobileNav() {
  const location = useLocation();
  const { t } = useI18n();

  const navItems = [
    { to: '/', icon: LayoutDashboard, label: t('nav.dashboard') },
    { to: '/voice', icon: Mic, label: t('nav.voice') },
    { to: '/call', icon: Phone, label: t('nav.call') },
    { to: '/video', icon: Video, label: t('nav.video') },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-card border-t z-50">
      <div className="flex justify-around py-2">
        {navItems.map(({ to, icon: Icon, label }) => {
          const active = location.pathname === to;
          return (
            <NavLink key={to} to={to} className={`flex flex-col items-center gap-1 px-3 py-1 text-xs ${active ? 'text-primary' : 'text-muted-foreground'}`}>
              <Icon className="h-5 w-5" />
              {label}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}
