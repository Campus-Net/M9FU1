import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrandsRoutingModule } from './brands-routing.module';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  declarations: [BrandsRoutingModule.components],
  imports: [
    CommonModule,
    BrandsRoutingModule,
    SharedModule
  ]
})
export class BrandsModule { }
