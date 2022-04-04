import { EventEmitter, Injectable } from '@angular/core';
import * as signalR from "@microsoft/signalr";

@Injectable({
  providedIn: 'root'
})
export class SignalRService {

  onListRooms = new EventEmitter();  
  onListUsersByRoomId = new EventEmitter<number>();

  connectionEstablished = new EventEmitter<boolean>();

  private connectionIsEstablished = false;
  private _hubConnection!: signalR.HubConnection;

  constructor() {
    this.createConnection();
    this.registerClientEventsOnServer();
    this.startConnection();  
  }

  private createConnection() {
    this._hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:44362/ChatHub')
      .build();
  }

  private startConnection(): void {
    this._hubConnection
      .start()
      .then(() => {
        this.connectionIsEstablished = true;
        console.log('Hub connection started');
        this.connectionEstablished.emit(true);
      })
      .catch(err => {
        console.log('Error while establishing connection, retrying...');
        setTimeout( () => { this.startConnection(); }, 5000);
      });
  }

  private registerClientEventsOnServer(): void {
    
    this._hubConnection.on('ListRoomsClient', () => {
      this.onListRooms.emit();
    });
    
  }
}
