import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SecurityManagerComponent } from './security-manager.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';

const security_manager_routes: Routes = [
  {
    path: '', component: SecurityManagerComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'sign-up', component: SignUpComponent }
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(security_manager_routes)],
  exports: [RouterModule]
})
export class SecurityManagerRoutingModule {
  static components = [
    SecurityManagerComponent,
    LoginComponent,
    SignUpComponent
  ]
}

