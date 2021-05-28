import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ValidatorService } from '../../services/validator.service';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../../../assets/css/pages/login-register-lock.css']
})
export class RegisterComponent {

  /* -----  ----- */
  public registerForm = this.fb.group({
    nombre: ['Eric Rangel', Validators.required],
    email: ['dreamereric@gmail.com', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}$')]],
    password: ['456123', Validators.required],
    pass: ['456123', Validators.required],
    checkbox: [true, Validators.requiredTrue],
  }, {
    validators: this.validator.ValidarPassword('password', 'pass')
  });

  constructor(private fb: FormBuilder,
              private validator: ValidatorService,
              private auth: AuthService,
              private router: Router) { }


  register(): void {
    (this.registerForm.invalid)
      ? this.messageError('Form Invalid')
      : this.auth.register(this.registerForm.value).subscribe(
          (response) => {
            (response.status)
              ? this.messageDone()
              : this.messageError(response.msg);
          }, err => console.warn(err.error));
  }

  fieldInvalid(fieldName: string): boolean {
    return this.registerForm.get(fieldName).invalid && this.registerForm.get(fieldName).touched;
  }

  /* ----- SweetAlert Messages ----- */
  messageError(message: string): void {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: message,
    });
  }

  messageDone(): void {
    Swal.fire({
      icon: 'success',
      title: 'Saved!',
      showConfirmButton: false,
      timer: 1000
    });

    this.router.navigateByUrl('/dashboard');
    // this.router.navigateByUrl('/dashboard').then(r => console.log(r));
  }

}
