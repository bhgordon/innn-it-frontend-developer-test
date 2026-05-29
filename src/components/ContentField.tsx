import { useId } from "react";
import { ErrorIcon } from "./ErrorIcon";

interface ContentFieldProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export function ContentField({
  value,
  onChange,
  error,
}: ContentFieldProps) {
  const id = useId();
  const counterId = useId();
  const errorId = useId();
  const describedBy = [counterId, error ? errorId : undefined]
    .filter(Boolean)
    .join(" ");

  return (
    <div>
      <label htmlFor={id} className="block text-lg font-medium text-neutral-900">
        Deine Neuigkeiten<span aria-hidden="true" className="ml-0.5 text-red-500">*</span>
      </label>
      <textarea
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value.slice(0, 10000))}
        maxLength={10000}
        placeholder="Bitte schreibe ein paar Worte zu deinem Update."
        rows={6}
        aria-required="true"
        aria-invalid={error ? "true" : undefined}
        aria-describedby={describedBy}
        className={`mt-2 w-full resize-y rounded-lg border-2 px-4 py-2.5 text-neutral-900 outline-none focus:ring-2 focus:ring-violet-300 ${
          error ? "border-red-500" : "border-neutral-800"
        }`}
      />
      <div className="mt-1 flex items-center justify-between text-sm">
        {error ? (
          <p id={errorId} className="flex items-center gap-1 text-red-600">
            <ErrorIcon className="h-4 w-4 shrink-0" />
            {error}
          </p>
        ) : (
          <span />
        )}
        <p id={counterId} className="shrink-0 ps-2 text-neutral-500">
          {value.length.toLocaleString("de-DE")} / 10.000 Zeichen
        </p>
      </div>
    </div>
  );
}
