import { Injectable } from '@angular/core';
import { Report } from '../model/report.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ReportService {



  private baseURL = 'http://localhost:9090/api/reports';

   

  constructor(private httpClient:HttpClient, private authService:AuthService) { }

  getincidentReports(): Observable<Report[]>{
    
    return this.httpClient.get<Report[]>(`${this.baseURL}/incidentReports`, {headers: this.customHeaders} );
  }

  getoutageReports(): Observable<Report[]>{
    
    return this.httpClient.get<Report[]>(`${this.baseURL}/outageReports`, {headers: this.customHeaders} );
  }

  get customHeaders() {
    let tokenStr = "Bearer " + this.authService.accessToken!.replace(/"/g, '');
    console.log(tokenStr);
    console.log(this.authService.accessToken!);
    const headers = new HttpHeaders().set("Authorization", tokenStr);
    return headers;
  }
}
