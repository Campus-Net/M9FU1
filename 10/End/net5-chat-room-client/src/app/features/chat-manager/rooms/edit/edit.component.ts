import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomsService } from 'src/app/core/services/data/rooms.service';
import { Room } from 'src/app/shared/models/room';
import { MyErrorStateMatcher } from '../new/new.component';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  roomForm!: FormGroup;
  nickName = '';
  roomId = 0;
  roomName = '';
  matcher = new MyErrorStateMatcher();
  room = new Room();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private roomsService: RoomsService
  ) { }

  ngOnInit(): void {
    this.roomForm = this.formBuilder.group({
      'roomId': [null, Validators.required],
      'roomName': [null, Validators.required]
    });

    this.roomForm.get('roomId')?.disable();    

    this.roomId = this.route.snapshot.params['roomId']
    this.getRoomByRoomId(this.roomId);
  }

  private getRoomByRoomId(roomId:number){
    this.roomsService.getRoomByRoomId(roomId).subscribe(room=>{      
      this.room = room;
    })
  }

  onFormSubmit(form: any) {    
    const roomForm = form;
    this.roomsService.getRoomByRoomName(roomForm.roomName).subscribe(room => {
      if (room) {
        this.snackBar.open('Room name already exist!',undefined, {
          duration: 3000,
        });
      } else {        
        room = {          
          roomName: roomForm.roomName
        };
        this.roomsService.editRoom(this.roomId,room).subscribe(() => {
          this.goToRoomList();
        });
      }
    });
  }

  goToRoomList() {
    this.router.navigate(['/chat/rooms/list']);
  }

  public onClickBtnCancel(e:any){
    this.goToRoomList();
  }

}
