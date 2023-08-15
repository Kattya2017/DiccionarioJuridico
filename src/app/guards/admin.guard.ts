import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { AuthService } from '../servicios/auth.service';
@Injectable({
  providedIn: 'root'
})
class PermissionsService {

  constructor(private router: Router,private authService: AuthService) {}

  CanActivateChild(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authService.getToken() !== null) {
      const dataDecode: any = this.decodeToken();
      const date = new Date();
      if (dataDecode.exp < date.getTime() / 1000) {
          return this.redirect();
      }
      return true;
  }
  return this.redirect();
  }
  redirect(){
      this.router.navigate(['/']);
      return false;
  }

  decodeToken(){
      return jwtDecode(`${this.authService.getToken()}`)
  }
}


export const AdminGuard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
  return inject(PermissionsService).CanActivateChild(next, state);
}
