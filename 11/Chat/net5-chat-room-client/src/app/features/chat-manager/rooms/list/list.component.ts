import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { ChatsService } from 'src/app/core/services/data/chats.service';
import { RoomUsersService } from 'src/app/core/services/data/room-users.service';
import { RoomsService } from 'src/app/core/services/data/rooms.service';
import { SignalRService } from 'src/app/core/services/signal-r.service';
import { Chat } from 'src/app/shared/models/chat';
import { Room } from 'src/app/shared/models/room';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  displayedColumns: string[] = ['roomId','roomName','actions'];
  rooms: Room[] = [];
  isLoadingResults = true;
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private roomsService: RoomsService,
    private authService: AuthService,
    private chatsService: ChatsService,
    private roomUsersService: RoomUsersService,
    private signalRService: SignalRService,
  ) {    
    this.subscribeToEvents(); 
  }

  ngOnInit(): void {
    this.listRooms();
  }

  private subscribeToEvents(): void {
    this.signalRService.onListRooms.subscribe(() => {
      this.listRooms();
    });
  }  

  listRooms() {
    this.isLoadingResults = true;
    this.roomsService.listRooms().subscribe(rooms => {
      this.rooms = rooms;
      this.isLoadingResults = false;
    });
  }

  enterChatRoom(roomId: number) {
    debugger
    let user = this.authService.getUserLoggedIn();
    this.roomUsersService.getRoomUserByRoomIdAndUserIdAndStatus(roomId, user.userId,'online').subscribe((roomUser) => {      
      if (roomUser) {
        roomUser.status = 'online';
        this.roomUsersService.updateRoomUser(roomUser).subscribe(() => {
          this.goToChatRoom(roomId);
        })
      } else {
        roomUser = {
          roomId: roomId,
          userId: user.userId,
          status: 'online'
        };        
        this.roomUsersService.insertRoomUser(roomUser).subscribe(() => {
          this.goToChatRoom(roomId);
        });
      }
    });
  }

  goToChatRoom(roomId: number) {
    let user = this.authService.getUserLoggedIn();

    const chat = new Chat();
    chat.roomId = roomId;
    chat.userId = user.userId;
    chat.date = new Date();
    chat.message = `${user.getFullName()} enter the room`;
    chat.type = 'join';

    this.signalRService.SendChat(chat).then(() => {
      this.chatsService.insertChat(chat).subscribe(() => {
        this.router.navigate(['/chat/rooms', roomId,"chats"]);
      });
    });    
  }
}
