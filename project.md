# Project Memory

## Current Goal

Premium redesign of Vlad's static portfolio page under a SEOtalos/Apple-level dark editorial direction. The design should immediately show Vlad as an engineer who builds connected business systems: Telegram bots, AI integrations, websites, CRM/table/email handoffs, and automation.

## Current Status

- Static site, no build step.
- Redesign keeps HTML/CSS/vanilla JS.
- Operating mode from 2026-06-14: Gemini via Antigravity is the temporary chief strategist and tech lead because Codex limits/subscription are exhausted. Codex is frozen as an active team executor and should be used only for lightweight coordination, review, or handoff notes until limits are restored.
- Hero follows the selected `Engineer's Proof` direction: a dark editorial workspace with hands at work (`vlad_portrait_hero.png`) wrapped inside a glassmorphic card with interactive 2.5D tilt, and compact personal-brand copy with headline "От задачи — до запуска".
- README screenshots from real GitHub projects (`WB-Ozon-Dashboard`, `RepairCalc`) plus curated premium visuals for projects without suitable README media are wrapped inside hover-interactive glass browser and mobile phone frames in the Showcase ("Что я разрабатываю") and liquid-glass Cases gallery ("Мои кейсы") sections.
- Services section follows the supplied black/white liquid-glass reference: headline plus compact KPI tiles, a single framed glass scene, vertical desktop category rail, large live project showcase, and horizontal mobile category rail.
- Services now includes a dedicated `Лендинги и сайты` direction for hosted landing pages. The first live example is `premium-visit-card.vercel.app`; future Vercel landings should be added to this lane before or alongside the cases grid.
- Cases section follows the same reference system with restrained liquid-glass framing, denser project cards, real current work screenshots, compact tech tags, and native details blocks.
- Cases were polished into a curated portfolio layout: the first two projects are hero cases, three technical projects form the supporting row, and the live hosted site is a wide editorial card.
- Copy is business-oriented, in Russian, and aligns with Vlad's real technical projects.
- Integrated Vlad's portrait (`vlad_portrait.png`) into the "About me" section. Updated layout (`index.html`) to support a two-column setup with a glassmorphic portrait card and added hover transitions (grayscale to color) plus responsive stack layout (`about.css`).
- Replaced the dense "About me" text with the new interactive "Pipeline Conveyor" (Инженерный конвейер) showing a 4-step workflow. It features an animated SVG line connection with neon drop-shadow glow that accelerates on card hover, and gracefully adapts to a vertical stack (1fr) on mobile viewports while hiding the SVG line to prevent horizontal scroll.
- Cache busted CSS styling by updating version parameters (`?v=photo-hero-workspace-20260620` and `?v=pipeline-conveyor-20260620`) in `index.html` to force browser reload.

## Stack

- HTML5
- CSS3 split by sections
- Vanilla JavaScript runtime loaded from `js/main.bundle.js`
- Fonts: Syne for display, Inter for body/UI, IBM Plex Mono for technical labels and control chrome
- No production backend, database, paid UI kit, React/Vite, Three.js, or heavy animation dependency

## Architecture Map

- `index.html`: all semantic content and interaction data attributes.
- `css/02-reset.css`: design tokens, base surfaces, buttons, global background.
- `css/04-components/`: section-level visual system.
- `css/05-animations.css`: reveal, cursor, reduced motion behavior.
- `css/06-utilities.css`: small helpers and scrollbar/selection.
- `js/main.js`: source copy of the runtime.
- `js/main.bundle.js`: loaded runtime; keep synchronized with `main.js`.
- `rules.md`: product/QA spec.
- `AGENTS.md`: working rules for future agents.

## Interaction Decisions

- Motion is progressive enhancement: reveal, counters, magnetic buttons, custom cursor, 2.5D tilt, hover states, and the process map deck.
- Controls that look clickable must change visible state; decorative 3D objects are not rendered as buttons.
- Touch devices and reduced-motion users should still receive a complete static experience.
- `details/summary` remains native for stack and case expansion.
- Mobile menu locks body scroll, traps focus, closes on links, closes on Escape, and restores focus.

