import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserLogin } from '../../../shared/models/user-login';
import { ValidationService } from '../../../core/services/validation.service';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  errorMessage!: string;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, ValidationService.emailValidator]],
      password: ['', [Validators.required, ValidationService.passwordValidator]]
    });
  }

  public getErrorMessage(control: any) {
    return control.invalid ? ValidationService.getValidatorErrorMessage(Object.keys(control.errors)[0]) : '';
  }

  public submit({ value, valid }: { value: UserLogin, valid: boolean }) {
    const config = new MatSnackBarConfig();
    config.duration = 3000;

    this.authService.login(value).subscribe(() => {
        if (this.authService.isAuthenticated) {
          this.snackBar.open('Logged in', undefined, config);

          if (this.authService.redirectUrl) {
            const redirectUrl = this.authService.redirectUrl;
            this.authService.redirectUrl = '';
            this.router.navigate([redirectUrl]);
          } else {
            this.router.navigate(['/chat']);
          }
        } else {
          const loginError = 'Unable to login';
          this.errorMessage = loginError;          
          this.snackBar.open(loginError, undefined, config);
        }
      }, (error) => {
        const loginError = 'Unable to login';
        this.errorMessage = loginError;
        this.snackBar.open(loginError, undefined, config);
      })
  }
}
