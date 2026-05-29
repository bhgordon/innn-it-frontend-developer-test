"use client";

import { useId } from "react";

export function UpdateModal() {
  const headingId = useId();

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={headingId}
      className="relative w-full max-w-[640px] rounded-2xl bg-white p-8 shadow-xl sm:p-10"
    >
      <button
        type="button"
        aria-hidden="true"
        tabIndex={-1}
        className="absolute top-6 right-6 flex h-8 w-8 items-center justify-center rounded-full text-neutral-400 hover:text-neutral-900 transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-6 w-6"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      <h2 id={headingId} className="text-2xl font-bold text-neutral-900">
        Neues Update erstellen
      </h2>

      <form onSubmit={(e) => e.preventDefault()}>
        <div className="mt-8 flex flex-wrap gap-3">
          <button
            type="button"
            className="rounded-full border-2 border-violet-300 px-6 py-2.5 font-medium text-neutral-900 transition-colors hover:bg-violet-100"
          >
            Abbrechen
          </button>
          <button
            type="button"
            className="rounded-full bg-violet-300 px-6 py-2.5 font-medium text-neutral-900 transition-colors hover:bg-violet-400"
          >
            Entwurf speichern
          </button>
          <button
            type="button"
            className="rounded-full bg-orange-500 px-6 py-2.5 font-medium text-white transition-colors hover:bg-orange-600"
          >
            Update veröffentlichen
          </button>
        </div>
      </form>
    </div>
  );
}
