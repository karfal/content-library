import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ParamMap } from '@angular/router';

import { AbstractService, ENVIRONMENT, IEnvironmentModel } from '@libs/shared';

import { catchError, map, Observable, of, shareReplay } from 'rxjs';

import { IMovie } from '../models/movie.model';

@Injectable({
  providedIn: 'root'
})
export class MovieService implements AbstractService<IMovie> {

  private http = inject(HttpClient);
  private environment = inject<IEnvironmentModel>(ENVIRONMENT);

  //this is for ssr
  private baseUrl = typeof window !== 'undefined' ? '' : this.environment.url;
  private readonly dataURL = `${this.baseUrl}/assets/movie.mock-data.json`;

  private allMovies$?: Observable<IMovie[]>;

  private errorLoadingMovies = signal(false);
  readonly errorSignal = this.errorLoadingMovies.asReadonly();

  private moviesSignal = toSignal(this.getAll$(), { initialValue: [] });
  readonly genres = computed(() => {
    const allGenres = this.moviesSignal().flatMap((movie: IMovie) => movie.genres);
    return allGenres.filter((g, i, arr) => arr.indexOf(g) === i).sort();
  });

  /**
   * Return movie instances filtered by params.
   * @param paramMap{ParamMap}
   */
  search$(paramMap: ParamMap): Observable<IMovie[]> {
    return this.getAll$().pipe(
      map((movies: IMovie[]) => {
        const searchTerm = paramMap.get('searchTerm')?.trim().toLowerCase() || '';
        const selectedGenres = paramMap.getAll('list');

        return movies.filter((movie: IMovie) => {
          const matchesSearch = movie.title.toLowerCase().includes(searchTerm);
          const matchesGenres = selectedGenres.length ? movie.genres.some(g => selectedGenres.includes(g)) : true;

          return matchesSearch && matchesGenres;
        });
      })
    );
  }

  /**
   * Return one movie instance.
   * Return dummy object if error is encountered.
   * @param slug{string}
   */
  get$(slug: string): Observable<IMovie> {
    const dummyMovie: IMovie = {
      budget: 0, genres: [], id: '', image: { title: '', url: '' }, popularity: '', released: '', runtime: '', slug: '', title: ''
    };

    return this.getAll$().pipe(
      map((movies: IMovie[]) => movies.find(i => i.slug.toLowerCase() === slug.toLowerCase()) ?? dummyMovie),
      catchError(error => {
        console.error('Error getting movie: ', error);
        return of(dummyMovie);
      })
    );
  }

  /**
   * Return all movie instances.
   * Return empty array if error is encountered.
   */
  getAll$(): Observable<IMovie[]> {
    if (!this.allMovies$) {
      this.allMovies$ = this.http.get<IMovie[]>(this.dataURL).pipe(
        shareReplay(1),
        catchError(error => {
          console.error('Error getting movies: ', error);
          this.errorLoadingMovies.set(true);
          return of([]);
        })
      );
    }

    return this.allMovies$;
  }
}
