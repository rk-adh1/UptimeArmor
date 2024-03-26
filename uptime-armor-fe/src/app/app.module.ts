import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { SecurityComponent } from './security/security.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth.gaurd';
import { BusinessUnitComponent } from './business/business-unit/business-unit.component';
import { BusinessUnitRegUpdateComponent } from './business/business-unit-reg-update/business-unit-reg-update.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { EmployeeComponent } from './emp/employee/employee.component';
import { EmployeeRegUpdateComponent } from './emp/employee-reg-update/employee-reg-update.component';
import { PassUpdateComponent } from './pass-update/pass-update.component';
import { IncidentComponent } from './inc/incident/incident.component';
import { IncidentRegUpdateComponent } from './inc/incident-reg-update/incident-reg-update.component';
import { ViewIncidentComponent } from './inc/view-incident/view-incident.component';
import { TimezonePipe } from './timezone.pipe';
import { OutageComponent } from './inc/outage/outage.component';
import { ReportComponent } from './reports/report/report.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgxChartsModule } from '@swimlane/ngx-charts';



@NgModule({
  declarations: [
    AppComponent,
    SecurityComponent,
    HeaderComponent,
    HomeComponent,
    BusinessUnitRegUpdateComponent,
    BusinessUnitComponent,
    AboutUsComponent,
    EmployeeComponent,
    BusinessUnitRegUpdateComponent,
    EmployeeRegUpdateComponent,
    PassUpdateComponent,
    IncidentComponent,
    IncidentRegUpdateComponent,
    TimezonePipe,
    ViewIncidentComponent,
    OutageComponent,
    ReportComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    DragDropModule,
    CommonModule,
    NgxChartsModule
    
  ],
  providers: [AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
