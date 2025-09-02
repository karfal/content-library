import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function emailValidator(regExp: RegExp): ValidatorFn | null {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null;
    }

    return regExp.test(control.value) ? null : { invalidEmail: true };
  };
}

export function passwordValidator(regExp: RegExp): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null;
    }

    return regExp.test(control.value) ? null : { invalidPassword: true };
  };
}
