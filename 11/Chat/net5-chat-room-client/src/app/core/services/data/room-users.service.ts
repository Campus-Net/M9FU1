import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RoomUser } from 'src/app/shared/models/room-user';

@Injectable({
  providedIn: 'root'
})
export class RoomUsersService {

  private roomUsersUrl = "https://localhost:44317/api/RoomUsers";

  constructor(
    private http: HttpClient
  ) {}

  public getRoomUserByRoomIdAndUserId(roomId: number,userId: number): Observable<RoomUser> {
    let params = new HttpParams();
    params = params.append('roomId', roomId.toString());
    params = params.append('userId', userId.toString());
    return this.http.get<RoomUser>(`${this.roomUsersUrl}/`,{ params: params });
  }
  public getRoomUserByRoomIdAndUserIdAndStatus(roomId: number,userId: number,status:string): Observable<RoomUser> {
    let params = new HttpParams();
    params = params.append('roomId', roomId.toString());
    params = params.append('userId', userId.toString());
    params = params.append('status', status);
    return this.http.get<RoomUser>(`${this.roomUsersUrl}/`,{ params: params });
  }
  public insertRoomUser(roomUser: RoomUser): Observable<RoomUser> {
    return this.http.post<RoomUser>(`${this.roomUsersUrl}/`, roomUser);
  }
  public updateRoomUser(roomUser: RoomUser): Observable<RoomUser> {
    return this.http.put<RoomUser>(`${this.roomUsersUrl}/`, roomUser);
  }
}
