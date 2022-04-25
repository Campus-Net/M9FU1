import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBarConfig } from '@angular/material/snack-bar';
import { catchError, map, Observable, throwError } from 'rxjs';
import { AppUserAuth } from 'src/app/shared/models/app-user-auth';
import { UserForCreate } from 'src/app/shared/models/user-for-create';
import { UserForUpdate } from 'src/app/shared/models/user-for-update';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private authUrl = "https://localhost:44317/api/Users";

  constructor(
    private http: HttpClient
  ) {}

  public editUser(userId: number,user:UserForUpdate): Observable<void> {    
    const updateUrl = `${this.authUrl}/${userId}`;
    return this.http.put<void>(updateUrl, user)
      .pipe(
        catchError(this.handleError)
      );
  }

  public AddUser(user:UserForCreate): Observable<void> {    
    const insertUrl = `${this.authUrl}`;
    return this.http.post<void>(insertUrl, user)
      .pipe(
        catchError(this.handleError)
      );
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
