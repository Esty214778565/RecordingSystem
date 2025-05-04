import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  // private apiUrl = 'https://localhost:7043/api/auth/login';
  private apiUrl = 'https://recordingsystem-server.onrender.com/api/auth/login';
  isConnected: boolean = false
  isAdmin: boolean = false
  constructor(private http: HttpClient) { }
  login(credentials: { name: string; password: string }): Observable<any> {
    console.log("in auth service login");
    console.log(`${this.apiUrl}/auth/login`);
    debugger;
    return this.http.post(this.apiUrl, credentials).pipe(
      tap((result: any) => {
        console.log(result);
        if (typeof sessionStorage !== 'undefined') {
          sessionStorage.setItem('token', result.token);
        } else {
          console.error('Session storage is not available.');
        }
        this.isConnected = true;
      })
    );
  }

}
