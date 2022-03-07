import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { AppUserAuth } from '../../shared/models/app-user-auth';
import { UserLogin } from '../../shared/models/user-login';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  @Output() authChanged: EventEmitter<boolean> = new EventEmitter<boolean>();

  isAuthenticated = false;
  redirectUrl = '';
  appUserAuth = new AppUserAuth();

  constructor() {
    this.appUserAuth = this.getUserLoggedIn();
    this.setUserLoggedIn(this.appUserAuth);
  }

  public login(userLogin: UserLogin): Observable<AppUserAuth> {
    let appUserAuth = new AppUserAuth();

    return new Observable<AppUserAuth>((observer) => {
      if (userLogin.email == 'erick.arostegui.cunza@gmail.com' && userLogin.password == 'Password1234') {
        appUserAuth = {
          userId:1,
          address:"Barcelona",
          bearerToken:"",
          email:userLogin.email,
          password:"",
          firstName:"Erick",
          lastName:"Aróstegui Cunza",
          dateOfBirth: new Date(),
          sex:1,
          isAuthenticated:true
        };
      }

      this.setUserLoggedIn(appUserAuth);
      observer.next(appUserAuth);
      observer.complete();
    });
  }

  public logout(): Observable<boolean> {
    return new Observable<boolean>(observer => {
      const appUserAuth = new AppUserAuth();
      this.setUserLoggedIn(appUserAuth);      
      observer.next(true);
      observer.complete();
    });
  }

  private setUserLoggedIn(appUserAuth: AppUserAuth) {    

    this.isAuthenticated = appUserAuth.isAuthenticated;

    this.appUserAuth = appUserAuth;
    sessionStorage.setItem('currentUser', JSON.stringify(appUserAuth));
    this.userAuthChanged(appUserAuth.isAuthenticated);
  }

  private getUserLoggedIn(): AppUserAuth {
    let appUserAuth = JSON.parse(sessionStorage.getItem('currentUser')!);
    appUserAuth = appUserAuth || new AppUserAuth();
    return appUserAuth;
  }

  private userAuthChanged(status: boolean) {
    this.authChanged.emit(status); // Raise changed event
  }
}
