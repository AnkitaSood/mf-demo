/**
 * MFE entry point for the Angular shell.
 *
 * Exports `mount(container)` and `unmount()` so the Angular wrapper component
 * can lifecycle-manage the React app without needing React in the shell bundle.
 */
import React from 'react';
import { createRoot, type Root } from 'react-dom/client';
import App from './App';

let root: Root | null = null;

export function mount(container: HTMLElement): () => void {
  root = createRoot(container);
  root.render(React.createElement(React.StrictMode, null, React.createElement(App)));

  return () => unmount();
}

export function unmount(): void {
  root?.unmount();
  root = null;
}
