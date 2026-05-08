import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'react',
    loadComponent: () =>
      import('./mfe/react-wrapper.component').then((m) => m.ReactWrapperComponent),
  },
  {
    path: 'vue',
    loadComponent: () =>
      import('./mfe/vue-wrapper.component').then((m) => m.VueWrapperComponent),
  },
];
