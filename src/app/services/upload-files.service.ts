import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { UsuarioService } from './usuario.service';
import { ResponseI } from '../models/response.model';


const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class UploadFilesService {

  constructor(private usuarioSvc: UsuarioService) { }


  async updateImage(file: File, type: 'usuarios' | 'hospitales' | 'medicos', id: string): Promise<any> {

    try {
      const url = `${baseUrl}/uploads/${type}/${id}`;
      const headers = { 'x-token': this.usuarioSvc.token };
      const body = new FormData();
      body.append('img', file);

      const response = await fetch(
        url, {
          method: 'PUT',
          headers,
          body
        }
      );
      const resp: ResponseI = await response.json();
      return (resp.status)
        ? resp.data
        : console.warn(resp.msg);

    } catch (err) {
      console.log(err);
      return false;
    }

  }


}
