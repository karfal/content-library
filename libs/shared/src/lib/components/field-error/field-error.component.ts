import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, HostBinding, inject, Input, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AbstractControl } from '@angular/forms';

/**
 * FieldErrorComponent displays basic form control errors.
 */
@Component({
  selector: 'field-error',
  templateUrl: './field-error.component.html',
  styleUrl: './field-error.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export class FieldErrorComponent implements OnInit {

  private destroyRef = inject(DestroyRef);
  private cd = inject(ChangeDetectorRef);

  /**
   * Add class .show if control has an error.
   */
  @HostBinding('class.show')
  get isActive(): boolean {
    return !!(this.control?.touched && this.control?.invalid);
  }

  @Input()
  control!: AbstractControl | null;

  ngOnInit() {
    if (this.control) {
      this.control.statusChanges.pipe(
        takeUntilDestroyed(this.destroyRef)
      ).subscribe({
        next: () => this.cd.markForCheck()
      });
    }
  }

  getErrorMessage(control: AbstractControl | null): string | null {
    if (!control || !control.errors) {
      return null;
    }

    const errorMessages: Record<string, string> = {
      required: 'This field is required.',
      invalidEmail: 'Please enter a valid email.',
      invalidPassword: 'Password must include one letter and special character.'
    };

    const key = Object.keys(control.errors)[0];
    return errorMessages[key] || null;
  }
}
