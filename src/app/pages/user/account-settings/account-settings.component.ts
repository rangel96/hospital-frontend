import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../../services/settings.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: [
  ]
})
export class AccountSettingsComponent implements OnInit {

/* ? ----- VARIABLES ----- */
  links: NodeListOf<Element>;


  constructor(private settings: SettingsService) {
  }

  ngOnInit(): void {

    // Obtenemos todos los temas del html
    this.links = document.querySelectorAll('.selector');

    // Cargamos el selector en el icono correspondiente
    this.settings.checkCurrentTheme(this.links);
  }

  changeTheme(theme: string): void {

    // Cambiar el tema
    this.settings.changeTheme(theme, this.links);

  }

}
