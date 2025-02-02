import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DataFactoryService } from '../common/data-factory.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private dataFactory: DataFactoryService) {}

  intercept1(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.dataFactory.getToken();
    if (token) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)       
      });
      return next.handle(cloned);
    } else {
      return next.handle(req);
    }
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.dataFactory.getToken();

    // Clone the request and add the Authorization header (if token exists)
    let clonedReq = req;
    
    if (!token) {
      clonedReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': 'http://localhost:4200', 
        }
      });
    }else {
      return next.handle(req);
    }

    return next.handle(clonedReq);
  }
}
