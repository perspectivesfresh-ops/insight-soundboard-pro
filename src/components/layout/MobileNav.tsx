import { NavLink, useLocation } from 'react-router-dom';
import { LayoutDashboard, Mic, Phone, Video } from 'lucide-react';

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/voice', icon: Mic, label: 'Voice' },
  { to: '/call', icon: Phone, label: 'Call' },
  { to: '/video', icon: Video, label: 'Video' },
];

export function MobileNav() {
  const location = useLocation();

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
