import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ContainerComponent } from './container/container.component';
import { ApprovementsComponent } from './approvements/approvements.component';
import { RegisterComponent } from './register/register.component';
import { VehicleComponent } from './vehicle/vehicle.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'container', component: ContainerComponent },
  { path: 'approvements', component: ApprovementsComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'vehicle', component: VehicleComponent },// mẫu lấy cái dropdown rồi xóa
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];

