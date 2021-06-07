import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { UsuarioService } from './usuario.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MedicoI } from '../models/medico.model';
import { map } from 'rxjs/operators';
import { ResponseI } from '../models/response.model';


const baseUrl = `${environment.baseUrl}/medicos`;

@Injectable({
  providedIn: 'root'
})
export class MedicosService {

  constructor(private user: UsuarioService,
              private http: HttpClient) { }

  get headers(): any {
    return {
      headers: { 'x-token': this.user.token }
    };
  }


  getMedicos(desde: number = 0, items: number = 5): Observable<any> {
    const url = `${baseUrl}`;
    // const url = `${baseUrl}?desde=${desde}&items=${items}`;
    return this.http.get(url, this.headers);
  }

  getMedico(mid: string): Observable<any> {
    const url = `${baseUrl}/${mid}`;
    return this.http.get(url, this.headers);
  }

  createMedico(medico: MedicoI): Observable<any> {
    return this.http.post(baseUrl, medico, this.headers);
  }

  updateMedico(medico: MedicoI): Observable<any> {
    const url = `${baseUrl}/${medico.mid}`;
    return this.http.put(url, medico, this.headers);
  }

  deleteMedico(id: string): Observable<any> {
    const url = `${baseUrl}/${id}`;
    return this.http.delete(url, this.headers);
  }

}
