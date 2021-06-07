import { UsuarioI } from './usuario.model';
import { HospitalI } from './hospital.model';

export interface ResponseI {
  status: boolean;
  msg: string;
  data?: UsuarioI | HospitalI;
  token?: string;
  items?: number;
  total?: number;
  errors?: any;
}
