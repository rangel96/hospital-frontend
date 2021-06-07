import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { UsuarioI } from '../models/usuario.model';
import { MenuItems } from '../models/menu-items';


declare const gapi: any;
const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public auth2: any;
  public usuario: UsuarioI;

  constructor(private http: HttpClient,
              private router: Router,
              private ngZone: NgZone)
  {
    this.googleInitiate();
  }

  private saveLocalStorage(token: string, menu: MenuItems): void {
    localStorage.setItem('token', token);
    localStorage.setItem('menu', JSON.stringify(menu));
  }

  register(body: UsuarioI): Observable<any> {
    const url = `${baseUrl}/usuarios`;
    return this.http.post(url, body).pipe(tap(
      (resp) => this.saveLocalStorage(resp.token, resp.menu)
    ));
  }

  login(body: UsuarioI): Observable<any> {
    const url = `${baseUrl}/auth/login`;
    return this.http.post(url, body).pipe(tap(
      (resp) => this.saveLocalStorage(resp.token, resp.menu)
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
      (resp) => this.saveLocalStorage(resp.token, resp.menu)
    ));
  }

  validToken(): Observable<any> {
    const token = localStorage.getItem('token') || '';
    const url = `${baseUrl}/auth/renewToken`;
    const headers = { 'x-token': token };

    return this.http.get(url, { headers })
      .pipe(map(
      (resp: any) => {
        const { nombre, email, password, img, google, role, uid } = resp.data;
        this.usuario = new UsuarioI(nombre, email, password, img, google, role, uid);
        this.saveLocalStorage(resp.token, resp.menu);
        return resp.status;
      }
    ),
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
