
interface SwitchProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

export function Switch({ checked, onCheckedChange }: SwitchProps) {
  return (
    <button
      type="button"
      onClick={() => onCheckedChange(!checked)}
      className={`relative inline-flex h-7 w-12 items-center rounded-full border transition ${checked ? 'border-amber-300/40 bg-amber-300/30' : 'border-white/10 bg-white/10'}`}
    >
      <span
        className={`inline-block h-5 w-5 transform rounded-full bg-[linear-gradient(135deg,#fff8ef,#f0a94f)] shadow-sm transition ${checked ? 'translate-x-6' : 'translate-x-1'}`}
      />
    </button>
  );
}
