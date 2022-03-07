import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/chat' },
  {
    path: 'security',
    loadChildren: () => import('./features/security-manager/security-manager.module').then(m => m.SecurityManagerModule)
  },
  {
    path: 'chat',
    loadChildren: () => import('./features/chat-manager/chat-manager.module').then(m => m.ChatManagerModule)
  },
  { path: '**', pathMatch: 'full', redirectTo: '/chat' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
