import { ChangeDetectionStrategy, Component, HostBinding, OnInit } from '@angular/core';

import { IMovie } from '../../models/movie.model';
import { MovieComponent } from '../movie/movie.component';

/**
 * LastVisitedComponent shows the last movies visited from the details page.
 */
@Component({
  selector: 'app-last-visited',
  templateUrl: './last-visited.component.html',
  styleUrls: ['./last-visited.scss'],
  host: { class: 'app-last-visited' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MovieComponent],
  standalone: true
})
export class LastVisitedComponent implements OnInit {

  @HostBinding('class.hide')
  get isEmpty(): boolean {
    return !this.movies.length;
  }

  movies: IMovie[] = [];

  ngOnInit() {
    this.movies = JSON.parse(localStorage.getItem('lastVisited') || '[]');
  }
}
