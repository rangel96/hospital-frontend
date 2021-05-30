import { UsuarioI } from './usuario.model';

export interface ResponseI {
  status: boolean;
  msg: string;
  data?: UsuarioI;
  token?: string;
}
