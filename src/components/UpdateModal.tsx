"use client";

import { useEffect, useId, useRef, useState } from "react";
import { ErrorIcon } from "./ErrorIcon";
import { TitleField } from "./TitleField";
import { ContentField } from "./ContentField";
import { AuthorSection } from "./AuthorSection";

export function UpdateModal() {
  const headingId = useId();
  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const authorRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [isAuthorEditable, setIsAuthorEditable] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [successMessage, setSuccessMessage] = useState<{
    text: string;
    type: "save" | "publish";
  } | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("petition-update-draft");
      if (!saved) return;
      const draft = JSON.parse(saved);
      if (draft.title) setTitle(draft.title);
      if (draft.content) setContent(draft.content);
      if (draft.author) setAuthorName(draft.author);
      if (draft.isAuthorEditable) setIsAuthorEditable(true);
    } catch { /* ignore corrupted data */ }
  }, []);

  function clearFieldError(field: string) {
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
    setSuccessMessage(null);
  }

  function handleSaveDraft() {
    setSuccessMessage(null);
    setErrors({});

    const data = {
      title: title.trim(),
      content: content.trim(),
      author: authorName.trim(),
      isAuthorEditable,
      savedAt: new Date().toISOString(),
    };

    try {
      localStorage.setItem("petition-update-draft", JSON.stringify(data));
      setSuccessMessage({ text: "Entwurf wurde erfolgreich gespeichert.", type: "save" });
    } catch {
      setErrors({ save: "Entwurf konnte nicht gespeichert werden." });
    }
  }

  function handleCancel() {
    if (!window.confirm("Möchtest du wirklich abbrechen? Alle Änderungen gehen verloren.")) return;

    setTitle("");
    setContent("");
    setAuthorName("");
    setIsAuthorEditable(false);
    setErrors({});
    setSuccessMessage(null);
    localStorage.removeItem("petition-update-draft");
  }

  function handlePublish() {
    setSuccessMessage(null);
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
    if (Object.keys(newErrors).length > 0) {
      if (newErrors.title) titleRef.current?.focus();
      else if (newErrors.content) contentRef.current?.focus();
      else if (newErrors.author) authorRef.current?.focus();
      return;
    }

    setSuccessMessage({ text: "Update wurde erfolgreich veröffentlicht.", type: "publish" });
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

      <h2 id={headingId} className="text-2xl font-medium text-neutral-900">
        Neues Update erstellen
      </h2>

      <form onSubmit={(e) => e.preventDefault()}>
        <div className="mt-6 space-y-6">
          <TitleField
            ref={titleRef}
            value={title}
            onChange={(v) => {
              setTitle(v);
              clearFieldError("title");
            }}
            error={errors.title}
          />
          <ContentField
            ref={contentRef}
            value={content}
            onChange={(v) => {
              setContent(v);
              clearFieldError("content");
            }}
            error={errors.content}
          />
          <AuthorSection
            ref={authorRef}
            authorName={authorName}
            onAuthorChange={(v) => {
              setAuthorName(v);
              clearFieldError("author");
            }}
            isEditable={isAuthorEditable}
            onToggle={() => {
              setIsAuthorEditable((prev) => {
                if (prev) clearFieldError("author");
                return !prev;
              });
            }}
            error={errors.author}
          />
        </div>

        {Object.keys(errors).length > 0 && (
          <div
            role="alert"
            className="mt-6 rounded-lg border border-red-300 bg-red-50 p-4 text-sm text-red-700"
          >
            <p className="flex items-center gap-1.5 font-bold">
              <ErrorIcon className="h-5 w-5 shrink-0" />
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

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-end">
          <button
            type="button"
            onClick={handleCancel}
            className="w-full rounded-full border border-neutral-900 px-6 py-2.5 text-center font-medium text-neutral-900 transition-colors hover:bg-violet-100 sm:w-auto"
          >
            Abbrechen
          </button>
          <button
            type="button"
            onClick={handleSaveDraft}
            className="w-full rounded-full border border-neutral-900 bg-violet-300 px-6 py-2.5 text-center font-medium text-neutral-900 transition-colors hover:bg-violet-400 sm:w-auto"
          >
            Entwurf speichern
          </button>
          <button
            type="button"
            onClick={handlePublish}
            className="w-full rounded-full border border-neutral-900 bg-orange-500 px-6 py-2.5 text-center font-medium text-neutral-900 transition-colors hover:bg-orange-600 sm:w-auto"
          >
            Update veröffentlichen
          </button>
        </div>

        {successMessage && (
          <div
            role="alert"
            className={`mt-4 flex items-center justify-between rounded-lg border p-4 text-sm ${
              successMessage.type === "save"
                ? "border-violet-300 bg-violet-50 text-violet-700"
                : "border-green-300 bg-green-50 text-green-700"
            }`}
          >
            <p className="flex items-center gap-1.5">
              {successMessage.type === "save" ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-5 w-5 shrink-0"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 2c-1.716 0-3.408.106-5.07.31C3.806 2.45 3 3.414 3 4.517V17.25a.75.75 0 0 0 1.075.676L10 15.082l5.925 2.844A.75.75 0 0 0 17 17.25V4.517c0-1.103-.806-2.068-1.93-2.207A41.403 41.403 0 0 0 10 2Z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-5 w-5 shrink-0"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
              {successMessage.text}
            </p>
            <button
              type="button"
              onClick={() => setSuccessMessage(null)}
              className={`ml-4 shrink-0 rounded-full p-0.5 transition-colors ${
                successMessage.type === "save"
                  ? "text-violet-700 hover:text-violet-900"
                  : "text-green-700 hover:text-green-900"
              }`}
              aria-label="Meldung schließen"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-4 w-4"
                aria-hidden="true"
              >
                <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
              </svg>
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
