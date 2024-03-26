import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, catchError, filter, map, of, throwError } from 'rxjs';
import { User, UserPassUpdate } from './user';
import { IAuthInfo } from './iAuthInfo';
import { JwtClientService } from '../jwt-client.service';
import { data, get } from 'jquery';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';


declare var $: any;


@Injectable()
export class AuthService {
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  response:any;
  private baseURL='http://localhost:9090/api/auth';
  private refreshTokenInterval: any;
  private readonly tokenRefreshThreshold = 2 * 60 * 1000;

  constructor(
    private router: Router,
    private jwtService:JwtClientService,
    private httpClient: HttpClient
  ) {}

  get isLoggedIn() {
    this.setLoggedIn();
    return this.loggedIn.asObservable();
  }

  setLoggedIn(){
    if(sessionStorage.getItem('accessToken')){
      this.loggedIn.next(true);
    }
    else
    {
      this.loggedIn.next(false);
    }
  }

  get accessToken() {
    const accessToken = sessionStorage.getItem('accessToken');
    if (accessToken == null) {
      this.router.navigateByUrl("/login");
    }
    return accessToken;
  }

  get currentUserId(){
    const userId = sessionStorage.getItem('currentUser');
    if (userId == null)
    {
      this.router.navigateByUrl("/login");
    }
    return userId;
  }

  login(user: User): Observable<any> {
    return this.jwtService.generateToken(user).pipe(
      map((response: any) => {
        console.log('Response:', response);
        const retUser: IAuthInfo = response;
        const currentUser = user.employeeId;
        sessionStorage.setItem('accessToken', JSON.stringify(retUser));
        sessionStorage.setItem('currentUser', currentUser);
        this.handleTokenExpiration(sessionStorage.getItem('accessToken')!.replace(/"/g, ''));
        sessionStorage.setItem('role', this.getRoleFromToken(sessionStorage.getItem('accessToken')!.replace(/"/g, ''))!);
        this.startTokenRefreshTimer();
        return response; 
      }),
       catchError((error: any) => {
        
         alert("EmployeeId or Password Incorrect");
         return error; 
       })
       
    );
  }

  startTokenRefreshTimer(): void {
    clearInterval(this.refreshTokenInterval);
    const token = sessionStorage.getItem('accessToken');
    if (!token) return;
    const decodedToken = jwtDecode(token);
    if (!decodedToken || !decodedToken.exp) return;
    const expirationTime = decodedToken.exp * 1000;
    const currentTime = Date.now();
    const remainingTime = expirationTime - currentTime;
    //console.log("remainingTime: ", remainingTime);
    //console.log("thresholdTime: ",this.tokenRefreshThreshold);
    const refreshInterval = remainingTime - this.tokenRefreshThreshold;
    //console.log("refreshInterval:",refreshInterval);
    if (refreshInterval <= 0) {
      this.refreshToken().subscribe();
    } else {
      //console.log('Setting up token refresh timer with interval:', refreshInterval);

      this.refreshTokenInterval = setTimeout(() => {
        //console.log('Token refresh timer triggered');
        this.refreshToken().subscribe();
    }, refreshInterval);
    }
  }


  refreshToken(): Observable<any> {
    //console.log("inside refreshToken");
    const token = this.accessToken;
    if (token != null) {
        //console.log("refreshToken: checking if logged in");
        this.jwtService.testaccessApi(token).subscribe(data => console.log("testaccessAPI: "+ data));
        return this.jwtService.renewToken(token).pipe( map((response: any) => {
          console.log('renewToken Response:', response);
          const retUser: IAuthInfo = response;
          sessionStorage.setItem('accessToken', JSON.stringify(retUser));
          this.handleTokenExpiration(sessionStorage.getItem('accessToken')!.replace(/"/g, ''));
          sessionStorage.setItem('role', this.getRoleFromToken(sessionStorage.getItem('accessToken')!.replace(/"/g, ''))!);
          this.startTokenRefreshTimer();
          return response; 
      }),
      catchError((error: any) => {
          sessionStorage.clear();
          this.loggedIn.next(false);
          alert("Unable to renew token, Please login again.");
          this.router.navigate(['/login']);
          return throwError(error); 
      })
    );
    } else {
        console.log("refreshToken: not logged in");
        return of(null);
    }
}

  handleTokenExpiration(token: string) {
    const decodedToken = jwtDecode(token);
    if (!decodedToken.exp) {
      console.error('Token does not contain expiry time.');
      return;
    }
    const expirationTime = decodedToken.exp * 1000; 
    console.log(expirationTime, "exp time");
    const currentTime = Date.now();
    const remainingTime = expirationTime - currentTime;
    
    if (remainingTime > 0) {
      setTimeout(() => this.logout(), remainingTime);
    } else {
      this.logout();
    }
  }

   getRoleFromToken(token: string): string | null {
    try {
      const decodedToken: any = jwtDecode(token);
      if (decodedToken && typeof decodedToken === 'object' && 'role' in decodedToken) {
        return decodedToken.role;
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }

  logout() {
    sessionStorage.removeItem('accessToken');
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }

  updatePassword(userPassUpdate: UserPassUpdate){
     let employeeId   = sessionStorage.getItem('currentUser');
     return this.httpClient.post(`${this.baseURL}/updatePassword/${employeeId}`, userPassUpdate , { headers: this.customHeaders, responseType: 'text' as 'json'})
     .pipe(
       catchError((error: any) => {
         alert("Old password incorrect");
         return error; 
       })
     );
    }
 
  get customHeaders() {
    let tokenStr = "Bearer " + sessionStorage.getItem('accessToken')!.replace(/"/g, '');

    const headers = new HttpHeaders().set("Authorization", tokenStr);
    return headers;
  }

isAdmin(): boolean {
    return sessionStorage.getItem('role') === 'ROLE_ADMIN';
}

isEmployee(): boolean {
  return sessionStorage.getItem('role') === 'ROLE_EMPLOYEE';
}

isManager(): boolean {
  return sessionStorage.getItem('role') === 'ROLE_MANAGER';
}

}




