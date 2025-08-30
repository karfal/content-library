import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

/**
 * ErrorComponent page for handling common http errors
 */
@Component({
  templateUrl: './error.component.html',
  styleUrls: ['./error.scss'],
  host: { class: 'app-error' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  standalone: true
})
export class ErrorComponent {

  private router = inject(Router);

  errorStatus: number;

  constructor() {
    this.errorStatus = this.router.getCurrentNavigation()?.extras?.state?.['status'];
  }
}
