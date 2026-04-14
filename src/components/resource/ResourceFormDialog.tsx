
import { useEffect, useMemo } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import type { FieldMeta, ResourceMeta } from '@/types/common';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { TooltipText } from '@/components/ui/tooltip-text';

type AnyRecord = Record<string, unknown>;
type FieldOptionLike = string | number | { label: string; value: string | number };

function compactFieldLabel(label: string) {
  return label
    .replace(/（.*?）/g, '')
    .replace(/\(.*?\)/g, '')
    .replace(/[：:].*$/, '')
    .trim();
}

type FieldLayoutMode = 'half' | 'full' | 'row';

function getFieldLayoutMode(field: FieldMeta): FieldLayoutMode {
  const lowered = field.name.toLowerCase();
  if (
    field.kind === 'textarea' ||
    ['description', 'content', 'prompt', 'instruction', 'rule', 'template', 'config', 'setting', 'json', 'body', 'message', 'remark', 'note'].some((token) =>
      lowered.includes(token)
    )
  ) {
    return 'row';
  }
  if (
    field.kind === 'datetime' ||
    ['url', 'path', 'secret', 'token', 'key', 'code', 'domain', 'host', 'email', 'phone', 'start', 'end'].some((token) =>
      lowered.includes(token)
    ) ||
    (field.label?.length ?? 0) >= 18
  ) {
    return 'full';
  }
  return 'half';
}

function getFieldGridClass(field: FieldMeta) {
  const layout = getFieldLayoutMode(field);
  if (layout === 'row') return 'col-span-12';
  if (layout === 'full') return 'col-span-12 xl:col-span-8';
  return 'col-span-12 md:col-span-6 xl:col-span-4';
}

function fieldHint(field: FieldMeta) {
  if (field.kind === 'switch') return '切换当前状态';
  if (field.kind === 'select') return '从预设选项中选择';
  if (field.kind === 'textarea') return '适合录入描述性内容';
  if (field.kind === 'number') return '请输入数值';
  if (field.kind === 'datetime') return '请选择时间';
  return '请输入内容';
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

function resolveSelectOptions(field: FieldMeta) {
  const direct = (field.options ?? []).map(normalizeOption);
  if (direct.length) return direct;
  return parseOptionsFromLabel(field.label);
}

function shouldUseSelect(field: FieldMeta) {
  if (field.kind === 'select') return true;
  if (resolveSelectOptions(field).length) return true;
  const lowered = field.name.toLowerCase();
  return ['status', 'type', 'level', 'role', 'source', 'provider', 'group', 'scene', 'category'].some((token) =>
    lowered.includes(token)
  );
}

function normalizeSubmitValues(fields: FieldMeta[], values: AnyRecord) {
  const payload = { ...values };
  for (const field of fields) {
    const value = payload[field.name];
    if (value === '' || value === undefined) continue;
    if (field.type === 'integer' || field.type === 'number') {
      payload[field.name] = Number(value);
    }
    if (field.kind === 'datetime' && typeof value === 'string') {
      if (field.format === 'date-time') {
        payload[field.name] = new Date(value).toISOString();
      } else {
        payload[field.name] = value;
      }
    }
  }
  return payload;
}

function getTemporalInputType(field: FieldMeta) {
  if (field.format === 'date') return 'date';
  if (field.format === 'time') return 'time';
  return 'datetime-local';
}

function normalizeTemporalValue(field: FieldMeta, value: unknown) {
  if (typeof value !== 'string' || !value) return '';
  if (field.format === 'date') {
    return value.slice(0, 10);
  }
  if (field.format === 'time') {
    return value.slice(0, 5);
  }
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }
  const offset = date.getTimezoneOffset();
  const localDate = new Date(date.getTime() - offset * 60 * 1000);
  return localDate.toISOString().slice(0, 16);
}

