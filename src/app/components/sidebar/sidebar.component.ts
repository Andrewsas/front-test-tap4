import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import PerfectScrollbar from 'perfect-scrollbar';
import { PEFORMACE_URL } from './../../constant/constant';
import { Languages } from '../../generic/translate/translations';
import { TranslateService } from '../../generic/translate/translate.service';
import { AuthGuardService } from '../../security/auth-guard/authguard.service';
import { StorageService } from 'src/app/service/storage/storage.service';

declare const $: any;

// Metadata
export interface RouteInfo {
  path: string;
  title: string;
  type: string;
  icontype: string;
  collapse?: string;
  children?: ChildrenItems[];
  active?: string;
  permission?: string;
  view?: boolean;
  help?: String;
}

export interface ChildrenItems {
  path: string;
  title: string;
  type?: string;
  icontype: string;
  ab: string;
  active?: string;
  permission?: string;
  view?: boolean;
  help?: String;
}

// Menu Items
export const ROUTES: RouteInfo[] = [
  {
    path: '/language',
    title: 'sidebar.lang',
    type: 'link',
    icontype: 'g_translate'
  },
  {
    path: '/framework',
    title: 'sidebar.framework',
    type: 'link',
    icontype: 'filter_frames'
  }
];

@Component({
  selector: 'app-sidebar-cmp',
  templateUrl: 'sidebar.component.html',
})
export class SidebarComponent implements OnInit {
  public menuItems: any[];
  public urlPeformace: String = PEFORMACE_URL;
  public photo: String = '';
  public username: String = 'Andrew';
  public initialUser: String = 'AS';
  public languages = Languages;

  set selectedLanguage(value) {
    localStorage.setItem('lang', value);
    this._translate.use(this.selectedLanguage);
  }

  get selectedLanguage() {
    if (!localStorage.getItem('lang') || localStorage.getItem('lang') === '') {
      localStorage.setItem('lang', this.languages[0].value);
      this._translate.use(this.selectedLanguage);
    }

    return localStorage.getItem('lang');
  }

  constructor(
    private _translate: TranslateService,
    public router: Router,
    public auth: AuthGuardService,
    private storageService: StorageService
  ) {  }

  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  }

  ngOnInit() {
    const menuItems = ROUTES.filter(menuItem => menuItem);
    this.activeMenu(menuItems);
  }

  updatePS(): void {
    if (window.matchMedia(`(min-width: 960px)`).matches) {
      // if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
      const elemSidebar = <HTMLElement>(
        document.querySelector('.sidebar .sidebar-wrapper')
      );
      const ps = new PerfectScrollbar(elemSidebar, {
        wheelSpeed: 2,
        suppressScrollX: true
      });
    }
  }

  isMac(): boolean {
    let bool = false;
    if (
      navigator.platform.toUpperCase().indexOf('MAC') >= 0 ||
      navigator.platform.toUpperCase().indexOf('IPAD') >= 0
    ) {
      bool = true;
    }
    return bool;
  }

  logout() {
    sessionStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('authority');
    this.router.navigate(['login']);
  }

  activeMenu(menuItems) {
    for (let i = 0; i < menuItems.length; i++) {
      menuItems[i].view = this.auth.validaPermission(menuItems[i].active, menuItems[i].permission);
      if (menuItems[i].children) {
        menuItems[i].view = false;
        for (let x = 0; x < menuItems[i].children.length; x++) {
          if (
            this.auth.validaPermission(
              menuItems[i].children[x].active,
              menuItems[i].children[x].permission
            )
          ) {
            menuItems[i].view = true;
            menuItems[i].children[x].view = true;
          } else {
            menuItems[i].children[x].view = false;
          }
        }
      }
    }
    this.menuItems = menuItems;
  }
}
