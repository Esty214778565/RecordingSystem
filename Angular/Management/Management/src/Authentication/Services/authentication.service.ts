import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { User } from '../../Models/user';
import { UserService } from '../../Services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private apiUrl = 'https://localhost:7043/api';
  isConnected: boolean = false
  isAdmin: boolean = false
  constructor(private http: HttpClient, private userService: UserService) { }
  login(credentials: { name: string; password: string }): Observable<any> {
    console.log("in auth service login");
    console.log(`${this.apiUrl}/auth/login`);

    return this.http.post(`${this.apiUrl}/auth/login`, credentials).pipe(
      tap((result: any) => {
        console.log(result);
        this.isConnected = true;
      })
    );
  }

}
