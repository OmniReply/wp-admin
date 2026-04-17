
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';
import { Eye, EyeOff } from 'lucide-react';
import { authApi } from '@/api/auth';
import { unwrapApiData } from '@/types/common';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useAuthStore } from '@/stores/authStore';

export default function LoginPage() {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);
  const [form, setForm] = useState({ username: import.meta.env.DEV ? 'superadmin' : "", password:  import.meta.env.DEV ? 'Admin@2024' : "" });
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-10">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[8%] top-[10%] h-72 w-72 rounded-full bg-amber-400/16 blur-3xl" />
        <div className="absolute bottom-[10%] right-[8%] h-80 w-80 rounded-full bg-fuchsia-500/10 blur-3xl" />
      </div>
      <div className="relative grid w-full max-w-6xl overflow-hidden rounded-[32px] border border-[var(--border-soft)] bg-[rgba(8,13,25,0.78)] shadow-[0_30px_120px_rgba(0,0,0,0.35)] backdrop-blur lg:grid-cols-[1.1fr_0.9fr]">
        <div className="hidden flex-col justify-between border-r border-[var(--border-soft)] p-10 lg:flex">
          <div>
            <div className="inline-flex rounded-full border border-amber-300/30 bg-amber-300/10 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.32em] text-amber-200">
              Operator Console
            </div>
            <h1 className="mt-8 max-w-xl font-['Fraunces'] text-5xl font-semibold leading-[1.06] text-[var(--text-main)]">
              在一个更沉静的控制台里处理用户、团队与订单。
            </h1>
            <p className="mt-6 max-w-lg text-base leading-8 text-[var(--text-muted)]">
              为日常运营准备的深色后台界面。减少噪音、强化层次，把注意力集中到关键业务动作。
            </p>
          </div>
          <div className="grid gap-4">
            {[
              ['鉴权已接通', '支持 Token 与 Cookie 模式，错误消息直接透出后端响应。'],
              ['仪表盘在线', '首页统计、趋势与资源入口已经可以直接联调。'],
              ['资源页可扩展', '列表、详情、分页与动作已统一到同一套设计体系。'],
            ].map(([title, desc]) => (
              <div key={title} className="rounded-3xl border border-white/8 bg-white/[0.03] p-5">
                <p className="text-sm font-semibold text-[var(--text-main)]">{title}</p>
                <p className="mt-2 text-sm leading-7 text-[var(--text-muted)]">{desc}</p>
              </div>
            ))}
          </div>
        </div>
        <Card className="m-3 border-white/8 bg-[linear-gradient(180deg,rgba(17,24,40,0.96),rgba(13,18,31,0.92))] shadow-none lg:m-4">
          <CardHeader className="border-white/8">
            <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-[var(--text-soft)]">Sign In</p>
            <CardTitle className="mt-3 text-2xl">后台登录</CardTitle>
            <p className="mt-3 text-sm leading-7 text-[var(--text-muted)]">请输入管理员账号与密码，登录进入控制台。</p>
          </CardHeader>
          <CardContent className="pt-1">
          <form
            className="grid gap-5"
            onSubmit={async (event) => {
              event.preventDefault();
              setLoading(true);
              try {
                const loginResponse = await authApi.login(form);
                const loginData = unwrapApiData(loginResponse.data);
                if (!loginData.token) {
                  throw new Error('登录响应缺少 token');
                }

                // Persist token first so the next /auth/info request carries auth headers.
                setAuth(loginData.token, { username: loginData.username, role: loginData.role });

                try {
                  const infoResponse = await authApi.info();
                  const currentUser = unwrapApiData(infoResponse.data);
                  setAuth(loginData.token, currentUser ?? { username: loginData.username, role: loginData.role });
                } catch (error) {
                  console.error(error);
                }

                toast.success('登录成功');
                navigate('/dashboard');
              } catch (error) {
                console.error(error);
                const message = axios.isAxiosError(error)
                  ? error.response?.data?.message || error.message
                  : error instanceof Error
                    ? error.message
                    : '登录失败，请检查账号密码';
                toast.error(message);
              } finally {
                setLoading(false);
              }
            }}
          >
            <div className="grid gap-2">
              <label className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--text-soft)]">用户名</label>
              <Input value={form.username} onChange={(event) => setForm((state) => ({ ...state, username: event.target.value }))} />
            </div>
            <div className="grid gap-2">
              <label className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--text-soft)]">密码</label>
              <div className="relative">
                <Input
                  className="pr-12"
                  type={passwordVisible ? 'text' : 'password'}
                  value={form.password}
                  onChange={(event) => setForm((state) => ({ ...state, password: event.target.value }))}
                />
                <button
                  type="button"
                  className="absolute right-2 top-1/2 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-xl text-[var(--text-soft)] transition hover:bg-white/10 hover:text-[var(--text-main)] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
                  aria-label={passwordVisible ? '隐藏密码' : '显示密码'}
                  onClick={() => setPasswordVisible((v) => !v)}
                >
                  {passwordVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            {/* <div className="rounded-3xl border border-white/8 bg-white/[0.03] p-4 text-sm leading-7 text-[var(--text-muted)]">
              登录后会自动拉取当前管理员信息，并将鉴权状态持久化到本地。
            </div> */}
            <Button className="w-full" disabled={loading} type="submit">
              {loading ? '登录中...' : '登录'}
            </Button>
          </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
