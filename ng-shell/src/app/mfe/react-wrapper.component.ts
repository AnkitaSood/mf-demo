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
 * Angular wrapper for the React MFE.
 * loadRemote() fetches the react_app/App module from the manifest,
 * then calls its exported `mount(el)` — React lives entirely in the remote bundle.
 */
@Component({
  selector: 'app-react-wrapper',
  standalone: true,
  template: `
    <div class="mfe-frame">
      <div class="mfe-frame__bar mfe-frame__bar--react">
        <span class="mfe-frame__dot"></span>
        <span class="mfe-frame__label">react-app · port 3000 · <em>@module-federation/vite</em></span>
      </div>
      <div class="mfe-frame__body" id="react-mfe-host"></div>
    </div>
  `,
})
export class ReactWrapperComponent implements OnInit, OnDestroy {
  private unmount?: () => void;

  constructor(private host: ElementRef<HTMLElement>) {}

  async ngOnInit() {
    const container = this.host.nativeElement.querySelector<HTMLElement>('#react-mfe-host')!;

    try {
      const { mount } = (await loadRemote('react_app/App')) as MfeMount;
      this.unmount = mount(container);
    } catch (e) {
      container.innerHTML = `
        <div class="mfe-error">
          <strong>⚠ react-app remote not available</strong>
          <p>Start the React remote: <code>cd react-app && npm run dev</code></p>
        </div>`;
    }
  }

  ngOnDestroy() {
    this.unmount?.();
  }
}
