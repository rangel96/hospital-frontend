import { environment } from '../../environments/environment';

export class MedicoI {

  constructor(
    public mid: string,
    public nombre: string,
    public hid?: string,
    public img?: string,
    public hospital?: MedicoHospital,
    public usuario?: MedicoUser,
  ) {  }

}


interface MedicoHospital {
  id?: string;
  hid?: string;
  nombre?: string;
  img?: string;
}


interface MedicoUser {
  id?: string;
  hid?: string;
  nombre?: string;
  img?: string;
}
