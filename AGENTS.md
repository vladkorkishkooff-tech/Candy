# AGENTS.md

## Project Mission

Vlad Portfolio is a static premium portfolio page for positioning Vlad as an "engineer under one roof" for Telegram bots, AI integrations, websites, and small-business automation.

The site must feel like a dark editorial/product page inspired by the SEOtalos reference, but the meaning is Vlad's engineering system: Telegram, AI, CRM, site, requests, and operations connected into one practical workflow.

## Stack And Commands

- Static HTML/CSS/vanilla JavaScript only.
- No React/Vite/build step unless the user explicitly approves a stack change.
- No backend, contact form, database, paid UI kit, or heavy animation library unless the user explicitly approves a stack change.
- Open directly with `index.html`, or run:

```powershell
python -m http.server 8000 --bind 127.0.0.1
```

Then test `http://127.0.0.1:8000/`.

## Source Of Truth

- `index.html`: page content, semantic structure, data attributes for interactions.
- `css/02-reset.css`: design tokens, base layout, buttons, background system.
- `css/04-components/*.css`: section-specific styling.
- `css/05-animations.css`: reveal/cursor/motion styles.
- `js/main.js` and `js/main.bundle.js`: keep synchronized. The page loads `main.bundle.js`.
- `rules.md`: product and QA requirements.
- `project.md`: living implementation memory.

## Design Rules

- Keep the first viewport premium, calm, and useful; avoid turning it into a demo of effects.
- Hero must communicate "Vlad builds connected systems", not a generic SEO/product template.
- Use Syne for display headings and Inter for body/UI text.
- Use dark base, white contrast CTA, grid/noise texture, large arcs, restrained sparkle decor, and glass surfaces.
- Cards may use 2.5D tilt and depth, but text must remain readable.
- No horizontal overflow at `390px` or `1440px`.
- Do not add decorative elements that overlap copy or CTA.

## Content Rules

- Keep Telegram and email contact links unchanged unless the user requests otherwise.
- Do not invent clients, revenue, conversion rates, guarantees, "100%" claims, or "0 critical issues".
- Keep detailed stack behind `details/summary`.
- Project cards show at most 3 visible technology tags.
- Copy should be clear Russian, business-oriented, and free of generic AI/marketing cliches.

## Interaction Rules

- Desktop: magnetic buttons/cursor and 2.5D tilt are allowed.
- Touch devices: heavy hover/tilt effects must not be required.
- `prefers-reduced-motion: reduce` must disable non-essential animation.
- Mobile menu must expose correct `aria-expanded`/`aria-hidden`, close on Escape, and trap focus while open.
- `details/summary` must remain keyboard accessible.
- Decorative hero objects must not be rendered as buttons or controls unless they have real interaction.

## QA Gates

Before handoff after visual changes:

- Check desktop `1440x900`: hero premium, CTA visible, no horizontal overflow.
- Check mobile `390x844`: CTA visible without long scroll, no horizontal overflow, no text clipping.
- Check console for errors.
- Check Telegram/email links and anchor navigation.
- Check mobile menu, Escape close, details, counters, reduced motion behavior.
- Check hero showcase motion, reduced-motion fallback, and that decorative objects are not keyboard traps.
- Capture screenshots for hero desktop, mobile top, services/cases, and one opened details block.

## Do Not

- Do not convert the project to self-contained HTML.
- Do not add Three.js or a build system for v1 of this redesign.
- Do not leave stale generated screenshots/logs in the repo.
- Do not suppress accessibility or console issues instead of fixing them.
- Do not make unrelated rewrites outside the static site and documentation.
