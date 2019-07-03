import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';

import { AlertService } from '../alert/alert.service';
import { ToastService } from '../toast/toast.service';
import { SpinerComponent } from 'src/app/generic/spiner/spiner.component';
import { AlertMsg, MessageType, IconType, MessageText } from './../../constant/constant';


@Injectable()
export class GenericService {
  constructor(
    public router: Router,
    public dialog: MatDialog,
    public alertServe: AlertService,
    public toastService: ToastService
  ) {}

  getLocation() {
    const tree = this.router.parseUrl(this.router.url);
    return tree.root.children['primary'].segments.map(it => it.path).join('/');
  }

  getParentPath(path?) {
    if (path) {
      return path.slice(0, Math.max(path.lastIndexOf('/'), 0));
    }
    return this.getLocation().slice(
      0,
      Math.max(this.getLocation().lastIndexOf('/'), 1)
    );
  }

  returnScreen(edit?, confirm?) {
    if (confirm) {
      this.router.navigate([this.getParentPath(this.getParentPath())]);
    } else if (edit) {
      this.alertServe.showAlertConfirm(AlertMsg.CONFIRM.CANCEL, result => {
        if (result) {
          this.router.navigate([this.getParentPath(this.getParentPath())]);
        }
      });
    }  else {
      this.router.navigate([this.getParentPath()]);
    }
  }

  openDialog() {
    return this.dialog.open(SpinerComponent, {
      width: '100%',
      height: '100%',
      disableClose: true
    });
  }

  getCacheTable(key: string): any[] {
    if (sessionStorage.getItem(key) !== '' &&
        sessionStorage.getItem(key) !== undefined &&
        sessionStorage.getItem(key) !== null) {
        return JSON.parse(sessionStorage.getItem(key));
    } else {
      return [];
    }
  }

  toats(msg: string, type, icon) {
    this.toastService.toats(msg, type, icon);
  }

  onError(error) {
    if (error.error === null) {
      this.toats(
        MessageText.ERROR,
        MessageType.ERROR,
        IconType.ERROR
      );
    } else {
      switch (error.status) {
        case 0:
          this.toats(
            MessageText.NOTNET,
            MessageType.ERROR,
            IconType.ERROR
          );
          break;
        case 400:
          this.toats(
            error.error,
            MessageType.ERROR,
            IconType.ERROR
          );
          break;
        case 401:
          this.toats(
            MessageText.AUTHORIZATION,
            MessageType.ERROR,
            IconType.ERROR
          );
          break;
        case 403:
          this.toats(
            MessageText.AUTHORIZATION,
            MessageType.ERROR,
            IconType.ERROR
          );
          break;
        default:
          this.toats(
            MessageText.ERROR,
            MessageType.ERROR,
            IconType.ERROR
          );
          break;
      }
    }
  }

  public filterSeach(value: string, listFilter: any[], atributeName?: string): any[] {
    const filterValue = value.toLowerCase();
    if (atributeName) {
      return listFilter.filter(
        item => item[atributeName].toLowerCase().indexOf(filterValue) !== -1
      );
    } else {
      return listFilter.filter(
        item => item.name.toLowerCase().indexOf(filterValue) !== -1
      );
    }
  }

  orderNumberKey(list: any[], key: any): any[] {
    if (!list) {
      return [];
    }
    const byDate = list.slice(0);
      return byDate.sort(function(a,b) {
        return a[key] - b[key];
      });
  }

  orderStringKey(list: any[], key: any): any[] {
    if (!list) {
      return [];
    }
    const byDate = list.slice(0);
      return byDate.sort(function(a, b) {
        const x = a[key].toLowerCase();
        const y = b[key].toLowerCase();
        return x < y ? -1 : x > y ? 1 : 0;
      });
  }

  roundNumeric(number: number, precision: number): number {
    const factor = Math.pow(10, precision);
    const tempNumber = number * factor;
    const roundedTempNumber = Math.round(tempNumber);
    return roundedTempNumber / factor;
  }
}
