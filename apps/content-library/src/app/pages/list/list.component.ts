import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, Signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { IMovie, LastVisitedComponent, MovieComponent, MovieService } from '@libs/movies';
import { SearchComponent } from '@libs/shared';

/**
 * ListComponent page shows a list of all instances IMovie.
 */
@Component({
  templateUrl: './list.component.html',
  styleUrls: ['./list.scss'],
  host: { class: 'app-list' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, MovieComponent, SearchComponent, LastVisitedComponent],
  standalone: true
})
export class ListComponent {

  private movieService = inject(MovieService);
  private route = inject(ActivatedRoute);
  private cd = inject(ChangeDetectorRef);

  movies: IMovie[] = [];
  pageTitle: string;

  genres: Signal<string[]>;
  error: Signal<boolean>;

  /**
   * Initialize variables and get movie list from resolver.
   */
  constructor() {
    this.pageTitle = String(this.route.snapshot.routeConfig?.title) || 'list';
    this.genres = this.movieService.genres;
    this.error = this.movieService.errorSignal;

    this.route.data.subscribe({
      next: ({ resolve }) => {
        this.movies = resolve;
        this.cd.markForCheck();
      }
    });
  }
}
