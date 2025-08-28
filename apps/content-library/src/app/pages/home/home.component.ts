import { ChangeDetectionStrategy, Component, inject, Signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMovie, LastVisitedComponent, MovieComponent, MovieService } from '@libs/movies';

import { map } from 'rxjs';

/**
 * HomeComponent page shows a limited list of instances IMovie.
 */
@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.scss'],
  host: { class: 'app-home' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MovieComponent, LastVisitedComponent],
  standalone: true
})
export class HomeComponent {

  private route = inject(ActivatedRoute);
  private movieService = inject(MovieService);

  pageTitle: string;
  movies: IMovie[] = [];

  error: Signal<boolean>;

  /**
   * Initialize variables and get movie list from resolver and show most popular.
   */
  constructor() {
    this.pageTitle = String(this.route.snapshot.routeConfig?.title) || 'home';
    this.error = this.movieService.errorSignal;

    this.route.data.pipe(
      map(({ resolve }) => resolve.sort((a: IMovie, b: IMovie) => Number(b.popularity) - Number(a.popularity)).slice(0, 10))
    ).subscribe({
      next: (data: IMovie[]) => this.movies = data
    });
  }
}
