import { NavLink, useLocation } from 'react-router-dom';
import { LayoutDashboard, Mic, Phone, Video, Settings } from 'lucide-react';
import guidantLogo from '@/assets/guidant-logo.png';

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/voice', icon: Mic, label: 'Voice Assistant' },
  { to: '/call', icon: Phone, label: 'Call Controller' },
  { to: '/video', icon: Video, label: 'Video Conference' },
];

export function AppSidebar() {
  const location = useLocation();

  return (
    <aside className="hidden md:flex flex-col w-64 bg-primary text-primary-foreground min-h-screen p-4">
      <div className="mb-8 px-2">
        <img src={guidantLogo} alt="Guidant.AI" className="h-10 brightness-0 invert" />
      </div>
      <nav className="flex-1 space-y-1">
        {navItems.map(({ to, icon: Icon, label }) => {
          const active = location.pathname === to;
          return (
            <NavLink
              key={to}
              to={to}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                active ? 'bg-white/20 text-white' : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              <Icon className="h-5 w-5" />
              {label}
            </NavLink>
          );
        })}
      </nav>
      <div className="border-t border-white/20 pt-4 mt-4">
        <div className="flex items-center gap-3 px-3">
          <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold">CF</div>
          <div>
            <p className="text-sm font-medium">CFO</p>
            <p className="text-xs text-white/60">Chief Financial Officer</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
