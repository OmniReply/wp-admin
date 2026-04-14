
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

export default function AppLayout() {
  return (
    <div className="relative flex min-h-screen overflow-hidden bg-transparent">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-28 top-10 h-72 w-72 rounded-full bg-[rgba(var(--accent-rgb),0.14)] blur-3xl" />
        <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-[rgba(var(--highlight-rgb),0.14)] blur-3xl" />
      </div>
      <Sidebar />
      <div className="relative flex min-h-screen flex-1 flex-col">
        <Header />
        <main className="flex-1 p-5 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
