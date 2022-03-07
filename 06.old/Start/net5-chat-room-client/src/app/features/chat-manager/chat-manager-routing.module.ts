import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ChatManagerComponent } from './chat-manager.component';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavComponent } from './navigation/sidenav/sidenav.component';

const chat_routes: Routes = [
  {path: '',component: ChatManagerComponent}
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(chat_routes)],
  exports: [RouterModule]
})
export class ChatManagerRoutingModule {
  static componets = [
    ChatManagerComponent,
    HeaderComponent,
    SidenavComponent
  ]
}
