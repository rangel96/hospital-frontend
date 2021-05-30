import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UsuarioI } from '../../models/usuario.model';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {
  usuario: UsuarioI;

  constructor(public usuarioSvc: UsuarioService, public auth: AuthService) {
    this.usuario = usuarioSvc.usuario;
  }

  ngOnInit(): void {
  }

}
