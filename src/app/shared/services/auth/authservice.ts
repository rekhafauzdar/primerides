import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { routes } from '../../routes/routes';
import { Observable } from 'rxjs';
import { User } from '../model/model';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})
export class AuthService {

   private API_URL = environment.apiurl;
 
  
  constructor(private http: HttpClient, private router: Router) {}

  public signin(user: any): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/login/user-signin`, user); 
  }
  
  // public signup(): void {
  //   localStorage.setItem('authenticated', 'true');
  //   this.router.navigate([routes.login]);
  // }

  //public/health-check

  public signup(user: any): Observable<any> {
      return this.http.post<any>(`${this.API_URL}/login/user-signup`, user);
    }


  // public signup(user: any): Observable<any> {
  //   return this.http.post<any>(`${this.API_URL}/login/user-signup`, user, {
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Access-Control-Allow-Origin': 'http://localhost:4200',  
  //     },
  //   });
  // }
    
  public forgotpassword(): void {
    localStorage.setItem('authenticated', 'true');
    this.router.navigate([routes.resetPassword]);
  }
}