function createSchema(fields: FieldMeta[]) {
  const shape: Record<string, z.ZodTypeAny> = {};
  for (const field of fields) {
    if (field.kind === 'switch') {
      shape[field.name] = field.required ? z.boolean() : z.boolean().optional();
      continue;
    }
    if (field.kind === 'number') {
      const base = z.preprocess((value) => (value === '' || value === undefined ? undefined : Number(value)), z.number());
      shape[field.name] = field.required ? base : base.optional();
      continue;
    }
    const base = z.string();
    shape[field.name] = field.required ? base.min(1, `${field.label}不能为空`) : base.optional();
  }
  return z.object(shape);
}

function getDefaultValue(field: FieldMeta, initialValue: unknown) {
  if (initialValue !== undefined && initialValue !== null) {
    if (field.kind === 'datetime') {
      return normalizeTemporalValue(field, initialValue);
    }
    return initialValue;
  }
  if (field.kind === 'switch') return false;
  return '';
}

interface ResourceFormDialogProps {
  open: boolean;
  mode: 'create' | 'edit';
  meta: ResourceMeta;
  initialValues?: AnyRecord | null;
  onOpenChange: (open: boolean) => void;
  onSubmit: (payload: AnyRecord) => Promise<void>;
}

export function ResourceFormDialog({
  open,
  mode,
  meta,
  initialValues,
  onOpenChange,
  onSubmit,
}: ResourceFormDialogProps) {
  const schema = useMemo(() => createSchema(meta.formFields), [meta.formFields]);
  const form = useForm<AnyRecord>({
    resolver: zodResolver(schema),
    defaultValues: {},
  });

  useEffect(() => {
    const nextValues: AnyRecord = {};
    for (const field of meta.formFields) {
      nextValues[field.name] = getDefaultValue(field, initialValues?.[field.name]);
    }
    form.reset(nextValues);
  }, [form, initialValues, meta.formFields, open]);

  const submit = form.handleSubmit(async (values) => {
    try {
      const payload = normalizeSubmitValues(meta.formFields, values);
      if (mode === 'edit' && initialValues?.id !== undefined) {
        payload.id = initialValues.id;
      }
      await onSubmit(payload);
      toast.success(mode === 'create' ? '创建成功' : '保存成功');
      onOpenChange(false);
    } catch (error) {
      console.error(error);
      toast.error(mode === 'create' ? '创建失败' : '保存失败');
    }
  });

  const highlightedFields = meta.formFields.slice(0, 2);
  const standardFields = meta.formFields.slice(2);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogHeader>
        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-[var(--text-soft)]">
              {mode === 'create' ? 'Create Record' : 'Edit Record'}
            </p>
            <DialogTitle>{mode === 'create' ? `新增${meta.label}` : `编辑${meta.label}`}</DialogTitle>
            <p className="mt-3 text-sm leading-7 text-[var(--text-muted)]">请按字段区块完成录入。重点字段被前置到顶部，以便更快完成高频操作。</p>
          </div>
          <div className="rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm text-[var(--text-muted)]">
            共 {meta.formFields.length} 个字段
          </div>
        </div>
      </DialogHeader>
      <DialogContent>
        <form className="grid gap-6" onSubmit={submit}>
          {!!highlightedFields.length && (
            <section className="grid grid-cols-12 gap-4">
              {highlightedFields.map((field) => (
                <div
                  className={`rounded-[28px] border border-amber-300/14 bg-[linear-gradient(180deg,rgba(240,169,79,0.12),rgba(255,255,255,0.03))] p-5 ${getFieldGridClass(field)}`}
                  key={field.name}
                >
                  <label className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--text-soft)]">
                    <TooltipText content={field.label}>
                      <span className="truncate">{compactFieldLabel(field.label)}</span>
                    </TooltipText>
                    {field.required ? <span className="text-amber-300">*</span> : null}
                  </label>
                  <p className="mt-2 text-sm leading-7 text-[var(--text-muted)]">{fieldHint(field)}</p>
                  <div className="mt-4">
                    <Controller
                      control={form.control}
                      name={field.name}
                      render={({ field: controllerField }) => {
                        if (field.kind === 'textarea') {
                          return <Textarea {...controllerField} value={(controllerField.value as string) ?? ''} />;
                        }
                        if (shouldUseSelect(field)) {
                          const options = resolveSelectOptions(field);
                          return (
                            <Select {...controllerField} value={(controllerField.value as string) ?? ''}>
                              <option value="">请选择</option>
                              {options.map((rawOption: FieldOptionLike) => {
                                const option = normalizeOption(rawOption);
                                return (
                                <option key={String(option.value)} value={String(option.value)}>
                                  {option.label}
                                </option>
                                );
                              })}
                            </Select>
                          );
                        }
                        if (field.kind === 'switch') {
                          return (
                            <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/15 px-4 py-3">
                              <span className="text-sm text-[var(--text-muted)]">启用该状态</span>
                              <Switch checked={Boolean(controllerField.value)} onCheckedChange={controllerField.onChange} />
                            </div>
                          );
                        }
                        if (field.kind === 'datetime') {
                          return (
                            <Input
                              {...controllerField}
                              type={getTemporalInputType(field)}
                              value={(controllerField.value as string) ?? ''}
                            />
                          );
                        }
                        return (
                          <Input
                            {...controllerField}
                            type={field.kind === 'number' ? 'number' : 'text'}
                            value={(controllerField.value as string | number) ?? ''}
                          />
                        );
                      }}
                    />
                  </div>
                  {form.formState.errors[field.name] ? (
                    <p className="mt-3 text-xs text-red-300">{String(form.formState.errors[field.name]?.message ?? '')}</p>
                  ) : null}
                </div>
              ))}
            </section>
          )}

          {!!standardFields.length && (
            <section className="grid grid-cols-12 gap-4">
              {standardFields.map((field) => (
                <div
                  className={`rounded-[26px] border border-white/8 bg-white/[0.03] p-5 ${getFieldGridClass(field)}`}
                  key={field.name}
                >
                  <label className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--text-soft)]">
                    <TooltipText content={field.label}>
                      <span className="truncate">{compactFieldLabel(field.label)}</span>
                    </TooltipText>
                    {field.required ? <span className="text-amber-300">*</span> : null}
                  </label>
                  <p className="mt-2 text-sm leading-7 text-[var(--text-muted)]">{fieldHint(field)}</p>
                  <div className="mt-4">
                    <Controller
                      control={form.control}
                      name={field.name}
                      render={({ field: controllerField }) => {
                        if (field.kind === 'textarea') {
                          return <Textarea {...controllerField} value={(controllerField.value as string) ?? ''} />;
                        }
                        if (shouldUseSelect(field)) {
                          const options = resolveSelectOptions(field);
                          return (
                            <Select {...controllerField} value={(controllerField.value as string) ?? ''}>
                              <option value="">请选择</option>
                              {options.map((rawOption: FieldOptionLike) => {
                                const option = normalizeOption(rawOption);
                                return (
                                <option key={String(option.value)} value={String(option.value)}>
                                  {option.label}
                                </option>
                                );
                              })}
                            </Select>
                          );
                        }
                        if (field.kind === 'switch') {
                          return (
                            <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/15 px-4 py-3">
                              <span className="text-sm text-[var(--text-muted)]">启用该状态</span>
                              <Switch checked={Boolean(controllerField.value)} onCheckedChange={controllerField.onChange} />
                            </div>
                          );
                        }
                        if (field.kind === 'datetime') {
                          return (
                            <Input
                              {...controllerField}
                              type={getTemporalInputType(field)}
                              value={(controllerField.value as string) ?? ''}
                            />
                          );
                        }
                        return (
                          <Input
                            {...controllerField}
                            type={field.kind === 'number' ? 'number' : 'text'}
                            value={(controllerField.value as string | number) ?? ''}
                          />
                        );
                      }}
                    />
                  </div>
                  {form.formState.errors[field.name] ? (
                    <p className="mt-3 text-xs text-red-300">{String(form.formState.errors[field.name]?.message ?? '')}</p>
                  ) : null}
                </div>
              ))}
            </section>
          )}

          <div className="flex justify-end gap-3 border-t border-white/8 pt-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              取消
            </Button>
            <Button type="submit">{mode === 'create' ? '创建记录' : '保存修改'}</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
