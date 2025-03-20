import { Component, Input } from '@angular/core';
import { SignInComponent } from "../sign-in/sign-in.component";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [SignInComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  isSignIn: boolean = false;
  openSignIn() {
    this.isSignIn = true
  }

}
