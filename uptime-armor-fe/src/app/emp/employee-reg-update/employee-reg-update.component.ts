import { Component } from '@angular/core';
import { EmployeeService } from '../service/employee.service';
import { Router, ActivatedRoute } from '@angular/router';
import { EmployeeModel } from '../models/employee.model';
import { ManagerModel } from '../models/manager.model';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { BusinessUnitID } from '../models/business-unit-id.model';
import { AuthService } from 'src/app/auth/auth.service';
import { NavigationHistoryService } from 'src/app/navigation-history.service';

@Component({
  selector: 'app-employee-reg-update',
  templateUrl: './employee-reg-update.component.html',
  styleUrls: ['./employee-reg-update.component.css']
})
export class EmployeeRegUpdateComponent {

  
  employeeM: EmployeeModel = new EmployeeModel();
  managers: Observable<ManagerModel[]>;
  businessUnits: Observable<BusinessUnitID[]> ; 
  selectedManagerId: string = '';
  selectedBUId: string= '';
  selectedGender: string= '';
  showOtherInput: boolean = false;
  otherGender: string = '';
 

  isUpdating: boolean = false;
  employeeId: string = "";
  email: string = "";


  constructor(
    private employeeService: EmployeeService, 
    private router: Router, 
    private route: ActivatedRoute, 
    public authService: AuthService,
    public nhs: NavigationHistoryService
    ){}

  ngOnInit(): void {
    this.getManagers();
    this.getBusinessUnits();
    this.route.params.subscribe(params => {
      if (params['employeeId']) {
          this.isUpdating = true; 
          this.employeeId = params['employeeId'];
          this.loadEmployee(this.employeeId);
      }
  });
  }

  getManagers(): void {
    this.employeeService.getManagers().subscribe(
      (data: ManagerModel[]) => {
        this.managers = of(data);
      }
    );
  }

  getBusinessUnits(): void{
    this.employeeService.getBusinessUnits().subscribe(
      (data: BusinessUnitID[]) => {
        this.businessUnits = of(data);
      }
    )
  }

  loadEmployee(employeeId: string): void {
    this.email = employeeId+"@uptimeaprmor.edu";
    this.employeeService.getEmployeeById(employeeId).subscribe(
      (data: any) => {
          this.employeeM = {
              password: data.password,
              firstName: data.firstName,
              lastName: data.lastName,
              dateOfBirth: data.dateOfBirth,
              gender: data.gender,
              address: data.address,
              phoneNumber: data.phoneNumber,
              jobTitle: data.jobTitle,
              managerId: data.managerId,
              employmentStatus: data.employmentStatus,
              role: data.role,
              businessUnit: {
                businessUnitId: data.businessUnit?.businessUnitId || '',
                businessUnitName: data.businessUnit?.businessUnitName || ''
            }
          };
          this.selectedManagerId = this.employeeM.managerId;
          this.selectedBUId = this.employeeM.businessUnit.businessUnitId;
          if(this.employeeM.gender !== "Male" && this.employeeM.gender !== "Female"){
            this.selectedGender = "Other";
            this.showOtherInput = true;
            this.otherGender = this.employeeM.gender;
          }       
          else{
            this.selectedGender = this.employeeM.gender;
          }
            console.log("Manager", this.selectedManagerId);
           
      }
  );
}

saveEmployee(){
    this.employeeM.managerId = this.selectedManagerId;
    this.employeeM.businessUnit.businessUnitId = this.selectedBUId;
    if(this.selectedGender === "Other")
    {
      this.employeeM.gender = this.otherGender;
    }
    this.employeeService.createEmployee(this.employeeM).subscribe(data => 
      console.log(data));
      this.goToEmployeeList();
}

goToEmployeeList(){

    this.router.navigate(['/employee']);
  }

  updateEmployee(): void {
    this.employeeM.managerId = this.selectedManagerId;
    this.employeeM.businessUnit.businessUnitId = this.selectedBUId;
    if(this.selectedGender === "Other")
    {
      this.employeeM.gender = this.otherGender;
    }
    this.employeeService.updateEmployee(this.employeeId, this.employeeM).subscribe(response => {
    });
    this.goToEmployeeList();
  }

  onSubmit(){
    if (this.isUpdating) {
      this.updateEmployee();
    } 
    else {
    this.saveEmployee();
    }
  }

 

  onGenderChange(event: any) {
    const selectedValue = event?.target?.value;
    if (selectedValue) {
      this.showOtherInput = selectedValue === 'Other';
      if (!this.showOtherInput && !this.isUpdating) {
        this.otherGender = '';
      }
    }

  }

  cancel()
  {
    const previousUrl = this.nhs.getPreviousUrl();
    if (previousUrl) {
      this.router.navigateByUrl(previousUrl);
    } else {
      this.router.navigateByUrl('employee');
    }
  }

  today: Date = new Date();

  validateDateOfBirth(dateOfBirthControl: any) {
    const selectedDate = new Date(dateOfBirthControl.value);
    const eighteenYearsAgo = new Date();
    eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18);

    if (selectedDate.getTime() > this.today.getTime() || selectedDate.getTime() > eighteenYearsAgo.getTime()) {
      dateOfBirthControl.control.setErrors({ 'invalidDate': true });
    } else {
      dateOfBirthControl.control.setErrors(null);
    }
  }


  validatePhoneNumber(phoneNumber: string) {
    console.log(phoneNumber);
    const phoneNumberPattern = /^\d{10}$/; 
    return phoneNumberPattern.test(phoneNumber);
     
  }

}