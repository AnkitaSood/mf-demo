import {
  Component,
  Inject,
  signal,
  effect,
  PLATFORM_ID,
  OnDestroy,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { getGlobalCounter } from './shared-counter';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnDestroy {
  theme = signal<'dark' | 'light'>('dark');
  count = signal<number>(0);
  private unsubscribe: (() => void) | null = null;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      const savedTheme = localStorage.getItem('theme') as 'dark' | 'light';
      if (savedTheme) {
        this.theme.set(savedTheme);
      }

      effect(() => {
        const currentTheme = this.theme();
        document.documentElement.setAttribute('data-theme', currentTheme);
        localStorage.setItem('theme', currentTheme);
      });

      this.count.set(getGlobalCounter().get());
      this.unsubscribe = getGlobalCounter().subscribe((c) => this.count.set(c));
    }
  }

  ngOnDestroy() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  updateCount(amount: number) {
    const current = getGlobalCounter().get();
    getGlobalCounter().set(current + amount);
  }

  toggleTheme() {
    this.theme.update((t) => (t === 'dark' ? 'light' : 'dark'));
  }
}
