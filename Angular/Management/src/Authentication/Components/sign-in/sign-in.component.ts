import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../Services/authentication.service';
import { UserService } from '../../../Services/user.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatCard } from '@angular/material/card';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
    selector: 'app-sign-in',
 imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatDividerModule,
    MatCard
  ],
    templateUrl: './sign-in.component.html',
    styleUrl: './sign-in.component.css',
      animations: [
    trigger("fadeIn", [
      transition(":enter", [
        style({ opacity: 0, transform: "translateY(10px)" }),
        animate("600ms ease-out", style({ opacity: 1, transform: "translateY(0)" })),
      ]),
    ]),
  ],
})
export class SignInComponent {
  credentials = { name: '', password: '' };
  hidePassword = true
  constructor(private authService: AuthenticationService, private router: Router, private userService: UserService) {
  }

  signIn() {

    this.authService.login(this.credentials).subscribe(result => {

      if (result.role !== "admin") {
        this.close();
      }
      else {
        sessionStorage.setItem('token', result.token);
        this.authService.isConnected = true;
        this.router.navigate(['users']);
      }
    });

  }
  close() {
    this.router.navigate(['']);
  }
  
}
