import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { data } from 'jquery';

@Injectable({
  providedIn: 'root'
})
export class JwtClientService {


  constructor(private http:HttpClient,  private router: Router) { }

  public generateToken(request: any)
  {
    return this.http.post("http://localhost:9090/api/auth/getToken", request, {responseType : 'text' as 'json'});
  }

  public testaccessApi(token: any){
    let tokenStr = "Bearer " + token.replace(/"/g, '');
    
    const headers = new HttpHeaders().set("Authorization",tokenStr);
      return this.http.get("http://localhost:9090/api/auth/validateJWTToken", {headers, responseType: 'text' as 'json'} );
  }

  public renewToken(token: any) {
    let tokenStr = "Bearer " + token.replace(/"/g, '');
    const headers = new HttpHeaders().set("Authorization", tokenStr);
    return this.http.post("http://localhost:9090/api/auth/renewToken", null, { headers, responseType: 'text' as 'json' });
  }
}
