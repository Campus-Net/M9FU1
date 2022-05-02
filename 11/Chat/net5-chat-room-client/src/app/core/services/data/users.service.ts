import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBarConfig } from '@angular/material/snack-bar';
import { catchError, map, Observable, throwError } from 'rxjs';
import { AppUserAuth } from 'src/app/shared/models/app-user-auth';
import { User } from 'src/app/shared/models/user';
import { UserForCreate } from 'src/app/shared/models/user-for-create';
import { UserForUpdate } from 'src/app/shared/models/user-for-update';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private usersUrl = "https://localhost:44317/api/Users";

  constructor(
    private http: HttpClient
  ) {}

  public listUsersByRoomIdAndStatus(roomId: number, status: string): Observable<User[]> {
    let params = new HttpParams();
    params = params.append('roomId', roomId.toString());
    params = params.append('status', status);
    return this.http.get<User[]>(`${this.usersUrl}/`, { params: params })
    .pipe(
      catchError(this.handleError)
    );
  }
  public listUsersByRoomIdAndUserIdAndStatus(roomId: number, userId: number, status: string): Observable<User[]> {
    let params = new HttpParams();
    params = params.append('roomId', roomId.toString());
    params = params.append('userId', userId.toString());
    params = params.append('status', status);
    return this.http.get<User[]>(`${this.usersUrl}/`, { params: params })
    .pipe(
      catchError(this.handleError)
    );
  }
  public listUsersByRoomId(roomId: number): Observable<User[]> {
    let params = new HttpParams();
    params = params.append('roomId', roomId.toString());
    return this.http.get<User[]>(`${this.usersUrl}/`, { params: params }).pipe(
      catchError(this.handleError)
    );
  }

  public editUser(userId: number,user:UserForUpdate): Observable<void> {    
    const updateUrl = `${this.usersUrl}/${userId}`;
    return this.http.put<void>(updateUrl, user)
      .pipe(
        catchError(this.handleError)
      );
  }

  public AddUser(user:UserForCreate): Observable<void> {    
    const insertUrl = `${this.usersUrl}`;
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
