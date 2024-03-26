import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { BusinessUnitIdModel, EmployeeIdModel, IncidentEntity, IncidentModel } from '../models/incident';
import { Observable } from 'rxjs';
import { Comment, CommentModel } from '../models/comment';

@Injectable({
  providedIn: 'root'
})
export class IncidentService {


  private baseURL = 'http://localhost:9090/api/incident';

   

  constructor(private httpClient:HttpClient, private authService:AuthService) { }

  getIncidentList(): Observable<IncidentEntity[]>{
    
    return this.httpClient.get<IncidentEntity[]>(`${this.baseURL}/incidentList`, {headers: this.customHeaders} );
  }

  createIncident(incidentModel: IncidentModel): Observable<object>{
   
    return this.httpClient.post(`${this.baseURL}/register`, incidentModel, {headers: this.customHeaders});
  } 

  getIncidentById(incidentId: string): Observable<IncidentEntity>
  {
    return this.httpClient.get<IncidentEntity>(`${this.baseURL}/incidentDetails/${incidentId}`, {headers: this.customHeaders});
  }

  updateIncident(incidentId:string, incidentModel:IncidentModel): Observable<object>{
    return this.httpClient.post(`${this.baseURL}/update/${incidentId}`, incidentModel, { headers: this.customHeaders});
  }

  deleteIncident(incidentId:string): Observable<object>{
    return this.httpClient.delete(`${this.baseURL}/delete/${incidentId}`, {headers: this.customHeaders});
  }

  getEmployeesbyBUId(businessUnitId:string): Observable<EmployeeIdModel[]>{
    return this.httpClient.get<EmployeeIdModel[]>(`${this.baseURL}/listEmployeesByBUId/${businessUnitId}`, {headers: this.customHeaders} );
  }

  getBusinessUnits(): Observable<BusinessUnitIdModel[]>{
    return this.httpClient.get<BusinessUnitIdModel[]>(`${this.baseURL}/listBusinessUnits`, {headers: this.customHeaders});
  }

  getCommentsByIncidentId(incidentId:string): Observable<Comment[]>{
    return this.httpClient.get<Comment[]>(`http://localhost:9090/api/comment/getCommentsByIncidentId/${incidentId}`, {headers: this.customHeaders});
  }

  addComment(commentM:CommentModel): Observable<Comment> {
    return this.httpClient.post<Comment>(`http://localhost:9090/api/comment/addComment`, commentM,  {headers: this.customHeaders});
  }

  deleteComment(commentId: string): Observable<object> {
    return this.httpClient.delete<Comment>(`http://localhost:9090/api/comment/delete/${commentId}`,   {headers: this.customHeaders, responseType:'text' as 'json'});

  } 


  get customHeaders() {
    let tokenStr = "Bearer " + this.authService.accessToken!.replace(/"/g, '');
    console.log(tokenStr);
    console.log(this.authService.accessToken!);
    const headers = new HttpHeaders().set("Authorization", tokenStr);
    return headers;
  }

}
