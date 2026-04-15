
import { useEffect, useMemo, useState } from 'react';
import type { ComponentProps, ComponentType } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import type { ResourceMeta } from '@/types/common';
import { formatFieldValue, getFieldValueTone } from '@/types/common';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from '@/components/ui/table';
import { TooltipText } from '@/components/ui/tooltip-text';

type AnyRecord = Record<string, unknown>;
type FieldOptionLike = string | number | { label: string; value: string | number };
type FormSubmitEvent = Parameters<NonNullable<ComponentProps<'form'>['onSubmit']>>[0];

function compactFieldLabel(label: string) {
  return label
    .replace(/（.*?）/g, '')
    .replace(/\(.*?\)/g, '')
    .replace(/[：:].*$/, '')
    .replace(/管理$/, '')
    .trim();
}

function normalizeOption(option: FieldOptionLike) {
  if (typeof option === 'object' && option !== null && 'value' in option) {
    return option;
  }
  return { label: String(option), value: option };
}

function parseOptionsFromLabel(label: string) {
  const normalized = label.replace(/：/g, ':').replace(/，/g, ',').replace(/；/g, ',');
  if (normalized.includes(':')) {
    const suffix = normalized.split(':', 2)[1]?.trim() ?? '';
    const pairMatches = Array.from(suffix.matchAll(/([A-Za-z0-9_.-]+)\s*-\s*([^,。]+)/g)) as RegExpMatchArray[];
    if (pairMatches.length >= 2) {
      return pairMatches.map((match) => {
        const rawValue = match[1];
        return {
          label: match[2].trim(),
          value: /^\d+$/.test(rawValue) ? Number(rawValue) : rawValue,
        };
      });
    }
    const simpleValues = suffix
      .split(/[/,]/)
      .map((item: string) => item.trim())
      .filter(Boolean);
    if (simpleValues.length >= 2 && simpleValues.every((item: string) => !item.includes('-'))) {
      return simpleValues.map((item: string) => ({ label: item, value: item }));
    }
  }
  return [];
}

function resolveSelectOptions(field: { name: string; label: string; options?: FieldOptionLike[] }) {
  const direct = (field.options ?? []).map(normalizeOption);
  if (direct.length) return direct;
  return parseOptionsFromLabel(field.label);
}

function shouldUseSelect(field: { name: string; kind: string; label: string; options?: FieldOptionLike[] }) {
  if (field.kind === 'select') return true;
  if (resolveSelectOptions(field).length) return true;
  const lowered = field.name.toLowerCase();
  return ['status', 'type', 'level', 'role', 'source', 'provider', 'group', 'scene', 'category'].some((token) =>
    lowered.includes(token)
  );
}

function getTemporalInputType(field: { format?: string; name: string }) {
  if (field.format === 'date') return 'date';
  if (field.format === 'time') return 'time';
  if (field.name.toLowerCase().includes('time') || field.name.toLowerCase().includes('date')) return 'datetime-local';
  return 'datetime-local';
}

function normalizeTemporalFilterValue(field: { format?: string }, value: unknown) {
  if (typeof value !== 'string' || !value) return '';
  if (field.format === 'date') return value.slice(0, 10);
  if (field.format === 'time') return value.slice(0, 5);
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  const offset = date.getTimezoneOffset();
  const localDate = new Date(date.getTime() - offset * 60 * 1000);
  return localDate.toISOString().slice(0, 16);
}

function normalizeTemporalSubmitValue(field: { format?: string }, value: FormDataEntryValue | null) {
  if (typeof value !== 'string' || value === '') return undefined;
  if (field.format === 'date' || field.format === 'time') return value;
  return new Date(value).toISOString();
}

interface ResourceTablePageProps {
  meta: ResourceMeta;
  api: Record<string, (...args: any[]) => Promise<any>>;
  useStore: any;
  CreateModal?: ComponentType<{ open: boolean; onOpenChange: (open: boolean) => void; onSuccess: () => Promise<void> }>;
  EditModal?: ComponentType<{ open: boolean; onOpenChange: (open: boolean) => void; data: AnyRecord | null; onSuccess: () => Promise<void> }>;
}

