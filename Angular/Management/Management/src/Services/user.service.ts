import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../Models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'https://localhost:7043/api/user';

  private UsersSubject = new BehaviorSubject<User[]>([]);
  Users$ = this.UsersSubject.asObservable();

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) {
  }

  private getHeaders(): HttpHeaders {//check wht to do with this
    // if (typeof window === 'undefined' || window.sessionStorage === undefined) {
    //   return new HttpHeaders();
    // }
    const token = sessionStorage.getItem('token') || '';

    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl, { headers: this.getHeaders() }).pipe(
      tap(Users => this.UsersSubject.next(Users))
    );
  }
  //gigo

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  createUser(User: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, User, { headers: this.getHeaders() }).pipe(
      tap(newUser => {
        const currentUsers = this.UsersSubject.value;
        this.UsersSubject.next([...currentUsers, newUser]);
      })
    );
  }

  updateUser(id: number, User: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${id}`, User, { headers: this.getHeaders() }).pipe(
      tap(updatedUser => {
        const currentUsers = this.UsersSubject.value;
        const updatedUsers = currentUsers.map(l => l.id === id ? updatedUser : l);
        this.UsersSubject.next(updatedUsers);
      })
    );
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.getHeaders() }).pipe(
      tap(() => {
        const currentUsers = this.UsersSubject.value;
        const updatedUsers = currentUsers.filter(l => l.id !== id);
        this.UsersSubject.next(updatedUsers);
      })
    );
  }
}