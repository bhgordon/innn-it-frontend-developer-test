interface AuthorSectionProps {
  authorName: string;
  onAuthorChange: (value: string) => void;
  isEditable: boolean;
  onToggle: () => void;
  authorId: string;
  error?: string;
  errorId?: string;
}

export function AuthorSection({
  authorName,
  onAuthorChange,
  isEditable,
  onToggle,
  authorId,
  error,
  errorId,
}: AuthorSectionProps) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <span className="text-lg font-bold text-neutral-900">Absender</span>
        <button
          type="button"
          role="switch"
          aria-checked={isEditable}
          onClick={onToggle}
          className="flex items-center gap-2 text-sm text-neutral-900"
        >
          <span
            aria-hidden="true"
            className={`relative inline-flex h-6 w-11 shrink-0 rounded-full transition-colors ${
              isEditable ? "bg-violet-300" : "bg-neutral-200"
            }`}
          >
            <span
              className={`mt-0.5 inline-block h-5 w-5 rounded-full bg-white shadow transition-transform ${
                isEditable ? "translate-x-5" : "translate-x-0.5"
              }`}
            />
          </span>
          Absender ändern
        </button>
      </div>

      <p className="mt-2 text-sm text-neutral-500">
        Hier hast du die Option, das Update unter einem anderen Namen zu
        veröffentlichen.
      </p>

      <label
        htmlFor={authorId}
        className="mt-4 block text-sm font-bold text-neutral-900"
      >
        Absender
        {isEditable && (
          <span aria-hidden="true" className="ml-0.5 text-red-500">*</span>
        )}
      </label>
      <input
        id={authorId}
        type="text"
        value={authorName}
        onChange={(e) => onAuthorChange(e.target.value)}
        readOnly={!isEditable}
        placeholder="Petra Petitionsstarterin"
        aria-required={isEditable}
        aria-invalid={error ? "true" : undefined}
        aria-describedby={error ? errorId : undefined}
        className={`mt-1 w-full rounded-lg px-4 py-2.5 outline-none transition-colors focus:ring-2 focus:ring-violet-300 ${
          isEditable
            ? `border-2 bg-white text-neutral-900 ${error ? "border-red-500" : "border-neutral-800"}`
            : "bg-neutral-200 text-neutral-500"
        }`}
      />
      {error && (
        <p
          id={errorId}
          className="mt-1 flex items-center gap-1 text-sm text-red-600"
        >
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
      )}
    </div>
  );
}
