
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard'

const routes: Routes = [
  {
    path: 'books', loadChildren: () => import('./components/catalog/catalog.module').then((m) => m.CatalogModule)
  },
  {
    path: 'login', loadChildren: () => import('./components/login/login.module').then((m) => m.LoginModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
