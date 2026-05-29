interface TitleFieldProps {
  value: string;
  onChange: (value: string) => void;
  id: string;
  counterId: string;
}

export function TitleField({ value, onChange, id, counterId }: TitleFieldProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-lg font-bold text-neutral-900">
        Titel
      </label>
      <input
        id={id}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value.slice(0, 100))}
        maxLength={100}
        aria-required="true"
        aria-describedby={counterId}
        className="mt-2 w-full rounded-lg border-2 border-neutral-800 px-4 py-2.5 text-neutral-900 outline-none focus:ring-2 focus:ring-violet-300"
      />
      <p id={counterId} className="mt-1 text-right text-sm text-neutral-500">
        {value.length} / 100 Zeichen
      </p>
    </div>
  );
}
