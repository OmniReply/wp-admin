
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import type { ResourceMeta } from '@/types/common';
import { unwrapApiData, formatFieldValue, getFieldValueTone } from '@/types/common';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type AnyRecord = Record<string, unknown>;

interface ResourceDetailPageProps {
  meta: ResourceMeta;
  api: Record<string, (...args: any[]) => Promise<any>>;
}

export function ResourceDetailPage({ meta, api }: ResourceDetailPageProps) {
  const { id } = useParams();
  const [data, setData] = useState<AnyRecord | null>(null);
  const [loading, setLoading] = useState(false);
  const primaryField = meta.detailFields[0];
  const heroValue = primaryField && data ? formatFieldValue(primaryField, data[primaryField.name]) : id ?? '-';
  const secondaryFields = meta.detailFields.slice(1, 4);
  const detailGroups = Array.from({ length: Math.ceil(Math.max(meta.detailFields.length - 4, 0) / 4) }, (_, index) =>
    meta.detailFields.slice(4 + index * 4, 8 + index * 4)
  );

  const renderFieldValue = (field: ResourceMeta['detailFields'][number], value: unknown, className: string) => {
    const text = formatFieldValue(field, value);
    const tone = getFieldValueTone(field, value);
    if (tone) {
      return (
        <div className={className}>
          <Badge variant={tone}>{text}</Badge>
        </div>
      );
    }
    return <p className={className}>{text}</p>;
  };

  useEffect(() => {
    if (!id || !api.detail) return;
    setLoading(true);
    api
      .detail(id)
      .then((response) => setData(unwrapApiData(response.data)))
      .finally(() => setLoading(false));
  }, [api, id]);

  return (
    <div className="grid gap-6">
      <Card className="overflow-hidden">
        <CardContent className="relative p-0">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -left-12 top-0 h-40 w-40 rounded-full bg-amber-300/10 blur-3xl" />
            <div className="absolute right-0 top-0 h-48 w-48 rounded-full bg-violet-400/10 blur-3xl" />
          </div>
          <div className="relative grid gap-8 p-8 lg:grid-cols-[1.15fr_0.85fr]">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-[var(--text-soft)]">Detail Overview</p>
              <CardTitle className="mt-4 text-3xl">{meta.label}详情</CardTitle>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-[var(--text-muted)]">
                聚焦查看当前记录的核心属性、上下文信息与关键字段，减少表格式阅读带来的干扰。
              </p>
              <div className="mt-8 rounded-[28px] border border-white/8 bg-black/15 p-6">
                <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-[var(--text-soft)]">
                  {primaryField?.label ?? 'Record'}
                </p>
                <p className="mt-4 break-words font-['Fraunces'] text-4xl leading-tight text-[var(--text-main)]">{heroValue}</p>
                <p className="mt-5 text-sm leading-7 text-[var(--text-muted)]">记录编号：{id ?? '-'}</p>
              </div>
            </div>

            <div className="grid gap-4">
              {secondaryFields.map((field) => (
                <div key={field.name} className="rounded-[24px] border border-white/8 bg-white/[0.04] p-5">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[var(--text-soft)]">{field.label}</p>
                  {renderFieldValue(field, data ? data[field.name] : '-', 'mt-3 whitespace-pre-wrap break-words text-base font-semibold text-[var(--text-main)]')}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">字段矩阵</CardTitle>
          <p className="mt-2 text-sm leading-7 text-[var(--text-muted)]">将剩余字段以阅读友好的编排展示，适合长文本、时间与状态信息混合查看。</p>
        </CardHeader>
        <CardContent>
        {loading ? (
          <div className="rounded-[28px] border border-white/8 bg-white/[0.03] px-5 py-10 text-center text-sm text-[var(--text-muted)]">
            加载中...
          </div>
        ) : data ? (
          <div className="grid gap-5">
            {detailGroups.length ? detailGroups.map((group, index) => (
              <section key={index} className="grid gap-4 lg:grid-cols-2 xl:grid-cols-4">
                {group.map((field) => (
                  <article key={field.name} className="rounded-[26px] border border-white/8 bg-white/[0.03] p-5">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[var(--text-soft)]">{field.label}</p>
                    <div className="mt-4">
                      {renderFieldValue(field, data[field.name], 'whitespace-pre-wrap break-words text-sm leading-7 text-[var(--text-muted)]')}
                    </div>
                  </article>
                ))}
              </section>
            )) : (
              <div className="rounded-[28px] border border-white/8 bg-white/[0.03] px-5 py-10 text-center text-sm text-[var(--text-muted)]">
                没有更多字段可展示
              </div>
            )}
          </div>
        ) : (
          <div className="rounded-[28px] border border-white/8 bg-white/[0.03] px-5 py-10 text-center text-sm text-[var(--text-muted)]">
            未找到数据
          </div>
        )}
        </CardContent>
      </Card>
    </div>
  );
}
