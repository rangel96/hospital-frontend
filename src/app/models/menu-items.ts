export interface MenuItems {

  title: string;
  icon: string;
  submenu: SubMenu[];

}

interface SubMenu {

  title: string;
  url: string;

}
