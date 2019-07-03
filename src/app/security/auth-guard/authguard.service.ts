import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  RouterState
} from '@angular/router';
import { AuthService } from '../auth-service/auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(public auth: AuthService, public router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    return this.auth.isAuthenticated();
    // this.validaPermission(next.data.role, next.data.permission);
  }

  public validaPermission(role?, permission?): boolean {
    return true;
    // try {
      //   if (!this.auth.isAuthenticated()) {
      //     this.router.navigate(['login']);
      //     return false;
      //   } else {
      //     return true;
      //   }
      //   // const tokenDecode = this.auth.decode();
      //   // if (tokenDecode === undefined) {
      //   //     if (!role) {
      //   //       return true;
      //   //     } else {
      //   //       return false;
      //   //     }
      //   // } else
      //   // if (tokenDecode.authority === 'ADMIN') {
      //   //   return true;
      //   // } else if (role) {
      //   //   for (let i = 0; i < tokenDecode.permissions.length; i++) {
      //   //     if (tokenDecode.permissions[i].controller.name === role) {
      //   //       switch (permission) {
      //   //         case 'READ': return tokenDecode.permissions[i].read;
      //   //         case 'CREATE': return tokenDecode.permissions[i].create;
      //   //         case 'UPDATE': return tokenDecode.permissions[i].update;
      //   //         case 'DELETE': return tokenDecode.permissions[i].delete;
      //   //       }
      //   //     }
      //   //   }
      //   // } else {
      //   //   return true;
      //   // }
      //   // return false;
      // } catch (e) {
      //   sessionStorage.removeItem('token');
      //   localStorage.removeItem('user');
      //   localStorage.removeItem('authority');
      //   this.router.navigate(['login']);
      //   return false;
      // }
  }
}
