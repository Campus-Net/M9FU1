import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandsComponent } from './brands.component';
import { DeleteComponent } from './delete/delete.component';
import { EditComponent } from './edit/edit.component';
import { ListComponent } from './list/list.component';
import { NewComponent } from './new/new.component';

const brands_routes: Routes = [
  {
    path: '', component: BrandsComponent,
    children: [
      { path: 'list', component: ListComponent },
      { path: 'new', component: NewComponent },
      { path: ':brandId/edit', component: EditComponent },
      { path: ':brandId/delete', component: DeleteComponent }
    ]
  }
]


@NgModule({
  imports: [RouterModule.forChild(brands_routes)],
  exports: [RouterModule]
})
export class BrandsRoutingModule {
  static components = [
    BrandsComponent,
    ListComponent,
    NewComponent,
    EditComponent,
    DeleteComponent
  ]
}
