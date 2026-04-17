
import { useEffect, useState } from 'react';
import {
  Area,
  AreaChart as RechartsAreaChart,
  Bar,
  BarChart as RechartsBarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { dashboardApi } from '@/api/dashboard';
import { unwrapApiData, formatValue } from '@/types/common';
import type { ApiResponse } from '@/types/common';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { DashboardStatsResponse } from '@/types/openapi';

type TrendPoint = {
  label: string;
  value: number;
  secondary?: number;
};

const DASHBOARD_LABEL_MAP: Record<string, string> = {
  totalUsers: '用户总数',
  todayNewUsers: '今日新增用户',
  totalTeams: '团队总数',
  activeMemberships: '活跃会员数',
  todayOrders: '今日订单数',
  todayRevenue: '今日营收',
  monthRevenue: '本月营收',
  totalRevenue: '总营收',
};

function labelize(value: string) {
  return DASHBOARD_LABEL_MAP[value] ?? value;
}

function toNumber(value: unknown) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function AreaChart({ title, points, accent = '#f0a94f' }: { title: string; points: TrendPoint[]; accent?: string }) {
  const gradientId = `area-${title.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
        <p className="mt-2 text-sm leading-7 text-[var(--text-muted)]">最近周期的主要变化趋势。</p>
      </CardHeader>
      <CardContent>
        <div className="rounded-[28px] border border-white/8 bg-black/15 p-4">
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsAreaChart data={points} margin={{ top: 10, right: 8, left: -18, bottom: 0 }}>
                <defs>
                  <linearGradient id={gradientId} x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor={accent} stopOpacity={0.34} />
                    <stop offset="100%" stopColor={accent} stopOpacity={0.03} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="rgba(255,255,255,0.08)" strokeDasharray="5 8" vertical={false} />
                <XAxis axisLine={false} dataKey="label" tick={{ fill: 'rgba(246,239,228,0.55)', fontSize: 11 }} tickLine={false} />
                <YAxis
                  axisLine={false}
                  tick={{ fill: 'rgba(246,239,228,0.45)', fontSize: 11 }}
                  tickLine={false}
                  width={36}
                />
                <Tooltip
                  contentStyle={{
                    background: 'rgba(10, 16, 28, 0.96)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '18px',
                    color: '#f6efe4',
                    boxShadow: '0 16px 40px rgba(0,0,0,0.28)',
                  }}
                  cursor={{ stroke: accent, strokeDasharray: '4 6', strokeOpacity: 0.45 }}
                  labelStyle={{ color: 'rgba(246,239,228,0.6)', fontSize: 12, marginBottom: 6 }}
                />
                <Area
                  activeDot={{ fill: accent, r: 5, stroke: '#0b1020', strokeWidth: 2 }}
                  dataKey="value"
                  fill={`url(#${gradientId})`}
                  stroke={accent}
                  strokeWidth={3}
                  type="monotone"
                />
              </RechartsAreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function BarChart({ title, points }: { title: string; points: TrendPoint[] }) {
  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
        <p className="mt-2 text-sm leading-7 text-[var(--text-muted)]">订单构成以并列柱状方式展示，便于比较不同来源。</p>
      </CardHeader>
      <CardContent>
        <div className="rounded-[28px] border border-white/8 bg-black/15 p-5">
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsBarChart data={points} barGap={10} margin={{ top: 8, right: 12, left: -18, bottom: 0 }}>
                <CartesianGrid stroke="rgba(255,255,255,0.08)" strokeDasharray="5 8" vertical={false} />
                <XAxis axisLine={false} dataKey="label" tick={{ fill: 'rgba(246,239,228,0.55)', fontSize: 11 }} tickLine={false} />
                <YAxis
                  axisLine={false}
                  tick={{ fill: 'rgba(246,239,228,0.45)', fontSize: 11 }}
                  tickLine={false}
                  width={36}
                />
                <Tooltip
                  contentStyle={{
                    background: 'rgba(10, 16, 28, 0.96)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '18px',
                    color: '#f6efe4',
                    boxShadow: '0 16px 40px rgba(0,0,0,0.28)',
                  }}
                  cursor={{ fill: 'rgba(255,255,255,0.03)' }}
                  labelStyle={{ color: 'rgba(246,239,228,0.6)', fontSize: 12, marginBottom: 6 }}
                />
                <Legend
                  formatter={(value: string) => <span style={{ color: 'rgba(246,239,228,0.68)', fontSize: 12 }}>{value}</span>}
                  wrapperStyle={{ paddingTop: 14 }}
                />
                <Bar dataKey="value" fill="#f0a94f" name="会员订单" radius={[10, 10, 4, 4]} />
                <Bar dataKey="secondary" fill="#9d8cff" name="充值订单" radius={[10, 10, 4, 4]} />
              </RechartsBarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function StatsOverview() {
  const [data, setData] = useState<Record<string, unknown> | null>(null);

  useEffect(() => {
    dashboardApi.stats().then((response: { data: ApiResponse<DashboardStatsResponse> }) => {
      setData(unwrapApiData(response.data) as unknown as Record<string, unknown>);
    });
  }, []);

  const entries = data ? Object.entries(data) : [];
  const metricEntries = entries.filter(([, value]) => typeof value !== 'object');
  const membershipDistribution = (data?.membershipDistribution as Array<Record<string, unknown>> | undefined) ?? [];
  const userTrend = (data?.userTrend as Array<Record<string, unknown>> | undefined) ?? [];
  const orderTrend = (data?.orderTrend as Array<Record<string, unknown>> | undefined) ?? [];
  const membershipPoints: TrendPoint[] = membershipDistribution.map((item) => ({
    label: String(item.name ?? item.level ?? '-'),
    value: toNumber(item.count),
  }));
  const userTrendPoints: TrendPoint[] = userTrend.map((item) => ({
    label: String(item.date ?? '').slice(5),
    value: toNumber(item.count),
  }));
  const orderTrendPoints: TrendPoint[] = orderTrend.map((item) => ({
    label: String(item.date ?? '').slice(5),
    value: toNumber(item.membershipOrders),
    secondary: toNumber(item.rechargeOrders),
  }));

  return (
    <div className="grid gap-6">
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {metricEntries.map(([key, value], index) => (
          <Card key={key} className="relative overflow-hidden">
            <div className="pointer-events-none absolute right-0 top-0 h-28 w-28 translate-x-8 -translate-y-8 rounded-full bg-amber-300/10 blur-2xl" />
            <CardHeader className="border-none pb-0">
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[var(--text-soft)]">指标 {String(index + 1).padStart(2, '0')}</p>
              <CardTitle className="mt-3 text-lg">{labelize(key)}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-extrabold tracking-tight text-[var(--text-main)]">{formatValue(value)}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="grid gap-4 xl:grid-cols-2">
        {userTrendPoints.length ? <AreaChart points={userTrendPoints} title="用户增长趋势" /> : null}
        {membershipPoints.length ? <AreaChart accent="#9d8cff" points={membershipPoints} title="会员分布" /> : null}
      </section>

      <section className="grid gap-4">
        {orderTrendPoints.length ? <BarChart points={orderTrendPoints} title="订单趋势" /> : null}
      </section>
    </div>
  );
}
