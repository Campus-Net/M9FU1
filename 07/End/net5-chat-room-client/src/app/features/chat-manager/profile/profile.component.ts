import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AppUserAuth } from '../../../shared/models/app-user-auth';
import { AuthService } from '../../../core/services/auth.service';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { UsersService } from 'src/app/core/services/data/users.service';
import { UserForUpdate } from 'src/app/shared/models/user-for-update';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

export const MY_FORMATS = {
  parse: {
      dateInput: 'LL'
  },
  display: {
      dateInput: 'DD-MM-YYYY',
      monthYearLabel: 'YYYY',
      dateA11yLabel: 'LL',
      monthYearA11yLabel: 'YYYY'
  }
};

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers:[
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }
  ]
})
export class ProfileComponent implements OnInit {

  sexes : any[] = [
    {value: 1, viewValue: 'Male'},
    {value: 2, viewValue: 'Feminine'}    
  ];

  profileForm!: FormGroup;
  user!: AppUserAuth;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private usersService: UsersService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {    
    this.user = this.authService.appUserAuth;
    this.buildForm(this.user);
  }

  private buildForm(user:AppUserAuth) {
    this.profileForm = this.formBuilder.group({
      userId: [null, []],
      email: [null, []],
      firstName: [null, []],
      lastName: [null, []],
      address: [null, []],
      dateOfBirth: [null, []],
      sex: [null, []],
      password: [null, []]
    });

    this.profileForm.get('userId')?.disable();
    this.profileForm.get('email')?.disable();    
  }

  public submit(){    
    debugger
    this.usersService.editUser(this.user.userId,this.user).subscribe(()=>{      
      debugger
      this.authService.updateLogin(this.user).subscribe(()=>{
        debugger
        const config = new MatSnackBarConfig();
        config.duration = 3000;
        this.snackBar.open('User updated!!', undefined, config);
      });
    });
  }
}
