import { Component } from '@angular/core';
import { IncidentEntity, IncidentExportToExcel } from '../models/incident';
import { IncidentService } from '../service/incident.service';
import { Router } from '@angular/router';
import { coerceStringArray } from '@angular/cdk/coercion';
import { PaginationService } from 'src/app/pagination/pagination.service';
import { ExcelService } from 'src/app/excel-service.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-incident',
  templateUrl: './incident.component.html',
  styleUrls: ['./incident.component.css']
})
export class IncidentComponent {
  
  incidents:IncidentEntity[] = [];
  incidentsExport:IncidentEntity [] = [];

  constructor(private incidentService: IncidentService, 
    private router: Router, 
    public ps: PaginationService, 
    private excelService: ExcelService,
    public authService: AuthService 
    ){}

  async ngOnInit():Promise<void>{
    await this.getIncidentList();
    this.ps.items = this.incidents;
    console.log("inside onInit: ", this.incidents);
  }

  async getIncidentList(): Promise<void>{
    try {
      const data: any = await this.incidentService.getIncidentList().toPromise();
      this.incidents = data;
    } catch (error) {
      alert("Error retriveing Data, please try agian or relogin");
     
    }
  }
 
   async reload(){
    await this.getIncidentList();
    this.ps.items = this.incidents;
  }

  exportIncidentReports(){
    if(this.authService.isEmployee() || this.authService.isManager()) {
    const fileName = 'Incidents';
    const sheetName = 'Sheet1';
    
    const incidentsForExport: IncidentExportToExcel[] = this.ps._filteredItems.map(incident => {
      return new IncidentExportToExcel(
        incident.incidentId,
        incident.description,
        incident.category,
        new Date(incident.creationDate), // Assuming creationDate is a string in ISO format
        incident.closedDate ? new Date(incident.closedDate) : null,
        incident.severity,
        incident.priority,
        incident.businessUnit ? incident.businessUnit.businessUnitName : '', 
        incident.reporter ? `${incident.reporter.employeeId} ${incident.reporter.firstName} ${incident.reporter.lastName}` : '', 
        incident.assignee ? `${incident.assignee.employeeId} ${incident.assignee.firstName} ${incident.assignee.lastName}` : '', 
        incident.status,
        incident.resolution
      );
    });

    this.excelService.exportToExcel(incidentsForExport, fileName, sheetName);
  }
  else{
    this.authService.logout();
  }
  }

}



