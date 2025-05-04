import { Routes } from '@angular/router';
import { LoginComponent } from '../Authentication/Components/login/login.component';
import { AllUsersComponent } from '../Users/all-users/all-users.component';
import { sign } from 'crypto';
import { SignInComponent } from '../Authentication/Components/sign-in/sign-in.component';
import { UserFormComponent } from '../Users/user-form/user-form.component';

export const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'login', component: SignInComponent },
    {
        path: 'users', component: AllUsersComponent,
        children: [
            { path: 'add', component: UserFormComponent },
            { path: 'edit/:id', component: UserFormComponent }
        ]
    }

];
