import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private apiUrl = 'https://localhost:7043/api/User';
   isConnected:boolean=false
   isAdmin:boolean=false
  constructor(private http:HttpClient) { }
  login(credentials: { email: string; password: string }): Observable<any> {
 
    console.log("in auth service login");
    console.log(`${this.apiUrl}/auth/login`);
    return this.http.post(`${this.apiUrl}/auth/login`, credentials);//check

  }
}
