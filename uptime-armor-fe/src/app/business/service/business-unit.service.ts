import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BusinessUnitEntity } from '../models/business-unit.entity';
import { Observable } from 'rxjs';
import { BusinessUnitModel } from '../models/business-unit.model';
import { AuthService } from 'src/app/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class BusinessUnitService {

  private baseURL = 'http://localhost:9090/api/businessUnit';

   

  constructor(private httpClient:HttpClient, private authService:AuthService) { }

  getBusinessUnitList(): Observable<BusinessUnitEntity[]>{
    
    return this.httpClient.get<BusinessUnitEntity[]>(`${this.baseURL}/businessUnitList`, {headers: this.customHeaders} );
  }

  createBusinessUnit(businessUnitModel: BusinessUnitModel): Observable<object>{
   
    return this.httpClient.post(`${this.baseURL}/register`, businessUnitModel, {headers: this.customHeaders});
  } 

  getBusinessUnitById(businessUnitId: string): Observable<BusinessUnitEntity>
  {
    
    return this.httpClient.get<BusinessUnitEntity>(`${this.baseURL}/businessUnitDetails/${businessUnitId}`, {headers: this.customHeaders});
  }

  updateBusinessUnit(businessUnitId:string, businessUnitModel:BusinessUnitModel): Observable<object>{
    return this.httpClient.post(`${this.baseURL}/update/${businessUnitId}`, businessUnitModel, { headers: this.customHeaders});
  }

  deleteBusinessUnit(businessUnitId:string): Observable<object>{
    return this.httpClient.delete(`${this.baseURL}/delete/${businessUnitId}`, {headers: this.customHeaders, responseType: 'text' as 'json'});
  }

  get customHeaders() {
    let tokenStr = "Bearer " + this.authService.accessToken!.replace(/"/g, '');
    console.log(tokenStr);
    console.log(this.authService.accessToken!);
    const headers = new HttpHeaders().set("Authorization", tokenStr);
    return headers;
  }
  
}
