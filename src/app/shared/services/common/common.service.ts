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
     

     public addNewCar(data: any): Observable<any> {
        return this.http.post<any>(`${this.API_URL}/car-details/create-car-details`, data, {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'http://localhost:4200',  
          },
        });
      }

     

      public updateCar(data: any): Observable<any> {
        return this.http.post<any>(`${this.API_URL}/car-details/update-image-id`, data, {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'http://localhost:4200',  
          },
        });
      }

      public uploadImage(imageData: FormData): Observable<any> {
        return this.http.post<any>(`${this.API_URL}/car-details/upload-image`, imageData);
      }

     
      


      public getAllCar(): Observable<any> {
        return this.http.post<any>(`${this.API_URL}/car-details/get-all-car-details`,{
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'http://localhost:4200',  
          },
        });
      }
  
      
      public getCarById(id: any): Observable<any> {
        return this.http.post<any>(`${this.API_URL}/car-details/get-car-details`, id, {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'http://localhost:4200',  
          },
        });
      }


      

      public getCarAvailibility(data:any): Observable<any> {
        return this.http.post<any>(`${this.API_URL}/booking-details/search-car`, data,{
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'http://localhost:4200',  
          },
        });
      }
  

      public getUserProfileById(id: any): Observable<any> {
        return this.http.post<any>(`${this.API_URL}/user-profile/get-user-profile-by-id`, id, {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'http://localhost:4200',  
          },
        });
      }


      // public getUserProfileById(id: any): Observable<any> {
      //   return this.http.get<any>(`${this.API_URL}/user-profile/${id}`, {
      //     headers: {
      //       'Content-Type': 'application/json',
      //       'Access-Control-Allow-Origin': 'http://localhost:4200',  
      //     },
      //   });
      // }
      


      public getAllUserProfile(): Observable<any> {
        return this.http.post<any>(`${this.API_URL}/user-profile/get-all-user-profiles`, {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'http://localhost:4200',  
          },
        });
      }

      // public getCarById(id: any): Observable<any> {
      //   return this.http.post<any>(`${this.API_URL}/car-details/get-car-details`, {}, {
      //     params: { id: id.toString() }, 
      //     headers: {
      //       'Content-Type': 'application/json',
      //       'Access-Control-Allow-Origin': 'http://localhost:4200',
      //     },
      //   });
      // }
      
}