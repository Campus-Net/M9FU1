import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AppUserAuth } from '../../../shared/models/app-user-auth';
import { AuthService } from '../../../core/services/auth.service';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';

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

  
  profileForm!: FormGroup;
  user!: AppUserAuth;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.buildForm();
    this.user = this.authService.appUserAuth;
  }

  private buildForm() {
    this.profileForm = this.formBuilder.group({      
      firstName: ['', []],
      lastName: ['', []],
      address: ['', []],
      dateOfBirth: ['', []],
      sex: ['', []],      
      password: ['', []]
    });
  }
}
