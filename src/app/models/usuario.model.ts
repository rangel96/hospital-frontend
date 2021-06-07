import { environment } from '../../environments/environment';

const baseUrl = environment.baseUrl;

export class UsuarioI {

  constructor(
    public nombre: string,
    public email: string,
    public password?: string,
    public img?: string,
    public google?: boolean,
    public role?: 'ADMIN_ROLE' | 'USER_ROLE',
    public uid?: string,
  ) {}

  get image(): string {

    if (!this.img) {
      return `${baseUrl}/uploads/usuarios/no-img`;
    }

    if (this.img.includes('https')) {
      return this.img;
    }

    return (this.img)
      ? `${baseUrl}/uploads/usuarios/${this.img}`
      : `${baseUrl}/uploads/usuarios/no-img`;

  }

}
