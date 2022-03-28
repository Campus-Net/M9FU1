import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatManagerRoutingModule } from './chat-manager-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [ChatManagerRoutingModule.components],
  imports: [
    CommonModule,
    ChatManagerRoutingModule,
    SharedModule
  ]
})
export class ChatManagerModule { }
