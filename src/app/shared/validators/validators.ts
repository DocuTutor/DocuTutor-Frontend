import { AbstractControl, ValidationErrors, ValidatorFn, FormGroup } from '@angular/forms';

/**
 * Email Validator
 *
 * Validates that the control value is a valid email format.
 *
 * @example
 * ```typescript
 * email: new FormControl('', [emailValidator()])
 * ```
 */
export function emailValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(control.value) ? null : { invalidEmail: true };
  };
}

export function minLengthValidator(minLength: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null;
    }

    return control.value.length >= minLength ? null : { minLengthError: { requiredLength: minLength, actualLength: control.value.length } };
  };
}


export function matchFieldsValidator(field1: string, field2: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!(control instanceof FormGroup)) {
      return null;
    }

    const value1 = control.get(field1)?.value;
    const value2 = control.get(field2)?.value;

    return value1 === value2 ? null : { fieldsNotMatch: true };
  };
}

export function urlValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null;
    }

    try {
      new URL(control.value);
      return null;
    } catch {
      return { invalidUrl: true };
    }
  };
}


export function patternValidator(pattern: RegExp, errorKey: string = 'patternError'): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null;
    }

    return pattern.test(control.value) ? null : { [errorKey]: true };
  };
}


export function requiredValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value || (typeof control.value === 'string' && !control.value.trim())) {
      return { required: true };
    }

    return null;
  };
}
