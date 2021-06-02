import { Injectable } from '@angular/core';
import { UsuarioService } from './usuario.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UsuarioI } from '../models/usuario.model';


const baseUrl = `${environment.baseUrl}/usuarios`;

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private user: UsuarioService,
              private http: HttpClient) { }

  get headers(): any {
    return {
      headers: { 'x-token': this.user.token }
    };
  }


  getUsuarios(desde: number = 0, items: number = 5): Observable<any> {
    const url = `${baseUrl}?desde=${desde}&items=${items}`;
    return this.http.get(url, this.headers).pipe(map(
      (resp: any) => {
        const usuarios = resp.data.map(
          user => new UsuarioI(user.nombre, user.email, user.password, user.img, user.google, user.role, user.uid)
        );

        return {
          ...resp,
          data: usuarios
        };
      }
    ));
  }

  getIdUsuario(): Observable<any> {
    return ;
  }

  updateUsuario(usuario: UsuarioI): Observable<any> {
    const url = `${baseUrl}/${usuario.uid}`;
    return this.http.put(url, usuario, this.headers);
  }

  deleteUsuario(id: string): Observable<any> {
    const url = `${baseUrl}/${id}`;
    return this.http.delete(url, this.headers);
  }

}
