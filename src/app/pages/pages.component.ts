import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings.service';
import { SidebarService } from '../services/sidebar.service';

// tslint:disable-next-line:typedef
declare function customInitFunctions();

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {

  constructor(private settings: SettingsService,
              private sidebarSvc: SidebarService) { }

  ngOnInit(): void {
    customInitFunctions();
    this.sidebarSvc.loadMenu();
  }

}
