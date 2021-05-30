import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { UsuarioI } from '../models/usuario.model';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';
import { ResponseI } from '../models/response.model';


const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient,
              private router: Router,
              private auth: AuthService,
              private ngZone: NgZone) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get usuario(): UsuarioI {
    return this.auth.usuario;
  }

  update(usuario: UsuarioI): Observable<any> {
    const url = `${baseUrl}/usuarios/${this.usuario.uid}`;
    const headers = { 'x-token': this.token };
    const body = {...usuario, role: this.usuario.role, };

    return this.http.put(url, body, { headers });

  }


}
