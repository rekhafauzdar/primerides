import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginCredentials, User } from '../model/model';
import { DataFactoryService } from './data-factory.service';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
    
  public base: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public page: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public last: BehaviorSubject<string> = new BehaviorSubject<string>('');

  public userLogin: boolean = false;

  private API_URL = environment.apiurl;
  private token: string | null = null;
  private currentUser: any = null;


  private userLoginSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public userLogin$: Observable<boolean> = this.userLoginSubject.asObservable();

  constructor(
    private http: HttpClient, 
    private dataFactoryService: DataFactoryService) {
   
      this.loadFromDataFactory();
    }
  
    private loadFromDataFactory(): void {
      const storedToken = this.dataFactoryService.getToken();
      const storedUser = this.dataFactoryService.getCurrentUser();
      console.log(storedToken);
      console.log(storedUser);
      if (storedToken) {
        this.token = storedToken;
      }
      if (storedUser) {
        this.currentUser = storedUser;
      }
      this.userLoginSubject.next(!this.token);
    }
  
    login(credentials: LoginCredentials): Observable<any> {
      return this.http.post<any>(`${this.API_URL}/login/login-details`, credentials)
        .pipe(
          map(response => {
            if (response.status === '1') {
              this.dataFactoryService.setToken(response.data.token);
              this.dataFactoryService.setCurrentUser(response.data.userName);
              this.userLoginSubject.next(true);
            }
            return response;
          })
        );
    }
  
    setUserLoggedIn(isLoggedIn: boolean): void {
      this.userLoginSubject.next(isLoggedIn);
    }
  
    logout(): void {
      this.token = null;
      this.currentUser = null;
      this.dataFactoryService.setToken('');
      this.dataFactoryService.setCurrentUser(null);
      this.userLoginSubject.next(false);
    }
  
    signupUser(user: User): Observable<any> {
      return this.http.post<any>(`${this.API_URL}/login/user-signup`, user)
        .pipe(map(response => response));
    }
  

  
}