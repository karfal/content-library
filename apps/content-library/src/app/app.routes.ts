import { Routes } from '@angular/router';

import { getAllMovieResolver, searchAndGetMovieResolver } from '@libs/movies';

export const ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    title: 'home',
    resolve: {
      resolve: getAllMovieResolver
    },
    loadComponent: () => import('./pages/home/home.component').then(p => p.HomeComponent)
  },
  {
    path: 'list',
    title: 'movie list',
    resolve: {
      resolve: searchAndGetMovieResolver
    },
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
    loadComponent: () => import('./pages/list/list.component').then(p => p.ListComponent)
  },
  {
    path: 'list/:slug',
    title: 'movie details',
    resolve: {
      resolve: searchAndGetMovieResolver
    },
    loadComponent: () => import('./pages/detail/detail.component').then(p => p.DetailComponent)
  },
  {
    path: 'registration',
    title: 'user registration',
    loadComponent: () => import('./pages/registration/registration.component').then(p => p.RegistrationComponent)
  },
  {
    path: '**',
    loadComponent: () => import('./pages/error/error.component').then(p => p.ErrorComponent)
  }
];
