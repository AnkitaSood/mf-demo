# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repo Overview

Three independent npm workspaces in a monorepo — no shared `node_modules`. Each app manages its own dependencies.

| App | Framework | Port | Role |
|-----|-----------|------|------|
| `ng-shell` | Angular 21 + esbuild | 4200 | Host (shell) |
| `react-app` | React 19 + Vite | 3000 | Remote |
| `vue-app` | Vue 3 + Vite | 3001 | Remote |

## Commands

### Start everything (from root)
```bash
npm run dev          # concurrently starts all three apps
```

### Start individually
```bash
# Remotes must start before the shell — shell reads their mf-manifest.json on load
cd react-app && npm run dev    # http://localhost:3000
cd vue-app   && npm run dev    # http://localhost:3001
cd ng-shell  && npm start      # http://localhost:4200
```

### Build
```bash
cd ng-shell  && npm run build
cd react-app && npm run build   # runs tsc -b && vite build
cd vue-app   && npm run build   # runs vue-tsc -b && vite build
```

### Lint (react-app only)
```bash
cd react-app && npm run lint
```

### Test (ng-shell only — uses Vitest)
```bash
cd ng-shell && npm test
```

### Install all dependencies
```bash
npm run install:all   # installs in ng-shell, react-app, vue-app sequentially
```

## Architecture

### Module Federation 2 — no webpack in the shell

`ng-shell` uses `@module-federation/runtime` as a pure JS runtime — it does **not** use webpack or any MF webpack plugin. The shell calls `init()` in `main.ts` with manifest URLs, then `loadRemote('react_app/App')` / `loadRemote('vue_app/App')` inside wrapper components.

Both remotes are Vite apps using `@module-federation/vite`. They generate a `mf-manifest.json` (enabled via `manifest: true` in `vite.config.ts`) which the shell's `init()` reads to discover entry points and shared dep metadata.

### Remote lifecycle contract

Every remote exposes exactly one entry point (`./App` → `src/mfe-entry.ts`) that exports:

```ts
mount(container: HTMLElement): () => void   // returns an unmount function
unmount(): void
```

The Angular wrapper components (`ng-shell/src/app/mfe/`) call `mount()` in `ngOnInit` and the returned cleanup in `ngOnDestroy`. React and Vue never touch the shell's bundle.

### Dev proxy — why it exists

In Vite dev mode, `remoteEntry.js` contains absolute paths that are only valid on the remote's own origin. When loaded cross-origin they resolve against the shell's origin and 404. `ng-shell/proxy.conf.json` proxies `/react-remote/*` → `localhost:3000` and `/vue-remote/*` → `localhost:3001`, making both remotes appear same-origin to Angular's dev server. **In production**, set a proper `publicPath` in each remote's `vite.config.ts` and point the shell's `init()` entry directly at the deployed manifest URL.

### Cross-framework shared state

`shared-counter.ts` is copy-pasted identically into all three apps. Each framework bundle gets its own copy of the module, but they all delegate to `window.__GLOBAL_COUNTER__` — a single subscriber/publisher object initialized once on `window`. This is the pattern for any state that needs to survive framework boundaries without adding a shared runtime dep.

### ng-shell Angular conventions

See `ng-shell/.claude/CLAUDE.md` for Angular-specific rules (signals, standalone components, `input()`/`output()` functions, OnPush, native control flow). Key points:
- `standalone: true` is the **default** in Angular 21 — do **not** set it explicitly
- Use `inject()` instead of constructor injection
- Use `@if` / `@for` / `@switch` instead of structural directives

### React Fast Refresh shim

`ng-shell/src/main.ts` installs three globals (`__vite_plugin_react_preamble_installed__`, `$RefreshReg$`, `$RefreshSig$`) before bootstrapping Angular. This bypasses a Vite React Fast Refresh guard that fires when `@vitejs/plugin-react` runs inside a federated remote loaded into a non-Vite host page.
