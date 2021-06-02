import { UsuarioI } from './usuario.model';

export interface ResponseI {
  status: boolean;
  msg: string;
  data?: UsuarioI | UsuarioI[];
  token?: string;
  items?: number;
  total?: number;
}
