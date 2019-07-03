import { Injectable } from '@angular/core';
import { StorageService } from 'src/app/service/storage/storage.service';

@Injectable()
export class AuthService {
  constructor(
    private storage: StorageService
  ) {}

  public isAuthenticated(): boolean {
    const token = this.storage.token;
    if (token !== '' && token !== null && token !== undefined) {
      return true;
    }
    return false;
  }

  public decode() {
    if (localStorage.getItem('authority') === null) {
      return undefined;
    } else {
      return JSON.parse(atob(localStorage.getItem('authority')));
    }
  }
}
