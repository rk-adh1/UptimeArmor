import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SecurityComponent } from './security/security.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth/auth.gaurd';
import { BusinessUnitComponent } from './business/business-unit/business-unit.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { EmployeeComponent } from './emp/employee/employee.component';
import { BusinessUnitRegUpdateComponent } from './business/business-unit-reg-update/business-unit-reg-update.component';
import { EmployeeRegUpdateComponent } from './emp/employee-reg-update/employee-reg-update.component';
import { PassUpdateComponent } from './pass-update/pass-update.component';
import { IncidentComment } from './inc/models/comment';
import { IncidentComponent } from './inc/incident/incident.component';
import { IncidentRegUpdateComponent } from './inc/incident-reg-update/incident-reg-update.component';
import { ViewIncidentComponent } from './inc/view-incident/view-incident.component';
import { OutageComponent } from './inc/outage/outage.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReportComponent } from './reports/report/report.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';

const routes: Routes = [
  { path: '', redirectTo: '/aboutUs', pathMatch: 'full' },
  { path: 'aboutUs', component: AboutUsComponent},
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  { path: 'business', component: BusinessUnitComponent, canActivate: [AuthGuard]},
  { path: 'business/:businessUnitId/update', component: BusinessUnitRegUpdateComponent, canActivate: [AuthGuard], data: { requiredRole: 'ROLE_ADMIN' }},
  { path: 'business/register', component: BusinessUnitRegUpdateComponent, canActivate: [AuthGuard], data: { requiredRole: 'ROLE_ADMIN' }},
  { path: 'employee', component: EmployeeComponent, canActivate: [AuthGuard]},
  { path: 'employee/:employeeId/update', component: EmployeeRegUpdateComponent, canActivate: [AuthGuard]},
  { path: 'employee/updatePassword', component:PassUpdateComponent, canActivate:[AuthGuard]},
  { path: 'employee/register', component: EmployeeRegUpdateComponent, canActivate: [AuthGuard]},
  { path: 'incident', component: IncidentComponent, canActivate: [AuthGuard]},
  { path: 'incident/register', component:IncidentRegUpdateComponent, canActivate: [AuthGuard]},
  { path: 'incident/:incidentId/update', component:IncidentRegUpdateComponent, canActivate: [AuthGuard]},
  { path: 'incident/:incidentId/viewIncident', component:ViewIncidentComponent, canActivate:[AuthGuard]},
  { path: 'outage', component:OutageComponent, canActivate: [AuthGuard]},
  // { path: 'dashboard', component:DashboardComponent, canActivate:[AuthGuard]},
  { path: 'reports', component:ReportComponent, canActivate:[AuthGuard]},
  { path: 'unauthorized', component:UnauthorizedComponent},
  { path: 'login', component: SecurityComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
