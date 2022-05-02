import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './categories.component';
import { DeleteComponent } from './delete/delete.component';
import { EditComponent } from './edit/edit.component';
import { ListComponent } from './list/list.component';
import { NewComponent } from './new/new.component';

const categories_routes: Routes = [
  {
    path: '', component: CategoriesComponent,
    children: [
      { path: 'list', component: ListComponent },
      { path: 'new', component: NewComponent },
      { path: ':categoryId/edit', component: EditComponent },
      { path: ':categoryId/delete', component: DeleteComponent }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(categories_routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule {
  static components = [
    CategoriesComponent,
    ListComponent,
    NewComponent,
    EditComponent,
    DeleteComponent
  ]
}
