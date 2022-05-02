import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Chat } from 'src/app/shared/models/chat';

@Injectable({
  providedIn: 'root'
})
export class ChatsService {
  private chatsUrl = "https://localhost:44317/api/Chats";

  constructor(
    private http: HttpClient
  ) {}

  public listChatsByRoomId(roomId: number): Observable<Chat[]> {
    let params = new HttpParams();
    params = params.append('roomId', roomId.toString());
    return this.http.get<Chat[]>(`${this.chatsUrl}/`,{params:params});
  }
  public insertChat(chat: Chat): Observable<Chat> {
    return this.http.post<Chat>(`${this.chatsUrl}/`, chat);
  }
}
