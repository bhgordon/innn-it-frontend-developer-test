import { useId } from "react";
import { ErrorIcon } from "./ErrorIcon";

interface AuthorSectionProps {
  authorName: string;
  onAuthorChange: (value: string) => void;
  isEditable: boolean;
  onToggle: () => void;
  error?: string;
}

export function AuthorSection({
  authorName,
  onAuthorChange,
  isEditable,
  onToggle,
  error,
}: AuthorSectionProps) {
  const authorId = useId();
  const errorId = useId();
  return (
    <div>
      <div className="flex items-center justify-between">
        <span className="text-lg font-medium text-neutral-900">Absender</span>
        <button
          type="button"
          role="switch"
          aria-checked={isEditable}
          onClick={onToggle}
          className="flex items-center gap-2 text-sm text-neutral-900"
        >
          <span
            aria-hidden="true"
            className={`relative inline-flex h-5 w-9 shrink-0 rounded-full border border-neutral-800 transition-colors ${
              isEditable ? "bg-violet-300" : "bg-neutral-200"
            }`}
          >
            <span
              className={`mt-0.5 inline-block h-3.5 w-3.5 rounded-full border border-neutral-800 bg-white transition-transform ${
                isEditable ? "translate-x-4" : "translate-x-0.5"
              }`}
            />
          </span>
          Absender ändern
        </button>
      </div>

      <p className="mt-2 text-sm text-neutral-700">
        Hier hast du die Option, das Update unter einem anderen Namen zu
        veröffentlichen.
      </p>

      <label
        htmlFor={authorId}
        className="mt-4 block text-sm font-medium text-neutral-900"
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
        disabled={!isEditable}
        placeholder="Petra Petitionsstarterin"
        aria-required={isEditable}
        aria-invalid={error ? "true" : undefined}
        aria-describedby={error ? errorId : undefined}
        className={`mt-1 w-full rounded-lg px-4 py-2.5 outline-none transition-colors focus:ring-2 focus:ring-violet-300 ${
          isEditable
            ? `border-2 bg-white text-neutral-900 ${error ? "border-red-500" : "border-neutral-800"}`
            : "cursor-not-allowed border border-neutral-800 bg-neutral-200 text-neutral-600"
        }`}
      />
      {error && (
        <p
          id={errorId}
          className="mt-1 flex items-center gap-1 text-sm text-red-600"
        >
          <ErrorIcon className="h-4 w-4 shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}
