import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { UsersService } from 'src/app/core/services/data/users.service';
import { AppUserAuth } from '../../../shared/models/app-user-auth';

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
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  providers:[
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }
  ]
})
export class SignUpComponent implements OnInit {

  user!: AppUserAuth;
  sexes : any[] = [
    {value: 1, viewValue: 'Male'},
    {value: 2, viewValue: 'Feminine'}    
  ];

  signUpForm!: FormGroup;  

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private usersService: UsersService,
    private snackBar: MatSnackBar,
    private router:Router
  ) { 
    this.user = new AppUserAuth();
  }

  ngOnInit(): void {    
    this.user = this.authService.getUserLoggedIn();
    this.buildForm(this.user);
  }

  private buildForm(user:AppUserAuth) {
    this.signUpForm = this.formBuilder.group({
      userId: [null, []],
      email: [null, []],
      firstName: [null, []],
      lastName: [null, []],
      address: [null, []],
      dateOfBirth: [null, []],
      sex: [null, []],
      password: [null, []]
    });

    this.signUpForm.get('userId')?.disable();    
  }

  public submit(){
    this.usersService.AddUser(this.user).subscribe(()=>{
        const config = new MatSnackBarConfig();
        config.duration = 3000;
        this.snackBar.open('User registered!!', undefined, config);
        this.router.navigate(['security/login']);      
    });
  }

  public cancel(e:any){
    this.router.navigate(['security/login']);
  }

}
