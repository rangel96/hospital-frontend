import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { UsuarioService } from './usuario.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { UsuarioI } from '../models/usuario.model';
import { HospitalI } from '../models/hospital.model';


const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private user: UsuarioService, private http: HttpClient) { }

  private get headers(): any {
    return {
      headers: { 'x-token': this.user.token }
    };
  }

  private transform(type: 'usuarios' | 'hospitales' | 'medicos', result: any): UsuarioI[] | HospitalI[] {
/*    return result.map(
      user => new UsuarioI(user.nombre, user.email, user.password, user.img, user.google, user.role, user.uid)
    );*/

    /*switch (type) {
      case 'usuarios': {
        return result.map(
          user => new UsuarioI(user.nombre, user.email, user.password, user.img, user.google, user.role, user.uid)
        );
      }
      case 'hospitales': {
        // Statements
        break;
      }
      case 'medicos': {
        // Statements
        break;
      }
      default: {
        // Statements
        break;
      }
    }*/

    return (type === 'usuarios')
      ? result.map(
        user => new UsuarioI(user.nombre, user.email, user.password, user.img, user.google, user.role, user.uid)
      )
      : result;
  }

  search(type: 'usuarios' | 'hospitales' | 'medicos', words: string): Observable<any> {
    const url = `${baseUrl}/busquedas/coleccion/${type}/${words}`;
    return this.http.get(url, this.headers)
      .pipe(map(
        resp => resp = {
            ...resp,
            data: this.transform(type, resp.data)
          }
      ));
  }

}
