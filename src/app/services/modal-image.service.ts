import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';


const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class ModalImageService {

  // tslint:disable-next-line:variable-name
  public _hideModal = true;
  public type: 'usuarios' | 'hospitales' | 'medicos';
  public img;
  public id;

  constructor() {
  }

  get modal(): boolean {
    return this._hideModal;
  }

  showModal(type: 'usuarios' | 'hospitales' | 'medicos', img: string, id: string): void {
    this._hideModal = false;
    this.type = type;
    this.id = id;

    (img.includes('https'))
      ? this.img = img
      : this.img = `${baseUrl}/uploads/${type}/${img}`;
  }

  hideModal(): boolean {
    return this._hideModal = true;
  }

}