## Content Decisions

- Keep the role "engineer under one roof" and the small-business audience.
- Display a professional portrait (`vlad_portrait.png`) in the "About me" section using a premium glassmorphic border and hover transitions (grayscale to color) to reinforce personal brand trust.
- Keep Telegram and email as the only contact paths.
- Populate cases from Vlad's real GitHub work. Use README screenshots where available, highlight `WB-Ozon-Dashboard` and `RepairCalc`, include regenerated visuals for `AgentBackup`, `Parser-Rosaccreditation`, and API integration, use a generated Telegram booking photo for `ManicureBot`, and do not use `PsyhoSite` or `MapHosting`.
- In the `Что я разрабатываю` showcase, keep preview frames matched to asset shape: dashboard/parser/API/backup use wide 16:10 frames, `RepairCalc` uses a portrait UI frame, and the Telegram bot uses a wide photo frame. Avoid long service titles that can overflow into the visual column.
- Background direction updated: use a deep black layered base with a visible but restrained grid, reduced cursor glow, and stronger liquid-glass depth on cards/section frames. Trust should come from real visuals and compact proof text, not dense explanatory copy.
- Hero uses a full-bleed cinematic background design featuring `vlad_portrait_hero.png` scaled and animated with a slow zoom-in transition. Contrast and readability of the white left-aligned typography are guaranteed by a dual dark overlay gradient (linear on the left, radial towards the edges).
- Resolved scroll latency/input lag by removing the CSS `scroll-behavior: smooth` rule, avoiding the rendering loop conflict with Lenis scroll library.
- Restricted vertical section bloat by adjusting global section paddings to `clamp(44px, 5vw, 80px)` and capping the desktop `.service-showcase-panel` min-height at `480px` to fit the entire bento grid container into a single 1440x900 viewport.
- Services showcase now prioritizes real work visuals: screenshots fill their framed media area, mobile places the visual before the explanatory text, and the services background blends into the global grid with a softer glass fade.
- Cases include a hosted live-site example (`premium-visit-card.vercel.app`) with a local screenshot asset (`case_premium_visit_card.png`) alongside GitHub projects.
- Reviews use a centered PROFI.RU trust badge, 8 concise review cards with duplicated loop items, and a narrower carousel mask so comments disappear closer to the viewport edge.
- Reviews are now a static trust grid with 4 visible concise cards and a centered PROFI.RU proof badge. Avoid returning to an infinite carousel unless there is a strong content reason.
- Contacts include Telegram, email, and WhatsApp (`+7 952 104-98-10`) as equal glass contact pills.
- Copy direction updated toward personal-brand positioning: concise first-person engineering responsibility, real launch work, and practical service clarity instead of generic AI/product claims.
- Visible tech tags stay limited to 2-3 per case.
- Detailed stack remains hidden by default.

## Known Risks

- Google Fonts require network access; fallback fonts must remain acceptable.
- `js/main.js` and `js/main.bundle.js` are duplicated manually because there is no build step.
- Case images used by the page have WebP copies and `index.html` should prefer those copies. Keep PNG originals as source assets, but do not switch the page back to heavy PNGs without a quality reason.
- Some public repositories do not include polished marketing screenshots, so generated mockups may frame the product idea, but copy must stay tied to real repo names and avoid invented client metrics.

## QA Checklist

- Desktop `1440x900`: no horizontal overflow, hero CTA visible, system visual not covering text.
- Mobile `390x844`: no horizontal overflow, hero title readable, CTA visible, hero visual hidden or simplified.
- Console: no errors.
- Links: Telegram opens externally with `rel="noopener noreferrer"`, email uses `mailto:`.
- Accessibility: keyboard menu/details/focus behavior works.
- Reduced motion: non-essential motion disabled.
