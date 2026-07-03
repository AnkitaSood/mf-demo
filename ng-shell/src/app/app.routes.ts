import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () =>
      import('./home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'react',
    children: [
      {
        path: '**',
        loadComponent: () =>
          import('./mfe/react-wrapper.component').then((m) => m.ReactWrapperComponent),
      },
    ],
  },
  {
    path: 'vue',
    children: [
      {
        path: '**',
        loadComponent: () =>
          import('./mfe/vue-wrapper.component').then((m) => m.VueWrapperComponent),
      },
    ],
  },
];
