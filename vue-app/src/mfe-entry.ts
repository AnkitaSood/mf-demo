/**
 * MFE entry point for the Angular shell.
 *
 * Exports `mount(container)` so the Angular wrapper component can lifecycle-manage
 * the Vue app without needing Vue in the shell bundle.
 */
import { createApp, type App as VueApp } from 'vue';
import App from './App.vue';

let app: VueApp | null = null;

export function mount(container: HTMLElement): () => void {
  app = createApp(App);
  app.mount(container);

  return () => unmount();
}

export function unmount(): void {
  app?.unmount();
  app = null;
}
