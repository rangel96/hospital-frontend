import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { MenuItems } from '../../models/menu-items';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  /* ? ----- VARIABLES ----- */
  menuItems: MenuItems[];

  constructor(private sidebarService: SidebarService) {
    this.menuItems = sidebarService.menu;
  }

  ngOnInit(): void {
  }

}
