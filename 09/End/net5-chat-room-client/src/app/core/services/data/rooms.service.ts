import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Room } from 'src/app/shared/models/room';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {

  private roomsUrl = "https://localhost:44317/api/Rooms";

  constructor(
    private http: HttpClient
  ) {}
  
  public getRoomByRoomId(roomId: number): Observable<Room> {
    return this.http.get<Room>(`${this.roomsUrl}/` + roomId);
  }
  public getRoomByRoomName(roomName: string): Observable<Room> {
    let params = new HttpParams();
    params = params.append('roomName', roomName);
    return this.http.get<Room>(`${this.roomsUrl}/`, { params: params })
    .pipe(
      catchError(this.handleError)
    );
  }
  public listRooms(): Observable<Room[]> {
    return this.http.get<Room[]>(`${this.roomsUrl}/`)
    .pipe(
      catchError(this.handleError)
    );
  }
  public insertRoom(room: Room): Observable<Room> {
    return this.http.post<Room>(`${this.roomsUrl}/`, room)
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
