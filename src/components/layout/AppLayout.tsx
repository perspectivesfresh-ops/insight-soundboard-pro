import { Outlet } from 'react-router-dom';
import { TopNav } from './TopNav';
import { MobileNav } from './MobileNav';

export function AppLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <TopNav />
      <main className="flex-1 overflow-auto pb-16 md:pb-0">
        <Outlet />
      </main>
      <MobileNav />
    </div>
  );
}
