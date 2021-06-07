import { Injectable } from '@angular/core';
import { MenuItems } from '../models/menu-items';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: MenuItems[] = [];

  loadMenu(): void {
    this.menu = JSON.parse(localStorage.getItem('menu')) || [];
  }

  /*menu: MenuItems[] = [
    {
      title: 'Dashboard',
      icon: 'mdi mdi-gauge',
      submenu: [
        { title: 'Home', url: '/'  },
        { title: 'Progress', url: 'progress'  },
        { title: 'Graphic', url: 'graph1'  },
        { title: 'Promises', url: 'promises'  },
        { title: 'RXJS', url: 'rxjs' },
      ],
    },
    {
      title: 'Maintenance',
      icon: 'mdi mdi-folder-lock-open',
      submenu: [
        { title: 'Users', url: 'users' },
        { title: 'Hospitals', url: 'hospitals' },
        { title: 'Doctors', url: 'doctors'  },
      ],
    },
  ];*/


  constructor() { }
}
