import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RoomsComponent } from './rooms.component';
import { ListComponent } from './list/list.component';
import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { ChatRoomComponent } from './chat-room/chat-room.component';

const rooms_routes: Routes = [
  {
    path: '',component: RoomsComponent,
    children: [
      { path: 'list', component: ListComponent },
      { path: 'new', component: NewComponent },
      { path: ':roomId/edit', component: EditComponent },
      { path: ':roomId/chats', component: ChatRoomComponent }
    ]
  }
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(rooms_routes)],
  exports: [RouterModule]
})
export class RoomsRoutingModule {
  static components = [
    RoomsComponent,
    ListComponent,
    NewComponent,
    EditComponent,
    ChatRoomComponent
  ]
}
