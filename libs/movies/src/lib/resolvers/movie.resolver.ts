import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';

import { Observable } from 'rxjs';

import { IMovie } from '../models/movie.model';
import { MovieService } from '../services/movie.service';

import { searchAndGetResolveFn } from './common.resolver';

/**
 * Return a filtered list from params of movie instances or 1 movie instance.
 */
export const searchAndGetMovieResolver = searchAndGetResolveFn<IMovie>(MovieService);

/**
 * Return all movies instances.
 */
export const getAllMovieResolver: ResolveFn<IMovie[]> = (): Observable<IMovie[]> => {
  return inject(MovieService).getAll$();
};
