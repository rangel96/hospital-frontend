import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../../../assets/css/pages/login-register-lock.css']
})
export class LoginComponent implements OnInit {

  auth2: any;

  public loginForm = this.fb.group({
    email: [localStorage.getItem('email') || 'test00@gmail.com', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}$')]],
    password: ['456123', Validators.required],
    rememberMe: [true],
  });

  constructor(private fb: FormBuilder,
              private auth: AuthService,
              private router: Router,
              private ngZone: NgZone) {  }

  ngOnInit(): void {
    this.renderButton();
  }

  fieldInvalid(fieldName: string): boolean {
    return this.loginForm.get(fieldName).invalid && this.loginForm.get(fieldName).touched;
  }

  login(): void {
    (this.loginForm.value.rememberMe)
      ? localStorage.setItem('email', this.loginForm.value.email)
      : localStorage.removeItem('email');

    (this.loginForm.invalid)
      ? this.messageError('Form Invalid')
      : this.auth.login(this.loginForm.value).subscribe(
        (response) => {
          (response.status)
            ? this.messageDone()
            : this.messageError(response.msg);
        }, err => console.warn(err.error));
  }

  /* ----- LOGIN GOOGLE ----- */
  renderButton(): void {
    gapi.signin2.render('my-signin2', {
      scope: 'profile email',
      width: 240,
      height: 50,
      longtitle: true,
      theme: 'dark',
    });
    this.startApp();
  }

  async startApp(): Promise<void> {
    await this.auth.googleInitiate();
    this.auth2 = this.auth.auth2;
    this.attachSignin(document.getElementById('my-signin2'));

    /*gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '642537752483-ubsg1bopl7vmm1j7q9rm0e23l8hlt90a.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
      });
      this.attachSignin(document.getElementById('my-signin2'));
    });*/
  }

  attachSignin(element): void {
    this.auth2.attachClickHandler(element, {},
      (googleUser) => {
        const id_token = googleUser.getAuthResponse().id_token;
        this.auth.loginGoogle(id_token).subscribe(
          (response) => {
            this.ngZone.run( () => {
              (response.status)
                ? this.messageDone()
                : this.messageError(response.msg);
            });
        });
      }, (err) => console.warn(err.error)
      );
  }
  /* ----- LOGIN GOOGLE END ----- */

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
      title: 'Success!',
      showConfirmButton: false,
      timer: 1000
    });
    this.router.navigateByUrl('/dashboard');
  }

}
