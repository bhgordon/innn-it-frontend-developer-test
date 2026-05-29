interface ContentFieldProps {
  value: string;
  onChange: (value: string) => void;
  id: string;
  counterId: string;
  error?: string;
  errorId?: string;
}

export function ContentField({
  value,
  onChange,
  id,
  counterId,
  error,
  errorId,
}: ContentFieldProps) {
  const describedBy = [counterId, error ? errorId : undefined]
    .filter(Boolean)
    .join(" ");

  return (
    <div>
      <label htmlFor={id} className="block text-lg font-bold text-neutral-900">
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
        aria-invalid={!!error}
        aria-describedby={describedBy}
        className={`mt-2 w-full resize-y rounded-lg border-2 px-4 py-2.5 text-neutral-900 outline-none focus:ring-2 focus:ring-violet-300 ${
          error ? "border-red-500" : "border-neutral-800"
        }`}
      />
      <div className="mt-1 flex items-center justify-between text-sm">
        {error ? (
          <p id={errorId} className="flex items-center gap-1 text-red-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-4 w-4 shrink-0"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-8-5a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0v-4.5A.75.75 0 0 1 10 5Zm0 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
                clipRule="evenodd"
              />
            </svg>
            {error}
          </p>
        ) : (
          <span />
        )}
        <p id={counterId} className="text-neutral-500">
          {value.length.toLocaleString("de-DE")} / 10.000 Zeichen
        </p>
      </div>
    </div>
  );
}
