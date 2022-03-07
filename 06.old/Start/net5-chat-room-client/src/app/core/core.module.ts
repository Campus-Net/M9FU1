import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnsureModuleLoadedOnceGuard } from './ensure-module-loaded-once-guard';
import { UsersService } from './services/data/users.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    UsersService
  ]
})

export class CoreModule extends EnsureModuleLoadedOnceGuard {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    super(parentModule);
  }
}