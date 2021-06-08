import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { PagesComponent } from './pages.component';


const routes: Routes = [
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    component: PagesComponent,
    canLoad: [AuthGuard],
    loadChildren: () => import('./child-routing.module').then(module => module.ChildRoutingModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: [],
})
export class PagesRoutingModule {
}
