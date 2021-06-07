import { environment } from '../../environments/environment';

const baseUrl = environment.baseUrl;

export class HospitalI {

  constructor(
    public hid?: string,
    public nombre?: string,
    public img?: string,
    public usuario?: HospitalUser,
  ) {  }

}


interface HospitalUser {
  uid: string;
  nombre: string;
  img?: string;
}

