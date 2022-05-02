import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/bike-stores' },  
  {
    path: 'bike-stores',
    loadChildren: () => import('./features/bike-stores-manager/bike-stores-manager.module').then(m => m.BikeStoresManagerModule)
  },
  { path: '**', pathMatch: 'full', redirectTo: '/bike-stores' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
