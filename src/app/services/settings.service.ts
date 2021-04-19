import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  // Obtenemos el link del index.html
  linkTheme = document.querySelector('#theme');



  constructor() {
    // Theme Proyect
    const theme = localStorage.getItem('theme') || './assets/css/colors/default-dark.css';

    // Mandamos el url construido al link del index.html
    this.linkTheme.setAttribute('href', theme);
  }


  changeTheme(theme: string, links: NodeListOf<Element>): void {

    // Constuimos la nueva url
    const urlTheme = `./assets/css/colors/${ theme }.css`;

    // Mandamos el url construido al link del index.html
    this.linkTheme.setAttribute('href', urlTheme);

    // Guardamos los ajustes en el localStorage
    localStorage.setItem('theme', urlTheme);


    // Movemos la marca al elemento seleccionado
    this.checkCurrentTheme(links);

  }

  checkCurrentTheme(links): void {

    // Barrido de la lista 'links'
    links.forEach(element => {

      // Borramos la clase 'working'
      element.classList.remove('working');

      // Obtenemos el tema
      const btnTheme = element.getAttribute('data-theme');
      const btnThemeUrl = `./assets/css/colors/${ btnTheme }.css`;

      // Obtenemos el tema actual
      const currentTheme = this.linkTheme.getAttribute('href');

      // Comparamos si el tema seleccionado es el mismo que el que se esta usando
      if (btnThemeUrl === currentTheme) {
        element.classList.add('working');
      }

    });

  }

}
