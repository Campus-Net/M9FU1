import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecurityManagerRoutingModule } from './security-manager-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [SecurityManagerRoutingModule.components],
  imports: [
    CommonModule,
    SecurityManagerRoutingModule,
    SharedModule
  ]
})
export class SecurityManagerModule { }
