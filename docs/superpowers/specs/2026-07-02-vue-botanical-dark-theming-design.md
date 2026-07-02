# Vue App — Botanical Dark Theming

**Date:** 2026-07-02  
**Scope:** `vue-app/src/App.vue`, `vue-app/src/style.css`  
**Goal:** Give the standalone Vue micro-frontend (port 3001) a distinctive visual identity while ensuring it also looks correct when embedded in the Angular shell (port 4200).

---

## Context

The Vue app currently has no self-contained color tokens. All `--color-*` variables are defined in `ng-shell/src/styles.css`. When running standalone, those variables are undefined and the app renders incorrectly. The redesign must be fully self-sufficient.

---

## Design Direction — Botanical Dark

The Vue app gets its own deep forest-green-black atmosphere. Vue's emerald green doesn't sit *on* the dark — it *emerges* from it. The result is a living environment that reads as unmistakably Vue without referencing or conflicting with the Angular shell's neutral-dark palette.

---

## Color Tokens

All tokens are defined on `.va-root` (not `:root`), so they:
- Cascade to all child elements within the component
- Do NOT leak into the Angular shell when federated
- Work correctly in both standalone and embedded contexts

| Token | Value | Role |
|---|---|---|
| `--va-bg` | `#050d08` | Root/page background |
| `--va-surface` | `#0d1f13` | Card surfaces |
| `--va-surface-2` | `#142a19` | Input backgrounds, secondary surfaces |
| `--va-border` | `#1e3d27` | Default borders |
| `--va-border-hover` | `#2d5a3a` | Hovered/active borders |
| `--va-text` | `#e8f5ed` | Primary text (warm white with green tint) |
| `--va-text-muted` | `#7aab8a` | Secondary/muted text |
| `--va-accent` | `#41b883` | Vue green (primary accent) |
| `--va-accent-glow` | `rgba(65, 184, 131, 0.2)` | Ambient glow color |
| `--va-accent-bright` | `#5de8a0` | Brighter accent for hover/active |

---

## Files Changed

### `vue-app/src/style.css`

- Remove unused bridge variables (`--text`, `--bg`, `--border`, `--accent`, etc.) — these reference `--color-*` vars that are never defined in this file
- Remove unused scaffold CSS (`#app`, `#center`, `#next-steps`, `.hero`, `.counter`, `.ticks`, `#docs`, `#spacer`) — none of these IDs/classes exist in the current `App.vue` markup
- Set `body` background to `#050d08` for correct standalone page rendering
- Keep: font stacks, `text-rendering` optimizations, `color-scheme`, `h1/h2/p/code` base resets

### `vue-app/src/App.vue` — `<style scoped>`

**Token definitions (added to `.va-root`):**
- Define all `--va-*` tokens listed above directly on `.va-root`
- Change `background: transparent` → `background: var(--va-bg)`
- Replace every `var(--color-vue)` → `var(--va-accent)`, `var(--color-vue-glow)` → `var(--va-accent-glow)`, `var(--color-text)` → `var(--va-text)`, `var(--color-text-muted)` → `var(--va-text-muted)`, `var(--color-surface)` → `var(--va-surface)`, `var(--color-surface-2)` → `var(--va-surface-2)`, `var(--color-border)` → `var(--va-border)`, `var(--color-angular-glow)` → `rgba(248, 113, 113, 0.15)` (inline, todo remove hover)

**Counter value:**
- `font-size`: `2.5rem` → `4rem`
- Add `text-shadow: 0 0 24px var(--va-accent-glow)` — subtle glow

**Cards:**
- Add `position: relative; overflow: hidden` (already has position)
- Add `::before` pseudo-element: `radial-gradient(ellipse at top left, var(--va-accent-glow), transparent 60%)`, `opacity: 0`, transitions to `opacity: 1` on `.va-card:hover`
- Hover `border-color`: `var(--va-border-hover)` (was `--color-vue`)
- Hover `box-shadow`: `0 4px 24px var(--va-accent-glow)` (keep existing)

**Ghost buttons (±):**
- Hover: `background: var(--va-accent-glow)`, `border-color: var(--va-accent)`, `color: var(--va-accent-bright)`

**Primary "Add" button:**
- Base: `background: var(--va-accent-glow)`, `border-color: var(--va-accent)`, `color: var(--va-accent-bright)`
- Hover: adds `box-shadow: 0 0 12px var(--va-accent-glow)`

**Input focus:**
- `border-color: var(--va-accent)` (unchanged)
- Add `box-shadow: 0 0 0 3px var(--va-accent-glow)` on `:focus` — inner ring glow instead of outline

**Todo remove button hover:**
- `color: #f87171` (warm red), `background: rgba(248, 113, 113, 0.15)` — delete feels dangerous against the green environment

---

## What Does NOT Change

- HTML markup in `<template>` — no structural changes
- Component logic (`<script setup>`) — no changes
- `vite.config.ts`, `mfe-entry.ts`, `shared-counter.ts` — no changes
- Font imports — Inter and Inter Tight already loaded in the shell; kept in vue-app for standalone

---

## Spec Self-Review

- No TBDs or incomplete sections
- Token names are consistent throughout (all `--va-*`)
- The `var(--color-angular-glow)` reference in `.va-todo__remove:hover` is the only `--color-*` reference that needed a manual inline replacement (confirmed inline value above)
- Scope is focused: 2 files, no structural/logic changes
- No ambiguous requirements — each UI element has an explicit before/after

---

## Success Criteria

1. `localhost:3001` renders with the forest-green-black background and correct colors without any `--color-*` variables defined
2. `localhost:4200` Vue tab shows the same Botanical Dark aesthetic inside the shell frame
3. No `--color-*` variable references remain in `App.vue` or `style.css`
4. Counter value is visually dominant and glows
5. Cards have the radial gradient overlay on hover
