import { Injectable } from '@angular/core';
import { LoginCredentials, User } from '../model/model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataFactoryService {

  private API_URL = environment.apiurl;

  // Properties to store login data
  private token: string | null = null;
  private currentUser: any = null;



  constructor(private http: HttpClient) {}

  createLoginCredentials(email: string, password: string): LoginCredentials {
    return {
      userName: email,
      password: password,
      ipAddress: '',
      browser: ''
    };
  }


  setToken(token: string): void {
    this.token = token;
  }

  getToken(): string | null {
    return this.token;
  }

  setCurrentUser(userName: any): void {
    this.currentUser = userName;
  }

  getCurrentUser(): any {
    return this.currentUser;
  }



  createUser(user: User): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/login/user-signup`, user);
  }
}
