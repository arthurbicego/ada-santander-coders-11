import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookListComponent } from './book-list/book-list.component';
import { NewBookComponent } from './new-book/new-book.component';
import { AuthGuard } from 'src/app/auth/auth.guard';
import { EditListComponent } from './edit-list/edit-list.component';

const routes: Routes = [
  {path: 'catalog', component: BookListComponent},
  {path: 'new', component: NewBookComponent, canActivate: [AuthGuard] },
  {path: 'edit', component: EditListComponent, canActivate: [AuthGuard] },
  {path: 'edit/:id', component: NewBookComponent, canActivate: [AuthGuard] },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatalogRoutingModule {}