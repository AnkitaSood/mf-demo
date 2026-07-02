import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div class="home">
      <div class="home__hero">
        <h1 class="home__title">Module Federation Demo</h1>
        <p class="home__subtitle">
          An Angular 21 shell hosting React and Vue micro-frontends via Native Federation
        </p>
      </div>

      <div class="home__cards">
        <a routerLink="/react" class="home__card home__card--react" id="card-react">
          <span class="home__card-icon">⚛</span>
          <div class="home__card-content">
            <h2>React App</h2>
            <p>Vite + React 19 micro-frontend federated into this Angular shell</p>
          </div>
          <span class="home__card-arrow">→</span>
        </a>

        <a routerLink="/vue" class="home__card home__card--vue" id="card-vue">
          <span class="home__card-icon">💚</span>
          <div class="home__card-content">
            <h2>Vue App</h2>
            <p>Vite + Vue 3 micro-frontend federated into this Angular shell</p>
          </div>
          <span class="home__card-arrow">→</span>
        </a>
      </div>

      <div class="home__tech">
        <h3>Tech Stack</h3>
        <ul class="home__tech-list">
          <li><span class="badge badge--angular">Angular 21</span> Shell (Host)</li>
          <li><span class="badge badge--react">React 19</span> Micro-Frontend (Remote)</li>
          <li><span class="badge badge--vue">Vue 3</span> Micro-Frontend (Remote)</li>
          <li>
            <span class="badge badge--federation">Native Federation</span> Module orchestration
          </li>
        </ul>
      </div>
    </div>
  `,
})
export class HomeComponent {}
