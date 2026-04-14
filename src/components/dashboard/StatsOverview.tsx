
import { useEffect, useState } from 'react';
import { dashboardApi } from '@/api/dashboard';
import { unwrapApiData, formatValue } from '@/types/common';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type TrendPoint = {
  label: string;
  value: number;
  secondary?: number;
};

function labelize(value: string) {
  return value
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/^./, (letter) => letter.toUpperCase());
}

function toNumber(value: unknown) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function buildLinePath(points: number[], width: number, height: number) {
  const max = Math.max(...points, 1);
  const step = points.length > 1 ? width / (points.length - 1) : width;
  return points
    .map((point, index) => {
      const x = index * step;
      const y = height - (point / max) * height;
      return `${index === 0 ? 'M' : 'L'} ${x.toFixed(2)} ${y.toFixed(2)}`;
    })
    .join(' ');
}

function AreaChart({ title, points, accent = '#f0a94f' }: { title: string; points: TrendPoint[]; accent?: string }) {
  const width = 520;
  const height = 180;
  const values = points.map((item) => item.value);
  const path = buildLinePath(values, width, height);
  const max = Math.max(...values, 1);
  const areaPath = `${path} L ${width} ${height} L 0 ${height} Z`;

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
        <p className="mt-2 text-sm leading-7 text-[var(--text-muted)]">最近周期的主要变化趋势。</p>
      </CardHeader>
      <CardContent>
        <div className="rounded-[28px] border border-white/8 bg-black/15 p-4">
          <svg className="h-56 w-full" viewBox={`0 0 ${width} ${height + 36}`} preserveAspectRatio="none">
            <defs>
              <linearGradient id={`area-${title}`} x1="0%" x2="0%" y1="0%" y2="100%">
                <stop offset="0%" stopColor={accent} stopOpacity="0.36" />
                <stop offset="100%" stopColor={accent} stopOpacity="0.02" />
              </linearGradient>
            </defs>
            {[0, 0.25, 0.5, 0.75, 1].map((ratio) => {
              const y = height - height * ratio;
              return <line key={ratio} x1="0" x2={width} y1={y} y2={y} stroke="rgba(255,255,255,0.08)" strokeDasharray="5 8" />;
            })}
            <path d={areaPath} fill={`url(#area-${title})`} />
            <path d={path} fill="none" stroke={accent} strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
            {points.map((point, index) => {
              const x = points.length > 1 ? (width / (points.length - 1)) * index : width / 2;
              const y = height - (point.value / max) * height;
              return (
                <g key={point.label}>
                  <circle cx={x} cy={y} fill="#0b1020" r="6" stroke={accent} strokeWidth="3" />
                  <text fill="rgba(246,239,228,0.55)" fontSize="11" textAnchor="middle" x={x} y={height + 24}>
                    {point.label}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </CardContent>
    </Card>
  );
}

function BarChart({ title, points }: { title: string; points: TrendPoint[] }) {
  const max = Math.max(...points.map((item) => Math.max(item.value, item.secondary ?? 0)), 1);
  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
        <p className="mt-2 text-sm leading-7 text-[var(--text-muted)]">订单构成以并列柱状方式展示，便于比较不同来源。</p>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 rounded-[28px] border border-white/8 bg-black/15 p-5">
          {points.map((point) => (
            <div className="grid gap-2" key={point.label}>
              <div className="flex items-center justify-between text-xs text-[var(--text-soft)]">
                <span>{point.label}</span>
                <span>{point.value} / {point.secondary ?? 0}</span>
              </div>
              <div className="grid grid-cols-[1fr_1fr] gap-2">
                <div className="h-3 overflow-hidden rounded-full bg-white/8">
                  <div className="h-full rounded-full bg-[linear-gradient(90deg,#f0a94f,#ffcf86)]" style={{ width: `${(point.value / max) * 100}%` }} />
                </div>
                <div className="h-3 overflow-hidden rounded-full bg-white/8">
                  <div className="h-full rounded-full bg-[linear-gradient(90deg,#8b7bff,#c1b8ff)]" style={{ width: `${((point.secondary ?? 0) / max) * 100}%` }} />
                </div>
              </div>
            </div>
          ))}
          <div className="flex gap-5 pt-2 text-xs text-[var(--text-muted)]">
            <span className="inline-flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-amber-300" />会员订单</span>
            <span className="inline-flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-violet-300" />充值订单</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function StatsOverview() {
  const [data, setData] = useState<Record<string, unknown> | null>(null);

  useEffect(() => {
    dashboardApi.stats().then((response) => {
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
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[var(--text-soft)]">Metric {String(index + 1).padStart(2, '0')}</p>
              <CardTitle className="mt-3 text-lg">{labelize(key)}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-extrabold tracking-tight text-[var(--text-main)]">{formatValue(value)}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="grid gap-4 xl:grid-cols-2">
        {userTrendPoints.length ? <AreaChart points={userTrendPoints} title="User Trend" /> : null}
        {membershipPoints.length ? <AreaChart accent="#9d8cff" points={membershipPoints} title="Membership Distribution" /> : null}
      </section>

      <section className="grid gap-4">
        {orderTrendPoints.length ? <BarChart points={orderTrendPoints} title="Order Trend" /> : null}
      </section>
    </div>
  );
}
