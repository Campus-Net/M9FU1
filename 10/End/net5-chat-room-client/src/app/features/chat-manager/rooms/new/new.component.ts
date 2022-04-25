import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { RoomsService } from 'src/app/core/services/data/rooms.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {

  roomForm!: FormGroup;
  nickName = '';
  roomName = '';
  matcher = new MyErrorStateMatcher();

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private roomsService: RoomsService
  ) { }

  ngOnInit(): void {
    this.roomForm = this.formBuilder.group({
      'roomName': [null, Validators.required]
    });
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
        this.roomsService.insertRoom(room).subscribe(() => {
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
