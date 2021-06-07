import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UsuarioService } from './usuario.service';
import { environment } from '../../environments/environment';
import { HospitalI } from '../models/hospital.model';


const baseUrl = `${environment.baseUrl}/hospitales`;

@Injectable({
  providedIn: 'root'
})
export class HospitalsService {

  constructor(private user: UsuarioService,
              private http: HttpClient) { }

  get headers(): any {
    return {
      headers: { 'x-token': this.user.token }
    };
  }


  getHospitals(desde: number = 0, items: number = 5): Observable<any> {
    const url = `${baseUrl}`;
    // const url = `${baseUrl}?desde=${desde}&items=${items}`;
    return this.http.get(url, this.headers);
  }

  createHospital(nombre: string): Observable<any> {
    return this.http.post(baseUrl, { nombre }, this.headers);
  }

  updateHospital(id: string, nombre: string): Observable<any> {
    const url = `${baseUrl}/${id}`;
    return this.http.put(url, { nombre }, this.headers);
  }

  deleteHospital(id: string): Observable<any> {
    const url = `${baseUrl}/${id}`;
    return this.http.delete(url, this.headers);
  }
}
