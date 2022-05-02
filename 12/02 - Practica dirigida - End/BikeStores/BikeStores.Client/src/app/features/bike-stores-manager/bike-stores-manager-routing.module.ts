import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BikeStoresManagerComponent } from './bike-stores-manager.component';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavComponent } from './navigation/sidenav/sidenav.component';

const bike_stores_routes: Routes = [
  {
    path: '', component: BikeStoresManagerComponent,
    children: [
      { path: 'brands', loadChildren: () => import('./brands/brands.module').then(m => m.BrandsModule) }
    ]
  }
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(bike_stores_routes)],
  exports: [RouterModule]
})
export class BikeStoresManagerRoutingModule {
  static components = [
    BikeStoresManagerComponent,
    HeaderComponent,
    SidenavComponent
  ]
}
