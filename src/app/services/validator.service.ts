import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {

  constructor() { }

  ValidarPassword(pass1: string, pass2: string): (formGroup: FormGroup) => void {
    return (formGroup: FormGroup) => {
      const pass1Control = formGroup.controls[pass1];
      const pass2Control = formGroup.controls[pass2];

      (pass1Control.value === pass2Control.value)
        ? pass2Control.setErrors(null)
        : pass2Control.setErrors({ noSonIguales: true });

    };
  }

}
