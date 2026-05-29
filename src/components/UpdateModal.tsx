"use client";

import { useId, useState } from "react";
import { TitleField } from "./TitleField";
import { ContentField } from "./ContentField";
import { AuthorSection } from "./AuthorSection";

export function UpdateModal() {
  const headingId = useId();
  const titleId = useId();
  const titleCounterId = useId();
  const titleErrorId = useId();
  const contentId = useId();
  const contentCounterId = useId();
  const contentErrorId = useId();
  const authorId = useId();
  const authorErrorId = useId();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [isAuthorEditable, setIsAuthorEditable] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [successMessage, setSuccessMessage] = useState("");

  function clearFieldError(field: string) {
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
    setSuccessMessage("");
  }

  function handleSaveDraft() {
    setSuccessMessage("");
    const newErrors: Record<string, string> = {};

    if (!title.trim()) {
      newErrors.title = "Bitte gib einen Titel ein.";
    }
    if (!content.trim()) {
      newErrors.content = "Bitte schreibe ein paar Worte zu deinem Update.";
    }
    if (isAuthorEditable && !authorName.trim()) {
      newErrors.author = "Bitte gib einen Absender ein.";
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    const draft = {
      title: title.trim(),
      content: content.trim(),
      author: authorName.trim(),
      savedAt: new Date().toISOString(),
    };

    try {
      localStorage.setItem("petition-update-draft", JSON.stringify(draft));
      setSuccessMessage("Entwurf wurde erfolgreich gespeichert.");
    } catch {
      setErrors({ save: "Entwurf konnte nicht gespeichert werden." });
    }
  }

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
        <div className="mt-6 space-y-6">
          <TitleField
            value={title}
            onChange={(v) => {
              setTitle(v);
              clearFieldError("title");
            }}
            id={titleId}
            counterId={titleCounterId}
            error={errors.title}
            errorId={titleErrorId}
          />
          <ContentField
            value={content}
            onChange={(v) => {
              setContent(v);
              clearFieldError("content");
            }}
            id={contentId}
            counterId={contentCounterId}
            error={errors.content}
            errorId={contentErrorId}
          />
          <AuthorSection
            authorName={authorName}
            onAuthorChange={(v) => {
              setAuthorName(v);
              clearFieldError("author");
            }}
            isEditable={isAuthorEditable}
            onToggle={() => setIsAuthorEditable((prev) => !prev)}
            authorId={authorId}
            error={errors.author}
            errorId={authorErrorId}
          />
        </div>

        {Object.keys(errors).length > 0 && (
          <div
            role="alert"
            className="mt-6 rounded-lg border border-red-300 bg-red-50 p-4 text-sm text-red-700"
          >
            <p className="flex items-center gap-1.5 font-bold">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-5 w-5 shrink-0"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-8-5a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0v-4.5A.75.75 0 0 1 10 5Zm0 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
                  clipRule="evenodd"
                />
              </svg>
              Bitte korrigiere die folgenden Fehler:
            </p>
            <ul className="mt-1 list-disc pl-5">
              {errors.title && <li>{errors.title}</li>}
              {errors.content && <li>{errors.content}</li>}
              {errors.author && <li>{errors.author}</li>}
              {errors.save && <li>{errors.save}</li>}
            </ul>
          </div>
        )}

        <div className="mt-8 flex flex-wrap gap-3">
          <button
            type="button"
            className="rounded-full border-2 border-violet-300 px-6 py-2.5 font-medium text-neutral-900 transition-colors hover:bg-violet-100"
          >
            Abbrechen
          </button>
          <button
            type="button"
            onClick={handleSaveDraft}
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

        {successMessage && (
          <div
            role="alert"
            className="mt-4 rounded-lg border border-green-300 bg-green-50 p-4 text-sm text-green-700"
          >
            {successMessage}
          </div>
        )}
      </form>
    </div>
  );
}
