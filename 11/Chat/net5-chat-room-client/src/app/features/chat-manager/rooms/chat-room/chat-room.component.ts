import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { ChatsService } from 'src/app/core/services/data/chats.service';
import { RoomUsersService } from 'src/app/core/services/data/room-users.service';
import { RoomsService } from 'src/app/core/services/data/rooms.service';
import { UsersService } from 'src/app/core/services/data/users.service';
import { SignalRService } from 'src/app/core/services/signal-r.service';
import { AppUserAuth } from 'src/app/shared/models/app-user-auth';
import { Chat } from 'src/app/shared/models/chat';
import { Room } from 'src/app/shared/models/room';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.scss']
})
export class ChatRoomComponent implements OnInit {

  @ViewChild('chatcontent') chatcontent?: ElementRef;
  scrolltop: number = null!;

  chatForm!: FormGroup;
  userLogin: AppUserAuth = null!;
  room: Room = null!;
  message = '';
  usersOnLine: User[] = [];
  users: User[] = [];
  chats: Chat[] = [];
  matcher = new MyErrorStateMatcher();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    public datepipe: DatePipe,  
    private authService: AuthService,
    private chatsService: ChatsService,
    private roomUsersService: RoomUsersService,
    private roomsService: RoomsService,
    private usersService: UsersService,
    private signalRService: SignalRService
  ) {
    this.userLogin = authService.getUserLoggedIn();
    this.subscribeToEvents();
    this.getRoom();
  }

  ngOnInit(): void {
    debugger
    this.chatForm = this.formBuilder.group({
      'Message': [null, Validators.required]
    });
  }

  private subscribeToEvents(): void {
    this.signalRService.onReciveChat.subscribe((chat: Chat) => {
      this.reciveChat(chat);
    });

    this.signalRService.onListUsersByRoomId.subscribe((roomId: number) => {
      if (this.room.roomId === roomId) {
        this.listUsers();
        this.listUsersOnLine();
      }
    });
  }

  onFormSubmit(form: any) {
    const chatForm = form;

    const newChat: Chat = new Chat();
    newChat.roomId = this.room.roomId!;
    newChat.userId = this.userLogin.userId;
    newChat.date = new Date();
    newChat.type = 'message';
    newChat.message = chatForm.Message

    this.chatsService.insertChat(newChat).subscribe(chat => {
      this.signalRService.SendChat(chat).then(() => {
        this.chatForm = this.formBuilder.group({
          'Message': [null, Validators.required]
        });
      });
    });
  }

  exitChat() {
    const newChat: Chat = new Chat();
    newChat.roomId = this.room.roomId!;
    newChat.userId = this.userLogin.userId;
    newChat.date = new Date();
    newChat.type = 'exit';
    newChat.message = `${this.userLogin.getFullName()} leave the room`;

    this.chatsService.insertChat(newChat).subscribe((chat) => {
      this.signalRService.SendChat(chat).then(() => {
        this.roomUsersService.getRoomUserByRoomIdAndUserId(chat.roomId, chat.userId).subscribe((roomUser) => {
          if (roomUser) {
            roomUser.status = 'offline';
            this.roomUsersService.updateRoomUser(roomUser).subscribe(() => {
              this.router.navigate(['chat/rooms/list']);
            })
          }
        });
      });      
    });
  }

  listChats() {
    this.chats = [];
    this.chatsService.listChatsByRoomId(this.room.roomId!).subscribe(chats => {
      this.chats = chats;
      setTimeout(() => {
        this.scrolltop = this.chatcontent!.nativeElement.scrollHeight
      }, 500);
    });
  }

  reciveChat(chat: Chat) {
    this.chats.push(chat);
    setTimeout(() => {
      this.scrolltop = this.chatcontent!.nativeElement.scrollHeight
    }, 500);
  }

  listUsersOnLine() {
    this.usersOnLine = [];
    this.usersService.listUsersByRoomIdAndUserIdAndStatus(this.room.roomId!, this.userLogin.userId, 'online').subscribe(users => {
      users.forEach(user=>{
        this.usersOnLine.push(new User(user));
      });       
    });
  }

  listUsers() {
    this.users = [];
    this.usersService.listUsersByRoomId(this.room.roomId!).subscribe(users => {
      users.forEach(user=>{
        this.users.push(new User(user));
      });   
    });
  }

  getRoom() {
    this.roomsService.getRoomByRoomId(this.route.snapshot.params["roomId"]).subscribe(room => {
      this.room = room;
      this.listUsers();
      this.listUsersOnLine();
      this.listChats();      
    });
  }

  getUserByUserId(userId: number): User {
    let user: User = this.users.find(u => u.userId === userId)!;
    if (!user) {
      user = new User();
    }
    return user;
  }
 
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
