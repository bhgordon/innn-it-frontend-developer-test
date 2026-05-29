# Petition Update Creator

A petition update creation form built with React and TypeScript for the innn.it frontend developer challenge.

## Setup

```bash
npm install
npm run dev
```

Opens at [http://localhost:3000](http://localhost:3000).

### Tests

Cypress E2E tests cover validation, draft persistence, the cancel flow, the author toggle, and character counters. The dev server needs to be running first:

```bash
npm run dev
npm run cypress:run   # headless
npm run cypress:open  # interactive UI
```

## Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4
- Cypress (E2E testing)

## Technical Decisions

**Component structure:** Each form section (TitleField, ContentField, AuthorSection) is its own component. They own their internal wiring (IDs, label/input associations) and receive only value, onChange, and error from the parent. UpdateModal handles state and validation logic.

**Fonts:** Soehne is self-hosted as woff2 files rather than loaded from the external CSS endpoint. This avoids a runtime dependency on an external server and gives us `font-display: swap` control.

**Draft persistence:** Drafts are saved to localStorage on "Entwurf speichern" and restored on page load via `useEffect` to avoid SSR hydration mismatches. The author toggle state is persisted alongside the form data.

**Validation:** Required field validation runs on "Update veröffentlichen". Save draft stores data without validation. Errors are cleared per-field as the user types, and the first invalid field receives focus on submission.

**Cancel flow:** "Abbrechen" shows a confirmation dialog before clearing the form and removing the saved draft from localStorage.

## Accessibility

WCAG 2.2 AA was a primary focus throughout:

- `lang="de"` for correct screen reader pronunciation
- `aria-required`, `aria-invalid`, and `aria-describedby` for form field state
- `aria-hidden` on decorative elements (asterisks, toggle visuals, close button)
- `role="alert"` for error summaries and success messages
- `role="switch"` with `aria-checked` for the author toggle
- Error states use icon + text + border color (not color alone)
- Focus management on validation failure, moving focus to the first invalid field
- `useId()` for stable, SSR-safe ID generation

For accessibility design and implementation decisions, I borrowed heavily from one of my favorite talks on React forms by Kateryna Porshnieva called "Building Accessible Forms in React". I watched it a couple years ago and still refer back to it whenever I'm building forms in React. <a href="https://www.youtube.com/watch?v=gxwJCF8dqh8" target="_blank">Watch the talk here</a>.

## Tradeoffs / With More Time

- The close button is decorative per the spec (modal never closes), so it's hidden from assistive tech. In a real app it would need to be functional and accessible.
- Would consider extracting the success/error alert pattern into a shared component.
- The cancel confirmation uses `window.confirm` (browser default styling). I would replace this with a custom modal for a more polished UX.
- Would add clearer UX for draft management so users can see where their in-progress drafts are saved and easily return to them.
- Since these are updates to existing petitions, the title field could be a dropdown of the user's petitions rather than free text, linking the update to its parent petition.
- I implemented ARIA best practices throughout, but proper screen reader testing takes hours of hands-on work with VoiceOver/NVDA. Given more time, I would do thorough manual testing to make sure the form works seamlessly with assistive technology, not just that the markup is correct.
