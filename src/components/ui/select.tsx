
import * as React from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/lib/utils';

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement>;

interface SelectOption {
  label: string;
  value: string;
  disabled?: boolean;
}

function extractOptions(children: React.ReactNode): SelectOption[] {
  return React.Children.toArray(children).flatMap((child) => {
    if (!React.isValidElement(child)) return [];
    if (typeof child.type === 'string' && child.type === 'option') {
      const optionElement = child as React.ReactElement<{ children?: React.ReactNode; value?: string | number; disabled?: boolean }>;
      const label = React.Children.toArray(optionElement.props.children)
        .map((node) => (typeof node === 'string' || typeof node === 'number' ? String(node) : ''))
        .join('')
        .trim();
      return [
        {
          label,
          value: String(optionElement.props.value ?? ''),
          disabled: Boolean(optionElement.props.disabled),
        },
      ];
    }
    return [];
  });
}

export function Select({
  children,
  className,
  defaultValue,
  disabled,
  id,
  name,
  onBlur,
  onChange,
  value,
}: SelectProps) {
  const options = React.useMemo(() => extractOptions(children), [children]);
  const [open, setOpen] = React.useState(false);
  const isControlled = value !== undefined;
  const [innerValue, setInnerValue] = React.useState(String(defaultValue ?? ''));

  React.useEffect(() => {
    if (!isControlled) {
      setInnerValue(String(defaultValue ?? ''));
    }
  }, [defaultValue, isControlled]);

  const currentValue = isControlled ? String(value ?? '') : innerValue;
  const selectedOption = options.find((option) => option.value === currentValue);
  const placeholderOption = options.find((option) => option.value === '');
  const displayLabel = selectedOption?.label || placeholderOption?.label || '请选择';

  const emitChange = (nextValue: string) => {
    if (!isControlled) {
      setInnerValue(nextValue);
    }
    const syntheticEvent = {
      target: { value: nextValue, name },
      currentTarget: { value: nextValue, name },
    } as React.ChangeEvent<HTMLSelectElement>;
    onChange?.(syntheticEvent);
  };

  const handleSelect = (nextValue: string) => {
    emitChange(nextValue);
    setOpen(false);
  };

  return (
    <>
      {name ? <input name={name} type="hidden" value={currentValue} /> : null}
      <button
        className={cn(
          'flex h-11 w-full items-center justify-between rounded-2xl border border-[var(--border-soft)] bg-white/6 px-4 py-2 text-left text-sm text-[var(--text-main)] outline-none backdrop-blur transition focus:border-[var(--border-strong)] focus:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        disabled={disabled}
        id={id}
        onBlur={onBlur as React.FocusEventHandler<HTMLButtonElement> | undefined}
        onClick={() => {
          if (!disabled) setOpen(true);
        }}
        type="button"
      >
        <span className={cn('truncate', currentValue ? 'text-[var(--text-main)]' : 'text-[var(--text-soft)]')}>{displayLabel}</span>
        <span className="text-xs text-[var(--text-soft)]">v</span>
      </button>

      {open
        ? createPortal(
            <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/55 p-4 backdrop-blur-sm" onClick={() => setOpen(false)}>
              <div
                className="w-full max-w-lg overflow-hidden rounded-[28px] border border-[var(--border-soft)] bg-[var(--bg-panel-strong)] shadow-[0_24px_80px_rgba(0,0,0,0.4)]"
                onClick={(event) => event.stopPropagation()}
              >
                <div className="border-b border-[var(--border-soft)] px-5 py-4">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[var(--text-soft)]">Select Option</p>
                  <p className="mt-2 text-base font-semibold text-[var(--text-main)]">{displayLabel}</p>
                </div>
                <div className="max-h-[55vh] overflow-y-auto p-3">
                  <div className="grid gap-2">
                    {options.map((option) => {
                      const active = option.value === currentValue;
                      return (
                        <button
                          className={cn(
                            'flex items-center justify-between rounded-2xl border px-4 py-3 text-left text-sm transition',
                            active
                              ? 'border-[rgba(var(--accent-rgb),0.28)] bg-[rgba(var(--accent-rgb),0.12)] text-[var(--text-main)]'
                              : 'border-[var(--border-soft)] bg-white/[0.02] text-[var(--text-muted)] hover:bg-[var(--shell-chip-bg)] hover:text-[var(--text-main)]',
                            option.disabled && 'cursor-not-allowed opacity-40'
                          )}
                          disabled={option.disabled}
                          key={`${name ?? 'select'}-${option.value}`}
                          onClick={() => handleSelect(option.value)}
                          type="button"
                        >
                          <span className="truncate">{option.label || '空值'}</span>
                          <span className={cn('text-xs', active ? 'text-[var(--accent-strong)]' : 'text-[var(--text-soft)]')}>{active ? '已选' : ''}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>,
            document.body
          )
        : null}
    </>
  );
}
