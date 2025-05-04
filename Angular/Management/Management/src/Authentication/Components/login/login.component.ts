import { Component, Input } from '@angular/core';
import { SignInComponent } from "../sign-in/sign-in.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [SignInComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  isSignIn: boolean = false;
  /**
   *
   */
  constructor(private navigate: Router) {

  }
  openSignIn() {
    this.navigate.navigate(['login']);
    // this.isSignIn = true

  }

}
