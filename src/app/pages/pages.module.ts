import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RxjsComponent } from './home/rxjs/rxjs.component';

import { SharedModule } from '../shared/shared.module';
import { ComponentsModule } from '../components/components.module';

import { PagesComponent } from './pages.component';

import { AccountSettingsComponent } from './user/account-settings/account-settings.component';
import { ProfileComponent } from './user/profile/profile.component';

import { DashboardComponent } from './home/dashboard/dashboard.component';
import { ProgressComponent } from './home/progress/progress.component';
import { Graph1Component } from './home/graph1/graph1.component';
import { PromisesComponent } from './home/promises/promises.component';

import { UsersComponent } from './maintenance/users/users.component';
import { HospitalsComponent } from './maintenance/hospitals/hospitals.component';
import { DoctorsComponent } from './maintenance/doctors/doctors.component';
import { PipesModule } from '../pipe/pipes.module';
import { DoctorComponent } from './maintenance/doctors/doctor/doctor.component';



@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent,
    ProgressComponent,
    Graph1Component,
    AccountSettingsComponent,
    PromisesComponent,
    RxjsComponent,
    ProfileComponent,
    UsersComponent,
    HospitalsComponent,
    DoctorsComponent,
    DoctorComponent,
  ],
  exports: [
    PagesComponent,
    DashboardComponent,
    ProgressComponent,
    Graph1Component,
    AccountSettingsComponent,
    PromisesComponent,
    RxjsComponent,
    ProfileComponent,
    UsersComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    HttpClientModule,
    FormsModule,
    ComponentsModule,
    RouterModule,
    ReactiveFormsModule,
    PipesModule,
  ]
})
export class PagesModule { }
