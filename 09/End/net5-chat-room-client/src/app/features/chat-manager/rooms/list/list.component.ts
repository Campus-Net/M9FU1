import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomsService } from 'src/app/core/services/data/rooms.service';
import { SignalRService } from 'src/app/core/services/signal-r.service';
import { Room } from 'src/app/shared/models/room';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  displayedColumns: string[] = ['roomId','roomName'];
  rooms: Room[] = [];
  isLoadingResults = true;
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private roomsService: RoomsService,
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
  
  }
}
