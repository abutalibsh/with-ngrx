import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PersistanceService } from './persistance.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor{

  constructor(private service : PersistanceService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token  = this.service.get(environment.accessToken)
    const request = req.clone({
      setHeaders : {
        Authorization : token? `Token ${token}`  : ''
      }
    })

    return next.handle(request);
  }
}
