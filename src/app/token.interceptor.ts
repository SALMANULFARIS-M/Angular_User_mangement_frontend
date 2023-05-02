import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { BackendService } from "./services/backend.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  token?:string;
  constructor(private backendService: BackendService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler) {
    const commonUrl = "http://localhost:3000/api/"
    const isAdminRequest = request.url.includes("admin");
    this.token = isAdminRequest ? "admin" : "user";

    let authService = this.backendService.getToken(this.token);
    if (authService) {
      const headers = {
        Authorization: 'Bearer' + authService
      };
      let newRequest = request.clone({
        url: commonUrl + request.url,
        setHeaders: headers
      })
      return next.handle(newRequest);
    }else{

      let newRequest = request.clone({
        url: commonUrl + request.url
      })
      return next.handle(newRequest);
    }
  }
}
