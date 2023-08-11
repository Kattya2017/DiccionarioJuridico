import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "../servicios/auth.service";


@Injectable()
export class InterceptorInterceptor implements HttpInterceptor{

    constructor(private authService: AuthService){}

    intercept (req: HttpRequest<any>, next: HttpHandler):Observable<HttpEvent<any>>{
        const tokenizeReq = req.clone({
            setHeaders:{
                'x-token': `${this.authService.getToken()}`
            }
        });
        return next.handle(tokenizeReq);
    }
}