import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { loadRemote } from '@module-federation/runtime';

type MfeMount = {
  mount: (container: HTMLElement) => () => void;
};

/**
 * Angular wrapper for the Vue MFE.
 * loadRemote() fetches the vue_app/App module from the manifest,
 * then calls its exported `mount(el)` — Vue lives entirely in the remote bundle.
 */
@Component({
  selector: 'app-vue-wrapper',
  standalone: true,
  template: `
    <div class="mfe-frame">
      <div class="mfe-frame__bar mfe-frame__bar--vue">
        <span class="mfe-frame__dot"></span>
        <span class="mfe-frame__label">vue-app · port 3001 · <em>@module-federation/vite</em></span>
      </div>
      <div class="mfe-frame__body" id="vue-mfe-host"></div>
    </div>
  `,
})
export class VueWrapperComponent implements OnInit, OnDestroy {
  private unmount?: () => void;

  constructor(private host: ElementRef<HTMLElement>) {}

  async ngOnInit() {
    const container = this.host.nativeElement.querySelector<HTMLElement>('#vue-mfe-host')!;

    try {
      const { mount } = (await loadRemote('vue_app/App')) as MfeMount;
      this.unmount = mount(container);
    } catch (e) {
      container.innerHTML = `
        <div class="mfe-error">
          <strong>⚠ vue-app remote not available</strong>
          <p>Start the Vue remote: <code>cd vue-app && npm run dev</code></p>
        </div>`;
    }
  }

  ngOnDestroy() {
    this.unmount?.();
  }
}
