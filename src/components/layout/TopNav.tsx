import { NavLink, useLocation } from 'react-router-dom';
import { LayoutDashboard, Mic, Phone, Video } from 'lucide-react';
import guidantLogo from '@/assets/guidant-logo.png';

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/voice', icon: Mic, label: 'Voice Assistant' },
  { to: '/call', icon: Phone, label: 'Call Controller' },
  { to: '/video', icon: Video, label: 'Video Conference' },
];

export function TopNav() {
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 bg-primary text-primary-foreground shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-6 h-14">
        <img src={guidantLogo} alt="Guidant.AI" className="h-7 brightness-0 invert" />
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
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold">CF</div>
        </div>
      </div>
    </header>
  );
}
