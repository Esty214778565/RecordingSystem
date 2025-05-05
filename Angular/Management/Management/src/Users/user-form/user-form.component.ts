import { Component, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { User } from '../../Models/user';
import { UserService } from '../../Services/user.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
    selector: 'app-user-form',
    imports: [MatButtonModule, ReactiveFormsModule, FormsModule, MatFormFieldModule, MatInputModule, CommonModule],
    templateUrl: './user-form.component.html',
    styleUrl: './user-form.component.css'
})
export class UserFormComponent {
  UserId: number = 0;
  isAdd: boolean = false;
  User: User = new User(0, '', '', '', "user");
  UserForm!: FormGroup;
  private UserSubject = new BehaviorSubject<any>({ name: '', email: '', password: '', role: '' });

  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private UserService: UserService,
    private router: Router) {
    console.log("enter ctor user form");

    this.route.params.subscribe(params => {
      this.UserId = +params['id'];
      if (!Number.isNaN(this.UserId)) {

        this.UserService.getUserById(this.UserId).subscribe((data: User) => {
          this.User = data;
          this.fillForm(this.User);
        });
      }
      else {
        this.isAdd = true;
      }
      this.UserForm = this.fb.group({
        name: ['', Validators.required],
        email: ['', Validators.required],
        password: ['', Validators.required],
        role: ['', Validators.required],
      });


      if (this.UserId > 0) {
        this.isAdd = false;
        this.UserService.getUserById(this.UserId).subscribe((data: User) => {
          this.fillForm(this.User);
        })

      }
    });
  }
  
  fillForm(data: any): void {
      Object.keys(data).forEach(key => {
        if (this.UserForm.controls[key]) {
          this.UserForm.controls[key].setValue(data[key]);
        }
      });
    }
  ngOnInit(): void {
      this.UserSubject.subscribe(User => {
        this.UserForm.patchValue(User);
      });

      this.UserForm.valueChanges.subscribe(value => {
        this.UserSubject.next(value);
      });
    }

  onSubmit(): void {
      this.User.name = this.UserForm.value.name;
      this.User.email = this.UserForm.value.email;
      this.User.password = this.UserForm.value.password;
      this.User.role = this.UserForm.value.role;
      if(this.isAdd) {
      this.UserService.createUser(this.User).subscribe((data: User) => {
        this.User = data;
        this.UserService.getAllUsers().subscribe();
      });
    }
    else {
      this.UserService.updateUser(this.UserId, this.User).subscribe((data: User) => {
        this.User = data;
        this.UserService.getAllUsers().subscribe();

      });

    }
    this.closeModal()
  }
  closeModal() {
    this.router.navigate(['users']);
  }
}
