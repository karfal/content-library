import { ChangeDetectionStrategy, Component, inject, Signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { MovieService } from '@libs/movies';
import { FieldErrorComponent } from '@libs/shared';

import { emailValidator, passwordValidator } from '../../core/validators/validator';

@Component({
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.scss'],
  host: { class: 'app-registration' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, FieldErrorComponent],
  standalone: true
})
export class RegistrationComponent {

  private formBuilder = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private movieService = inject(MovieService);

  formGroup: FormGroup;
  pageTitle: string;
  genres: Signal<string[]>;

  constructor() {
    this.pageTitle = String(this.route.snapshot.routeConfig?.title) || 'registration';
    this.genres = this.movieService.genres;

    this.formGroup = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      genres: ['', [Validators.required]],
      email: ['', [Validators.required, emailValidator(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)]],
      password: ['', [Validators.required, passwordValidator(/^(?=.*[a-zA-Z])(?=.*[\W_]).{8,}$/)]]
    });
  }
}
