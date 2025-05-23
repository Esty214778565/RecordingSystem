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
import { UserGraphComponent } from '../users-graph/users-graph.component';
@Component({
    selector: 'app-all-users',
    imports: [MatCardModule, RouterOutlet,
        CommonModule,
        FormsModule,
        MatCardModule,
        MatGridListModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
         MatIconModule,
        UserGraphComponent],
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
    this.router.navigate([`users/edit/${User.id}`]);
  }

  deleteUser(User: User) {
    this.userService.deleteUser(User.id)
      .subscribe(() => {
        this.users.next(this.users.getValue().filter(c => c.id !== User.id));
      },
        error => this.errorMessage = error);
  }

  addUser() {
    this.router.navigate(['users/add']);
  }

private colorPairs = [
  ['#f472b6', '#ec4899'], // Pink
  ['#60a5fa', '#3b82f6'], // Blue
  ['#34d399', '#10b981'], // Green
  ['#a78bfa', '#8b5cf6'], // Purple
  ['#fbbf24', '#f59e0b'], // Amber
  ['#f87171', '#ef4444'], // Red
  ['#6ee7b7', '#10b981'], // Emerald
  ['#93c5fd', '#3b82f6'], // Light Blue
  ['#c4b5fd', '#8b5cf6'], // Lavender
  ['#fdba74', '#f97316']  // Orange
];

// Get a solid color based on user ID
getUserColor(userId: number): string {
  // Use modulo to cycle through colors if there are more users than colors
  const colorIndex = userId % this.colorPairs.length;
  // Return the end color from the pair
  return this.colorPairs[colorIndex][1];
}

// Get a gradient based on user ID
getUserGradient(userId: number): string {
  // Use modulo to cycle through colors if there are more users than colors
  const colorIndex = userId % this.colorPairs.length;
  const startColor = this.colorPairs[colorIndex][0];
  const endColor = this.colorPairs[colorIndex][1];
  
  return `linear-gradient(135deg, ${startColor} 0%, ${endColor} 100%)`;
}
}
