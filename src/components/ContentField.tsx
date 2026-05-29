interface ContentFieldProps {
  value: string;
  onChange: (value: string) => void;
  id: string;
  counterId: string;
}

export function ContentField({
  value,
  onChange,
  id,
  counterId,
}: ContentFieldProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-lg font-bold text-neutral-900">
        Deine Neuigkeiten
      </label>
      <textarea
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value.slice(0, 10000))}
        maxLength={10000}
        placeholder="Bitte schreibe ein paar Worte zu deinem Update."
        rows={6}
        aria-required="true"
        aria-describedby={counterId}
        className="mt-2 w-full resize-y rounded-lg border-2 border-neutral-800 px-4 py-2.5 text-neutral-900 outline-none focus:ring-2 focus:ring-violet-300"
      />
      <p id={counterId} className="mt-1 text-right text-sm text-neutral-500">
        {value.length.toLocaleString("de-DE")} / 10.000 Zeichen
      </p>
    </div>
  );
}
