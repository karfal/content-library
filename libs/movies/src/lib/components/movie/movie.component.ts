import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { IMovie } from '../../models/movie.model';

/**
 * MovieComponent receives an IMovie instance.
 */
@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.scss'],
  host: { class: 'app-movie' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  standalone: true
})
export class MovieComponent {

  @Input()
  movie!: IMovie;

  imageError(event: Event) {
    (event.target as HTMLImageElement).src = 'assets/images/video-solid-full.svg';
    (event.target as HTMLImageElement).classList.add('default');
  }
}
