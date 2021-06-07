import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RxjsComponent } from './home/rxjs/rxjs.component';
import { AuthGuard } from '../guards/auth.guard';
import { PagesComponent } from './pages.component';
import { AccountSettingsComponent } from './user/account-settings/account-settings.component';
import { Graph1Component } from './home/graph1/graph1.component';
import { ProgressComponent } from './home/progress/progress.component';
import { PromisesComponent } from './home/promises/promises.component';
import { DashboardComponent } from './home/dashboard/dashboard.component';
import { ProfileComponent } from './user/profile/profile.component';
import { UsersComponent } from './maintenance/users/users.component';
import { HospitalsComponent } from './maintenance/hospitals/hospitals.component';
import { DoctorsComponent } from './maintenance/doctors/doctors.component';
import { DoctorComponent } from './maintenance/doctors/doctor/doctor.component';


const routes: Routes = [
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    component: PagesComponent,
    children: [
      // Users routes
      { path: 'profile', component: ProfileComponent, data: { titulo: 'Profile' } },
      { path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'AcountSettings' } },

      // Home routes
      { path: '', component: DashboardComponent, data: { titulo: 'Dashboard' } },
      { path: 'progress', component: ProgressComponent, data: { titulo: 'ProgressBar' } },
      { path: 'graph1', component: Graph1Component, data: { titulo: 'Graphic' } },
      { path: 'promises', component: PromisesComponent, data: { titulo: 'Promises' } },
      { path: 'rxjs', component: RxjsComponent, data: { titulo: 'RXJS' } },

      // Maintenance routes
      { path: 'users', component: UsersComponent, data: { titulo: 'Users' } },
      { path: 'hospitals', component: HospitalsComponent, data: { titulo: 'Hospitals' } },
      { path: 'doctors', component: DoctorsComponent, data: { titulo: 'Doctors' } },
      { path: 'doctor/:id', component: DoctorComponent, data: { titulo: 'Doctor' } },
      { path: 'doctor', component: DoctorComponent, data: { titulo: 'Doctor' } },

      ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: [],
})
export class PagesRoutingModule {
}
