import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { MenuItems } from '../../models/menu-items';
import { AuthService } from '../../services/auth.service';
import { UsuarioI } from '../../models/usuario.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent {

  /* ? ----- VARIABLES ----- */
  usuario: UsuarioI;

  constructor(public sidebarSvc: SidebarService,
              public auth: AuthService) {
    this.usuario = auth.usuario;
  }

}
