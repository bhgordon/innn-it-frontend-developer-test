# Petition Update Creator

A petition update creation form built with React and TypeScript for the innn.it frontend developer challenge.

## Setup

```bash
npm install
npm run dev
```

Opens at [http://localhost:3000](http://localhost:3000).

## Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4

## Technical Decisions

**Component structure** -- Each form section (TitleField, ContentField, AuthorSection) is its own component. They own their internal wiring (IDs, label/input associations) and receive only value, onChange, and error from the parent. UpdateModal handles state and validation logic.

**Fonts** -- Soehne is self-hosted as woff2 files rather than loaded from the external CSS endpoint. Avoids a runtime dependency on an external server and gives us `font-display: swap` control.

**Draft persistence** -- Drafts are saved to localStorage on "Entwurf speichern" and restored on page load via `useEffect` to avoid SSR hydration mismatches.

**Validation** -- Required field validation runs on "Update veröffentlichen". Save draft stores data without validation. Errors are cleared per-field as the user types.

## Accessibility

WCAG 2.2 AA was a primary focus throughout:

- `lang="de"` for correct screen reader pronunciation
- `aria-required`, `aria-invalid`, and `aria-describedby` for form field state
- `aria-hidden` on decorative elements (asterisks, toggle visuals, close button)
- `role="alert"` for error summaries and success messages
- `role="switch"` with `aria-checked` for the author toggle
- Error states use icon + text + border color (not color alone)
- `useId()` for stable, SSR-safe ID generation

## Tradeoffs / With More Time

- No unit tests yet -- would prioritize testing validation logic and draft persistence
- The close button is decorative per the spec (modal never closes), so it's hidden from assistive tech. In a real app it would need to be functional and accessible
- No focus management on validation failure -- ideally the first invalid field would receive focus
- Would consider extracting the success/error alert pattern into a shared component
