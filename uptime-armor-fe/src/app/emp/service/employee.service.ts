import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { EmployeeEntity } from '../models/employee.entity';
import { EmployeeModel } from '../models/employee.model';
import { ManagerModel } from '../models/manager.model';
import { BusinessUnitID } from '../models/business-unit-id.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private baseURL = 'http://localhost:9090/api/employee';

   

  constructor(private httpClient:HttpClient, private authService:AuthService) { }

  getEmployeeList(): Observable<EmployeeEntity[]>{
    
    return this.httpClient.get<EmployeeEntity[]>(`${this.baseURL}/listEmployees`, {headers: this.customHeaders} );
  }

  createEmployee(employeeModel: EmployeeModel): Observable<object>{
   
    return this.httpClient.post(`${this.baseURL}/register`, employeeModel, {headers: this.customHeaders});
  } 

  getEmployeeById(employeeId: string): Observable<EmployeeEntity>
  {
    return this.httpClient.get<EmployeeEntity>(`${this.baseURL}/employeeDetails/${employeeId}`, {headers: this.customHeaders});
  }

  updateEmployee(employeeId:string, EmployeeModel:EmployeeModel): Observable<object>{
    return this.httpClient.post(`${this.baseURL}/update/${employeeId}`, EmployeeModel, { headers: this.customHeaders});
  }

  deleteEmployee(employeeId:string): Observable<object>{
    return this.httpClient.get(`${this.baseURL}/delete/${employeeId}`, {headers: this.customHeaders, responseType:'text' as 'json'});
  }

  getManagers(): Observable<ManagerModel[]>{
    return this.httpClient.get<ManagerModel[]>(`${this.baseURL}/listManagers`, {headers: this.customHeaders} );
  }

  getBusinessUnits(): Observable<BusinessUnitID[]>{
    return this.httpClient.get<BusinessUnitID[]>(`${this.baseURL}/businessUnitList`, {headers: this.customHeaders})
  }

  get customHeaders() {
    let tokenStr = "Bearer " + this.authService.accessToken!.replace(/"/g, '');
    console.log(tokenStr);
    console.log(this.authService.accessToken!);
    const headers = new HttpHeaders().set("Authorization", tokenStr);
    return headers;
  }

}
