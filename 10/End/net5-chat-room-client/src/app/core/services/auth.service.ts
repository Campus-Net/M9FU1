import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { User } from 'src/app/shared/models/user';
import { AppUserAuth } from '../../shared/models/app-user-auth';
import { UserLogin } from '../../shared/models/user-login';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  @Output() authChanged: EventEmitter<AppUserAuth> = new EventEmitter<AppUserAuth>();

  private authUrl = "https://localhost:44317/api/Users";

  isAuthenticated = false;
  redirectUrl = '';
  appUserAuth = new AppUserAuth();

  constructor(
    private http: HttpClient    
  ) {
    this.appUserAuth = this.getUserLoggedIn();
    this.setUserLoggedIn(this.appUserAuth);
  }

  public login(userLogin: UserLogin): Observable<AppUserAuth> {
    const authenticateUrl =`${this.authUrl}/validate-login`;

    return this.http.post<AppUserAuth>(authenticateUrl, userLogin)
      .pipe(
        map(user => {          
          this.setUserLoggedIn(user);
          return user;
        }),
        catchError(this.handleError)
      );
  }

  public logout(): Observable<boolean> {
    return new Observable<boolean>(observer => {
      const appUserAuth = new AppUserAuth();
      this.setUserLoggedIn(appUserAuth);      
      observer.next(true);
      observer.complete();
    });
  }

  public updateLogin(user:User):Observable<boolean>{
    return new Observable<boolean>(observer => {
      const appUserAuth = new AppUserAuth(user);
      appUserAuth.isAuthenticated = true;
      
      this.setUserLoggedIn(appUserAuth);      
      observer.next(true);
      observer.complete();
    });
  }

  private setUserLoggedIn(appUserAuth: AppUserAuth) {    

    this.isAuthenticated = appUserAuth.isAuthenticated;

    this.appUserAuth = appUserAuth;
    sessionStorage.setItem('currentUser', JSON.stringify(appUserAuth));
    this.userAuthChanged(appUserAuth);
  }

  private getUserLoggedIn(): AppUserAuth {
    let appUserAuth = JSON.parse(sessionStorage.getItem('currentUser')!);
    appUserAuth = appUserAuth || new AppUserAuth();
    return appUserAuth;
  }

  private userAuthChanged(appUserAuth: AppUserAuth) {
    this.authChanged.emit(appUserAuth); // Raise changed event
  }

  private handleError(error: HttpErrorResponse) {
    console.error('server error:', error);
    if (error.error instanceof Error) {
      const errMessage = error.error.message;
      return throwError(()=>errMessage);
    }
    return throwError(()=>error || 'Server error');
  }
}
