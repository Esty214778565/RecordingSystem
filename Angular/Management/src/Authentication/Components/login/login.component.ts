import { Component, Input } from '@angular/core';
import { SignInComponent } from "../sign-in/sign-in.component";
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { trigger, transition, style, animate } from "@angular/animations"
@Component({
  selector: 'app-login',
  imports:[CommonModule, MatButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  animations: [
    trigger("fadeIn", [
      transition(":enter", [
        style({ opacity: 0, transform: "translateY(10px)" }),
        animate("600ms ease-out", style({ opacity: 1, transform: "translateY(0)" })),
      ]),
    ]),
  ],
})
export class LoginComponent {
  isSignIn: boolean = false;
  constructor(private navigate: Router) {

  }
  openSignIn() {
    this.navigate.navigate(['login']);
    // this.isSignIn = true

  }

}
