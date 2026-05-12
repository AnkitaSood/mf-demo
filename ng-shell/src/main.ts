import { init } from '@module-federation/runtime';
import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { appConfig } from './app/app.config';

// BYPASS React Fast Refresh preamble issue globally
(window as any).__vite_plugin_react_preamble_installed__ = true;
(window as any).$RefreshReg$ = () => {};
(window as any).$RefreshSig$ = () => (type: any) => type;

/**
 * Initialize Module Federation 2 runtime.
 *
 * WHY PROXIED PATHS:
 * In Vite dev mode, @module-federation/vite generates remoteEntry.js with
 * Vite-internal absolute paths (e.g. /node_modules/.vite/deps/...) that are
 * only valid on the remote's own Vite dev server. When loaded cross-origin
 * these paths resolve against the shell's origin and return 404.
 *
 * The proxy in proxy.conf.json forwards:
 *   /react-remote/*  →  http://localhost:3000/*
 *   /vue-remote/*    →  http://localhost:3001/*
 *
 * This makes both remotes appear same-origin to the shell's Vite dev server,
 * so all Vite-internal paths inside remoteEntry.js resolve correctly.
 *
 * In production set a proper publicPath in each remote's vite.config.ts
 * and point entry at the deployed remoteEntry.js URL directly.
 */
init({
  name: 'ng_shell',
  remotes: [
    {
      name: 'react_app',
      entry: 'http://localhost:3000/mf-manifest.json',
      type: 'manifest',
    },
    {
      name: 'vue_app',
      entry: 'http://localhost:3001/mf-manifest.json',
      type: 'manifest',
    },
  ],
  shared: {},
});

bootstrapApplication(App, appConfig).catch((err) => console.error(err));
