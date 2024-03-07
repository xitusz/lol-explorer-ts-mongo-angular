import { AbstractControl, ValidatorFn } from '@angular/forms';

export default class Validation {
  static matchPassword(controlPassword: string, controlConfirmPassword: string): ValidatorFn {
    return (controls: AbstractControl) => {
      const password = controls.get(controlPassword)?.value;
      const confirmPassword = controls.get(controlConfirmPassword)?.value;

      if (password !== confirmPassword) {
        controls.get(controlConfirmPassword)?.setErrors({ matching: true });
        return { matching: true };
      } else {
        return null;
      }
    };
  }
}
