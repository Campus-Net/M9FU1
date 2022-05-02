import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BikeStoresManagerRoutingModule } from './bike-stores-manager-routing.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [BikeStoresManagerRoutingModule.components],
  imports: [
    CommonModule,
    BikeStoresManagerRoutingModule,
    SharedModule
  ]
})
export class BikeStoresManagerModule { }
