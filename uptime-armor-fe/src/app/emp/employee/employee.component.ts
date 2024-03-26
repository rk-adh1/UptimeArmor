import { Component } from '@angular/core';
import { Employee, EmployeeModel } from '../models/employee.model';
import { EmployeeEntity } from '../models/employee.entity';
import { EmployeeService } from '../service/employee.service';
import { Router } from '@angular/router';
import { PaginationService } from 'src/app/pagination/pagination.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent {

  employees:Employee[] = [];

  constructor(
    private employeeService: EmployeeService, 
    private router: Router, 
    public ps:PaginationService,
    public authService: AuthService
    ){}

  async ngOnInit():Promise<void>{
    await this.getEmployeeList();
    this.ps.items = this.employees;
    
  }

  async getEmployeeList(): Promise<void> {
   try{
    const data : any= await this.employeeService.getEmployeeList().toPromise();
    this.employees = data;
   }
   catch(error)
   {
    alert("Error retriving Data, please try again or relogin");
   }
  }

  toggleDetails(employee: Employee) {
    employee.showDetails = !employee.showDetails;
  }

  async reload(){
    await this.getEmployeeList();
    this.ps.items = this.employees;
  }

 }
