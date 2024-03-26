import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { EmployeeEntity } from '../emp/models/employee.entity';
import { EmployeeService } from '../emp/service/employee.service';
import { data } from 'jquery';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  employee: EmployeeEntity = new EmployeeEntity();

  constructor(private employeeService:EmployeeService, private authService:AuthService){

  }

  ngOnInit(){
    this.loadMyDetails();
  }


  loadMyDetails(){
    this.employeeService.getEmployeeById(this.authService.currentUserId!).subscribe(data =>
      this.employee = data);
  }
  }
 
