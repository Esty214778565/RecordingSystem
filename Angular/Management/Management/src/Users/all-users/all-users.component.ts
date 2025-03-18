import { Component, OnInit } from '@angular/core';
import { User } from '../../Models/user';
import { UserService } from '../../Services/user.service';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { Router, RouterOutlet } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { AuthenticationService } from '../../Authentication/Services/authentication.service';
@Component({
  selector: 'app-all-users',
  standalone: true,
  imports: [MatCardModule, RouterOutlet,
    CommonModule,
    FormsModule,
    MatCardModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule, MatIconModule],
  templateUrl: './all-users.component.html',
  styleUrl: './all-users.component.css'
})
export class AllUsersComponent implements OnInit {
  users: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  connectedUsers: User[] = [];
  errorMessage: string = '';

  constructor(
    public authService: AuthenticationService,
    private router: Router,
    private userService: UserService) {

  }
  ngOnInit(): void {
    this.userService.Users$.subscribe((data: User[]) => {
      this.users.next(data);
    });
    this.userService.getAllUsers().subscribe();

  }


  editUser(User: User) {
    this.router.navigate([`Users/edit/${User.id}`]);
  }

  deleteUser(User: User) {
    this.userService.deleteUser(User.id)
      .subscribe(() => {
        this.users.next(this.users.getValue().filter(c => c.id !== User.id));
      },
        error => this.errorMessage = error);
  }

  addUser() {

    this.router.navigate(['Users/add']);
  }


}
