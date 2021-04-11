import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nopagefound',
  templateUrl: './nopagefound.component.html',
  styleUrls: [ '../../../assets/css/pages/error-pages.css' ]
})
export class NopagefoundComponent {

  constructor() { }

  year = new Date().getFullYear();

}
