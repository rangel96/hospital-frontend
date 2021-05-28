import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { UsuarioI } from '../models/usuario.model';


declare const gapi: any;
const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public auth2: any;

  constructor(private http: HttpClient,
              private router: Router,
              private ngZone: NgZone) {
    this.googleInitiate();
  }

  register(body: UsuarioI): Observable<any> {
    const url = `${baseUrl}/usuarios`;
    return this.http.post(url, body).pipe(tap(
      (resp) => localStorage.setItem('token', resp.token)
    ));
  }

  login(body: UsuarioI): Observable<any> {
    const url = `${baseUrl}/auth/login`;
    return this.http.post(url, body).pipe(tap(
      (resp) => localStorage.setItem('token', resp.token)
    ));
  }

  googleInitiate(): Promise<void> {
    return new Promise((resolve => {
      gapi.load('auth2', () => {
        this.auth2 = gapi.auth2.init({
          client_id: '642537752483-ubsg1bopl7vmm1j7q9rm0e23l8hlt90a.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
        });
        resolve();
      });
    }));
  }

  loginGoogle(token: string): Observable<any> {
    const url = `${baseUrl}/auth/google`;
    return this.http.post(url, { token }).pipe(tap(
      (resp) => localStorage.setItem('token', resp.token)
    ));
  }

  validToken(): Observable<any> {
    const token = localStorage.getItem('token') || '';
    const url = `${baseUrl}/auth/renewToken`;
    const headers = { 'x-token': token };

    return this.http.get(url, { headers })
      .pipe(tap(
      (resp: any) => localStorage.setItem('token', resp.token)
    ),
      map( (resp) => resp.status),
      catchError( () => of(false))
    );
  }

  signOut(): void {
    localStorage.clear();
    this.auth2 = gapi.auth2.getAuthInstance();
    this.auth2.signOut().then( () => {
      this.ngZone.run(() => {
        this.router.navigateByUrl('/login');
      });
    });
  }


}
