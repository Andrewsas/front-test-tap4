import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private USER_KEY = 'user';
  private TOKEN_KEY = 'token';
  private AUTHORITY_KEY = 'authority';

  constructor() {}

  public get user() {
    const user = localStorage.getItem(this.USER_KEY);
    if (!user) {
      return null;
    } else {
      return JSON.parse(user);
    }
  }

  public set user(user: any) {
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  public get token() {
    const token = sessionStorage.getItem(this.TOKEN_KEY);
    if (token == null) {
      return null;
    } else {
      return token;
    }
  }

  public set token(token: string) {
    sessionStorage.setItem(this.TOKEN_KEY, token);
  }

  public get authority() {
    const authority = localStorage.getItem(this.AUTHORITY_KEY);
    if (authority == null) {
      return null;
    } else {
      return authority;
    }
  }

  public set authority(authority: string) {
    localStorage.setItem(this.AUTHORITY_KEY, authority);
  }
}