export function ResourceTablePage({ meta, api, useStore, CreateModal, EditModal }: ResourceTablePageProps) {
  const list = useStore((state: AnyRecord) => state.list as AnyRecord[]);
  const total = useStore((state: AnyRecord) => state.total as number);
  const loading = useStore((state: AnyRecord) => state.loading as boolean);
  const params = useStore((state: AnyRecord) => state.params as AnyRecord);
  const setParams = useStore((state: AnyRecord) => state.setParams as (patch: AnyRecord) => void);
  const resetParams = useStore((state: AnyRecord) => state.resetParams as () => void);
  const fetchList = useStore((state: AnyRecord) => state.fetchList as () => Promise<void>);
  const removeItem = useStore((state: AnyRecord) => state.removeItem as (id: string | number) => Promise<void>);

  const [createOpen, setCreateOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selected, setSelected] = useState<AnyRecord | null>(null);
  const filterValues = useMemo(() => ({ ...params }), [params]);
  const pageKey = 'page' in params ? 'page' : 'pageNum';
  const pageSizeKey = 'pageSize' in params ? 'pageSize' : 'pageSize';
  const currentPage = Number(params[pageKey] ?? 1);
  const currentPageSize = Number(params[pageSizeKey] ?? 20);
  const totalPages = Math.max(1, Math.ceil(total / Math.max(currentPageSize, 1)));
  const filterFormKey = useMemo(
    () => JSON.stringify(meta.filters.map((filter) => [filter.name, String(filterValues[filter.name] ?? '')])),
    [filterValues, meta.filters]
  );

  useEffect(() => {
    void fetchList();
  }, [fetchList, params]);

  const handleSearch = (event: FormSubmitEvent) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const next: AnyRecord = { [pageKey]: 1 };
    for (const filter of meta.filters) {
      const value = formData.get(filter.name);
      next[filter.name] = filter.kind === 'datetime' ? normalizeTemporalSubmitValue(filter, value) : value === '' ? undefined : value;
    }
    setParams(next);
  };

  const invokeAction = async (action: { name: string; label: string; pathParam: string; queryParams?: Array<{ name: string; label: string }> }, row: AnyRecord) => {
    const fn = api[action.name];
    if (!fn) return;
    const pathValue = row[action.pathParam];
    if (pathValue === undefined) {
      toast.error('缺少操作主键');
      return;
    }
    if (action.queryParams?.length) {
      const params: AnyRecord = {};
      for (const field of action.queryParams) {
        const result = window.prompt(`请输入${field.label}`, '');
        if (result === null) return;
        params[field.name] = result;
      }
      await fn(pathValue as string | number, params);
    } else {
      await fn(pathValue as string | number);
    }
    toast.success(`${action.label}成功`);
    await fetchList();
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-[var(--text-soft)]">Resource View</p>
          <CardTitle className="mt-3 text-2xl">{meta.label}</CardTitle>
          <p className="mt-3 text-sm leading-7 text-[var(--text-muted)]">筛选、管理并查看当前资源列表，操作区与分页区已拆分以减少视觉干扰。</p>
        </div>
        <div className="flex gap-2">
          {meta.hasSave && CreateModal ? (
            <Button onClick={() => setCreateOpen(true)}>新增</Button>
          ) : null}
        </div>
      </CardHeader>
      <CardContent className="grid gap-4">
        {meta.filters.length ? (
          <form
            key={filterFormKey}
            className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-3 rounded-[28px] border border-white/8 bg-white/[0.035] p-4"
            onSubmit={handleSearch}
          >
            {meta.filters.map((filter) => (
              <div className="grid gap-1" key={filter.name}>
                <label className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[var(--text-soft)]">
                  <TooltipText content={filter.label}>
                    <span className="truncate">{compactFieldLabel(filter.label)}</span>
                  </TooltipText>
                </label>
                {shouldUseSelect(filter) ? (
                  <Select name={filter.name} defaultValue={String(filterValues[filter.name] ?? '')}>
                    <option value="">全部</option>
                    {resolveSelectOptions(filter).map((rawOption: FieldOptionLike) => {
                      const option = normalizeOption(rawOption);
                      return (
                        <option key={String(option.value)} value={String(option.value)}>
                          {option.label}
                        </option>
                      );
                    })}
                  </Select>
                ) : filter.kind === 'datetime' ? (
                  <Input
                    defaultValue={normalizeTemporalFilterValue(filter, filterValues[filter.name])}
                    name={filter.name}
                    type={getTemporalInputType(filter)}
                  />
                ) : (
                  <Input name={filter.name} defaultValue={String(filterValues[filter.name] ?? '')} />
                )}
              </div>
            ))}
            <div className="col-span-full flex flex-wrap items-end gap-2 pt-1">
              <Button type="submit">查询</Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  resetParams();
                }}
              >
                重置
              </Button>
            </div>
          </form>
        ) : null}

        <div className="overflow-x-auto overflow-y-hidden rounded-[28px] border border-white/8 bg-black/10">
          <Table>
            <TableHead>
              <TableRow>
                {meta.tableFields.map((field) => (
                  <TableHeaderCell key={field.name}>
                    <TooltipText content={field.label}>
                      <span className="truncate">{compactFieldLabel(field.label)}</span>
                    </TooltipText>
                  </TableHeaderCell>
                ))}
                <TableHeaderCell>操作</TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell className="py-12 text-center text-[var(--text-muted)]" colSpan={meta.tableFields.length + 1}>
                    加载中...
                  </TableCell>
                </TableRow>
              ) : list.length ? (
                list.map((row: AnyRecord, index: number) => (
                  <TableRow key={String(row.id ?? row.orderNo ?? index)}>
                    {meta.tableFields.map((field) => (
                      <TableCell key={field.name}>
                        {(() => {
                          const text = formatFieldValue(field, row[field.name]);
                          const tone = getFieldValueTone(field, row[field.name]);
                          return tone ? <Badge variant={tone}>{text}</Badge> : text;
                        })()}
                      </TableCell>
                    ))}
                    <TableCell className="flex flex-wrap gap-2">
                      {meta.hasDetail && row.id !== undefined ? (
                        <Link className="rounded-full border border-white/8 px-3 py-1 text-xs font-semibold text-[var(--text-main)] transition hover:border-amber-300/30 hover:bg-amber-300/10" to={`${meta.route}/${row.id}`}>
                          详情
                        </Link>
                      ) : null}
                      {meta.hasSave && EditModal ? (
                        <button
                          className="rounded-full border border-white/8 px-3 py-1 text-xs font-semibold text-[var(--text-main)] transition hover:border-amber-300/30 hover:bg-white/8"
                          type="button"
                          onClick={() => {
                            setSelected(row);
                            setEditOpen(true);
                          }}
                        >
                          编辑
                        </button>
                      ) : null}
                      {meta.hasDelete && row.id !== undefined ? (
                        <button
                          className="rounded-full border border-red-400/20 px-3 py-1 text-xs font-semibold text-red-200 transition hover:bg-red-400/10"
                          type="button"
                          onClick={async () => {
                            if (!window.confirm('确认删除该记录吗？')) return;
                            await removeItem(row.id as string | number);
                          }}
                        >
                          删除
                        </button>
                      ) : null}
                      {meta.actions.map((action) => (
                        <button
                          className="rounded-full border border-white/8 px-3 py-1 text-xs font-semibold text-[var(--text-main)] transition hover:border-amber-300/30 hover:bg-white/8"
                          key={action.name}
                          type="button"
                          onClick={() => void invokeAction(action, row)}
                        >
                          {action.label}
                        </button>
                      ))}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell className="py-12 text-center text-[var(--text-muted)]" colSpan={meta.tableFields.length + 1}>
                    暂无数据
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <div className="flex flex-col gap-3 rounded-[28px] border border-white/8 bg-white/[0.03] px-4 py-4 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-[var(--text-muted)]">共 {total} 条记录，当前为运营列表模式。</p>
          <div className="flex flex-wrap items-center gap-2">
            <Select
              className="w-28"
              value={String(currentPageSize)}
              onChange={(event) => setParams({ [pageKey]: 1, [pageSizeKey]: Number(event.target.value) })}
            >
              {[10, 20, 50, 100].map((size) => (
                <option key={size} value={size}>
                  {size} / 页
                </option>
              ))}
            </Select>
            <Button
              variant="outline"
              disabled={currentPage <= 1}
              onClick={() => setParams({ [pageKey]: Math.max(1, currentPage - 1) })}
            >
              上一页
            </Button>
            <span className="rounded-full border border-white/8 px-4 py-2 text-sm text-[var(--text-main)]">第 {currentPage} / {totalPages} 页</span>
            <Button
              variant="outline"
              disabled={currentPage >= totalPages}
              onClick={() => setParams({ [pageKey]: Math.min(totalPages, currentPage + 1) })}
            >
              下一页
            </Button>
          </div>
        </div>
      </CardContent>

      {CreateModal ? <CreateModal open={createOpen} onOpenChange={setCreateOpen} onSuccess={fetchList} /> : null}
      {EditModal ? (
        <EditModal open={editOpen} onOpenChange={setEditOpen} data={selected} onSuccess={fetchList} />
      ) : null}
    </Card>
  );
}
