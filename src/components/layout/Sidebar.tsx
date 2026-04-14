import { useEffect, useMemo, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { sidebarGroups } from '@/generated/resources';

const SIDEBAR_STORAGE_KEY = 'wp-admin-sidebar-open-group';

export default function Sidebar() {
  const location = useLocation();
  const groupTitles = useMemo(() => sidebarGroups.map((group) => group.title), []);
  const currentGroupTitle = useMemo(
    () =>
      sidebarGroups.find((group) =>
        group.items.some((item) => location.pathname === item.path || location.pathname.startsWith(`${item.path}/`))
      )?.title ?? groupTitles[0],
    [groupTitles, location.pathname]
  );
  const [openGroup, setOpenGroup] = useState<string | null>(null);

  useEffect(() => {
    const savedGroup = window.localStorage.getItem(SIDEBAR_STORAGE_KEY);
    if (savedGroup && groupTitles.includes(savedGroup)) {
      setOpenGroup(savedGroup);
      return;
    }
    setOpenGroup(currentGroupTitle);
  }, [currentGroupTitle, groupTitles]);

  useEffect(() => {
    if (!currentGroupTitle) return;
    setOpenGroup(currentGroupTitle);
    window.localStorage.setItem(SIDEBAR_STORAGE_KEY, currentGroupTitle);
  }, [location.pathname]);

  const toggleGroup = (title: string) => {
    const nextOpenGroup = openGroup === title ? null : title;
    setOpenGroup(nextOpenGroup);
    if (nextOpenGroup) {
      window.localStorage.setItem(SIDEBAR_STORAGE_KEY, nextOpenGroup);
    } else {
      window.localStorage.removeItem(SIDEBAR_STORAGE_KEY);
    }
  };

  return (
    <aside className="hidden w-80 shrink-0 p-5 lg:block">
      <div className="sticky top-5 overflow-hidden rounded-[28px] border border-[var(--border-soft)] bg-[linear-gradient(180deg,rgba(12,19,34,0.95),rgba(10,14,27,0.78))] shadow-[0_20px_80px_rgba(0,0,0,0.28)] backdrop-blur">
        <div className="border-b border-[var(--border-soft)] px-6 py-6">
          <div className="mb-4 inline-flex rounded-full border border-[rgba(var(--accent-rgb),0.3)] bg-[rgba(var(--accent-rgb),0.12)] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.28em] text-[var(--accent-strong)]">
            Control Room
          </div>
          <h1 className="font-['Fraunces'] text-2xl font-semibold text-[var(--text-main)]">WP Admin</h1>
          <p className="mt-2 max-w-[14rem] text-sm leading-6 text-[var(--text-muted)]">为内容、账户与业务数据准备的深色运营控制台。</p>
        </div>
        <nav className="flex max-h-[calc(100vh-180px)] flex-col gap-4 overflow-auto p-4">
          {sidebarGroups.map((group) => (
            <section
              key={group.title}
              className={`grid gap-1.5 rounded-[24px] border p-2 transition ${
                currentGroupTitle === group.title
                  ? 'border-[rgba(var(--accent-rgb),0.2)] bg-[linear-gradient(180deg,rgba(var(--accent-rgb),0.12),rgba(255,255,255,0.02))] shadow-[inset_0_0_0_1px_rgba(var(--accent-rgb),0.08)]'
                  : 'border-transparent bg-transparent'
              }`}
            >
              <button
                className={`flex items-center justify-between rounded-2xl px-3 py-2 text-left transition ${
                  currentGroupTitle === group.title ? 'bg-white/[0.04]' : 'hover:bg-white/[0.04]'
                }`}
                onClick={() => toggleGroup(group.title)}
                type="button"
              >
                <span className="flex min-w-0 items-center gap-3">
                  <span
                    className={`h-8 w-1 rounded-full transition ${
                      currentGroupTitle === group.title ? 'bg-[var(--accent)] shadow-[0_0_18px_rgba(var(--accent-rgb),0.8)]' : 'bg-white/10'
                    }`}
                  />
                  <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[var(--text-soft)]">{group.title}</span>
                </span>
                <span className="flex items-center gap-3">
                  <span
                    className={`inline-flex min-w-8 items-center justify-center rounded-full border px-2.5 py-1 text-[10px] font-semibold ${
                      currentGroupTitle === group.title
                        ? 'border-[rgba(var(--accent-rgb),0.28)] bg-[rgba(var(--accent-rgb),0.12)] text-[var(--accent-strong)]'
                        : 'border-white/10 bg-white/[0.04] text-[var(--text-soft)]'
                    }`}
                  >
                    {group.items.length}
                  </span>
                  <span
                    className={`text-xs text-[var(--text-soft)] transition-transform duration-200 ${
                      openGroup === group.title ? 'rotate-0' : 'rotate-[-90deg]'
                    }`}
                  >
                    v
                  </span>
                </span>
              </button>
              <div
                className={`grid gap-1 overflow-hidden transition-all duration-300 ${
                  openGroup === group.title ? 'max-h-[640px] opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                {group.items.map((item) => (
                  <NavLink
                    key={item.path}
                    className={({ isActive }) =>
                      [
                        'group relative overflow-hidden rounded-2xl px-4 py-3 text-sm transition',
                        isActive
                          ? 'bg-[linear-gradient(135deg,rgba(var(--accent-rgb),0.24),rgba(var(--accent-rgb),0.1))] text-[var(--text-main)] shadow-[inset_0_0_0_1px_rgba(var(--accent-rgb),0.2)]'
                          : 'text-[var(--text-muted)] hover:bg-white/[0.045] hover:text-[var(--text-main)]',
                      ].join(' ')
                    }
                    to={item.path}
                  >
                    <span className="relative z-10 flex items-center justify-between gap-3">
                      <span>{item.label}</span>
                      <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--text-soft)]">view</span>
                    </span>
                  </NavLink>
                ))}
              </div>
            </section>
          ))}
        </nav>
      </div>
    </aside>
  );
}
