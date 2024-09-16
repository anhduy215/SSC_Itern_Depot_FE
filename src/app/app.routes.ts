import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ContainerComponent } from './container/container.component';
import { InoutComponent } from './inout/inout.component';
import { CommandComponent } from './command/command.component';
import { VehicleComponent } from './vehicle/vehicle.component';
import { VoyageComponent } from './voyage/voyage.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'container', component: ContainerComponent },
  { path: 'movement', component: InoutComponent },
  { path: 'command', component: CommandComponent },
  { path: 'vehicle', component: VehicleComponent },
  { path: 'voyage', component: VoyageComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];

