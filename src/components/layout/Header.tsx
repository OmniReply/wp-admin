
import { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { authApi } from '@/api/auth';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/stores/authStore';
import { useThemeSkin } from '@/theme/theme-provider';

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const { theme, setTheme, options } = useThemeSkin();

  const breadcrumb = useMemo(() => location.pathname.split('/').filter(Boolean).join(' / ') || 'dashboard', [location.pathname]);

  return (
    <header className="sticky top-0 z-20 flex items-center justify-between px-5 pt-5 lg:px-8">
      <div className="flex min-h-[78px] flex-1 items-center justify-between rounded-[26px] border border-[var(--border-soft)] bg-[rgba(10,16,28,0.72)] px-6 shadow-[0_14px_60px_rgba(0,0,0,0.2)] backdrop-blur">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-[var(--text-soft)]">Workspace</p>
          <p className="mt-2 font-['Fraunces'] text-xl font-semibold text-[var(--text-main)]">{breadcrumb}</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-2 rounded-full border border-[var(--border-soft)] bg-white/[0.03] p-1.5 xl:flex">
            {options.map((option) => (
              <button
                key={option.key}
                className={`rounded-full px-3 py-2 text-left text-[11px] font-semibold transition ${
                  theme === option.key
                    ? 'bg-[linear-gradient(135deg,var(--accent),var(--accent-strong))] text-slate-950 shadow-[0_10px_24px_rgba(var(--accent-rgb),0.28)]'
                    : 'text-[var(--text-muted)] hover:bg-white/[0.06] hover:text-[var(--text-main)]'
                }`}
                onClick={() => setTheme(option.key)}
                type="button"
              >
                {option.chip}
              </button>
            ))}
          </div>
          <div className="hidden rounded-full border border-[var(--border-soft)] bg-white/[0.03] px-4 py-2 text-right sm:block">
            <p className="text-[10px] uppercase tracking-[0.24em] text-[var(--text-soft)]">Online</p>
            <p className="mt-1 text-sm font-semibold text-[var(--text-main)]">{String(user?.username ?? user?.nickname ?? '管理员')}</p>
          </div>
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[linear-gradient(135deg,var(--accent),var(--accent-strong))] text-sm font-extrabold text-slate-950 shadow-[0_10px_26px_rgba(var(--accent-rgb),0.28)]">
            {String(user?.username ?? user?.nickname ?? 'A').slice(0, 1).toUpperCase()}
          </div>
          <Button
            variant="outline"
            onClick={async () => {
              try {
                await authApi.logout();
              } catch (error) {
                console.error(error);
              } finally {
                clearAuth();
                navigate('/login');
              }
            }}
          >
            退出登录
          </Button>
        </div>
      </div>
    </header>
  );
}
