import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, PLATFORM_ID, Signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMovie, LastVisitedComponent, MovieService } from '@libs/movies';

/**
 * DetailComponent page shows the details of an instance IMovie.
 */
@Component({
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.scss'],
  host: { class: 'app-details' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, LastVisitedComponent],
  standalone: true
})
export class DetailComponent {

  private route = inject(ActivatedRoute);
  private movieService = inject(MovieService);
  private platformId = inject(PLATFORM_ID);

  pageTitle: string;
  movie!: IMovie;

  error: Signal<boolean>;

  /**
   * Initialize variables and get movie from resolver.
   */
  constructor() {
    this.pageTitle = String(this.route.snapshot.routeConfig?.title) || 'details';
    this.error = this.movieService.errorSignal;

    this.route.data.subscribe({
      next: ({ resolve }) => {
        this.movie = resolve;
        this.updateLastVisited(resolve);
      }
    });
  }

  imageError(event: Event) {
    (event.target as HTMLImageElement).src = 'assets/images/video-solid-full.svg';
  }

  /**
   * Save movie object to local storage.
   */
  private updateLastVisited(movie: IMovie) {
    if (isPlatformBrowser(this.platformId)) {
      if (movie.id && movie.title) {
        const storage = JSON.parse(localStorage.getItem('lastVisited') || '[]') as IMovie[];
        const filtered = storage.filter((m: IMovie) => m.slug !== movie.slug);
        filtered.unshift(movie);

        const movieList = filtered.slice(0, 5);
        localStorage.setItem('lastVisited', JSON.stringify(movieList));
      }
    }
  }
}
