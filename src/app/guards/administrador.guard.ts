import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from "../servicios/auth.service";
import { Observable } from "rxjs";
import jwtDecode from 'jwt-decode';

@Injectable({
    providedIn: 'root'
})

export class AdministradorGuard implements CanActivateChild{
    constructor(private authService: AuthService, private router:Router){
    }
    canActivateChild(next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean {
        if (this.authService.getToken() !== null) {
            const dataDecode: any = this.decodeToken();
            const date = new Date();
            if (dataDecode.exp < date.getTime() / 1000) {
                return this.redirect();
            }
            if (dataDecode.cargo !== 'UA') {
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