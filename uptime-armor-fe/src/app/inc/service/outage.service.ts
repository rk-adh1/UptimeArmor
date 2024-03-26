import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IncidentEntity } from '../models/incident';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from 'src/app/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class OutageService {

  constructor(private httpClient:HttpClient, private authService: AuthService) { }


  private baseURL = 'http://localhost:9090/api/outage';

  getOutageList(): Observable<IncidentEntity[]>{
    
    return this.httpClient.get<IncidentEntity[]>(`${this.baseURL}/incidentList`, {headers: this.customHeaders} );
  }

  get customHeaders() {
    let tokenStr = "Bearer " + this.authService.accessToken!.replace(/"/g, '');
    console.log(tokenStr);
    console.log(this.authService.accessToken!);
    const headers = new HttpHeaders().set("Authorization", tokenStr);
    return headers;
  }
}
