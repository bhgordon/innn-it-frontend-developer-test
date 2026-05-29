interface AuthorSectionProps {
  authorName: string;
  onAuthorChange: (value: string) => void;
  isEditable: boolean;
  onToggle: () => void;
  authorId: string;
}

export function AuthorSection({
  authorName,
  onAuthorChange,
  isEditable,
  onToggle,
  authorId,
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
      </label>
      <input
        id={authorId}
        type="text"
        value={authorName}
        onChange={(e) => onAuthorChange(e.target.value)}
        readOnly={!isEditable}
        placeholder="Petra Petitionsstarterin"
        aria-required="true"
        className={`mt-1 w-full rounded-lg px-4 py-2.5 outline-none transition-colors focus:ring-2 focus:ring-violet-300 ${
          isEditable
            ? "border-2 border-neutral-800 bg-white text-neutral-900"
            : "bg-neutral-200 text-neutral-500"
        }`}
      />
    </div>
  );
}
