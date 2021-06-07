import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UsuarioI } from '../../models/usuario.model';
import { UsuarioService } from '../../services/usuario.service';
import { SearchService } from '../../services/search.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {
  usuario: UsuarioI;

  constructor(public usuarioSvc: UsuarioService,
              public auth: AuthService,
              private router: Router) {
    this.usuario = usuarioSvc.usuario;
  }

  ngOnInit(): void {
  }

  searchGlobal(words: string): void {
    this.router.navigate(['/dashboard/search', words]);
  }

}
