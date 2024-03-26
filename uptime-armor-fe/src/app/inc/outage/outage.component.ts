import { Component } from '@angular/core';
import { IncidentEntity, OutageEportToExcel } from '../models/incident';
import { OutageService } from '../service/outage.service';
import { PaginationService } from 'src/app/pagination/pagination.service';
import { ExcelService } from 'src/app/excel-service.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-outage',
  templateUrl: './outage.component.html',
  styleUrls: ['./outage.component.css']
})
export class OutageComponent {

  
  incidents: IncidentEntity[] = [];

  constructor(
    private outageService: OutageService, 
    public ps: PaginationService, 
    private excelService: ExcelService,
    public authService: AuthService
  ){}
  
  async ngOnInit(): Promise<void> {
    await this.getIncidentList(); 
    this.ps.items = this.incidents; 
  }
  
  async getIncidentList(): Promise<void> {
    try {
      const data: any = await this.outageService.getOutageList().toPromise();
      this.incidents = data;
    } catch (error) {
     
    }
  }

  async reload(){
     await this.getIncidentList();
    this.ps.items = this.incidents;
  }

  exportOutageReports(){
    const fileName = 'Outages';
    const sheetName = 'Sheet1';
    
    const outagesForExport: OutageEportToExcel[] = this.ps._filteredItems.map(incident => {
      return new OutageEportToExcel(
        incident.incidentId,
        incident.description,
        incident.category,
        new Date(incident.creationDate), 
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

    this.excelService.exportToExcel(outagesForExport, fileName, sheetName);
    
  }
}
