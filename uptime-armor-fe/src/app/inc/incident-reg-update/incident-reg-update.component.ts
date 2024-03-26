import { Component } from '@angular/core';
import { BusinessUnitIdModel, EmployeeIdModel, IncidentModel } from '../models/incident';
import { Observable, of } from 'rxjs';
import { IncidentService } from '../service/incident.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { NavigationHistoryService } from 'src/app/navigation-history.service';

@Component({
  selector: 'app-incident-reg-update',
  templateUrl: './incident-reg-update.component.html',
  styleUrls: ['./incident-reg-update.component.css']
})
export class IncidentRegUpdateComponent {

  
  incidentM: IncidentModel = new IncidentModel();
  employees: Observable<EmployeeIdModel[]>;
  businessUnits: Observable<BusinessUnitIdModel[]>;
  selectedAssigneeId: string = '';
  selectedBUId: string = '';
 

  isUpdating: boolean = false;
  incidentId: string = "";


  constructor(
    private incidentService: IncidentService, 
    private router: Router, 
    private route: ActivatedRoute, 
    private authService: AuthService, 
    private nhs: NavigationHistoryService
    ){}

  ngOnInit(): void {
    this.getBusinessUnits();
    this.route.params.subscribe(params => {
      if (params['incidentId']) {
          this.isUpdating = true; 
           this.incidentId = params['incidentId'];
          this.loadIncident(this.incidentId);
      }
  });

  }

  getBusinessUnits(): void{
    this.incidentService.getBusinessUnits().subscribe(
      (data: BusinessUnitIdModel[]) => {this.businessUnits = of(data)}
    );
  }

  getEmployees(businessUnitId:string): void {
    this.incidentService.getEmployeesbyBUId(businessUnitId).subscribe(
      (data: EmployeeIdModel[]) => {
        this.employees = of(data);
      }
    );
  }

  loadIncident(incidentId: string): void {
    
    this.incidentService.getIncidentById(incidentId).subscribe(
      (data: any) => {
          console.log(data);
          this.incidentM={
            description: data.description,
            creationDate: data.creationDate,
            closedDate: data.closedDate,
            category:data.category,
            severity:data.severity,
            priority:data.priority,
            reporter:{
              employeeId: data.reporter.employeeId,
              firstName: data.reporter.firstName,
              lastName: data.reporter.lastName
            },
            assignee:{
              employeeId: data.assignee.employeeId,
              firstName: data.assignee.firstName,
              lastName: data.assignee.lastName
            },
            businessUnit:{
              businessUnitId: data.businessUnit.businessUnitId,
              businessUnitName: data.businessUnit.businessUnitName
            },
            status: data.status,
            resolution: data.resolution

          };
          
          this.selectedBUId = data.businessUnit.businessUnitId;
          this.getEmployees(this.selectedBUId);
          this.selectedAssigneeId = data.assignee.employeeId;
      }
  );
  console.log("IncidentM details :", this.incidentM);
}

  saveIncident(){
    
    this.incidentM.reporter.employeeId = this.authService.currentUserId!;
     this.incidentM.businessUnit.businessUnitId = this.selectedBUId;
     this.incidentM.assignee.employeeId = this.selectedAssigneeId;
    console.log("Creating Incident", this.incidentM);
    this.incidentService.createIncident(this.incidentM).subscribe(data => 
      console.log(data));
      this.goToIncientsList();
  }

  goToIncientsList(){

    this.router.navigate(['/incident']);
  }

  updateIncident(): void {
     this.incidentM.reporter.employeeId = this.authService.currentUserId!;
     this.incidentM.businessUnit.businessUnitId = this.selectedBUId;
     this.incidentM.assignee.employeeId = this.selectedAssigneeId;
    console.log("UpdateIncident Updated Details: ", this.incidentM );
    this.incidentService.updateIncident(this.incidentId, this.incidentM).subscribe(response => {
      console.log("Update Incident Response: ", response)
    });
    this.goToIncientsList();
  }

  onSubmit(){
    if (this.isUpdating) {
      this.updateIncident();
    } 
    else {
    this.saveIncident();
    }
  }

  onBusinessUnitChange(event: any){
    const selectedValue = event?.target?.value;
    if(selectedValue){
      this.getEmployees(this.selectedBUId);
    }
  }

  cancel(){
    const previousUrl = this.nhs.getPreviousUrl();
    if (previousUrl) {
      this.router.navigateByUrl(previousUrl);
    } else {
      this.router.navigateByUrl('incident');
    }
  }


  closedDateError = false;

  checkClosedDateValidity() {
    const creationDate = new Date(this.incidentM.creationDate);
    const closedDate = new Date(this.incidentM.closedDate);
    if (closedDate <= creationDate) {
      this.closedDateError = true;
    } else {
      this.closedDateError = false;
    }
  }


 

}
