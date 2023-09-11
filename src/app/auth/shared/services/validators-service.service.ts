import { Injectable } from '@angular/core';
import { FormGroup, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {

  public passwordValidator(password: string, confirm_password: string) {

    return (formGroup: FormGroup): ValidationErrors | null => {
      const pass1 = formGroup.get(password)?.value;
      const pass2 = formGroup.get(confirm_password)?.value;

      if (pass1 !== pass2) {
        formGroup.get(confirm_password)?.setErrors({ notEqual: true });
        return { notEqual: true }
      }

      formGroup.get(confirm_password)?.setErrors(null);
      return null;
    }

  }

  constructor() { }
}
