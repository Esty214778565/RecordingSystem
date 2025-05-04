import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../Services/authentication.service';
import { UserService } from '../../../Services/user.service';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {
  credentials = { name: '', password: '' };

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
