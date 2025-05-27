import { Routes } from '@angular/router';
import { LoginComponent } from '../Authentication/Components/login/login.component';
import { AllUsersComponent } from '../Users/all-users/all-users.component';
import { sign } from 'crypto';
import { SignInComponent } from '../Authentication/Components/sign-in/sign-in.component';
import { UserFormComponent } from '../Users/user-form/user-form.component';
import { AdminLayoutComponent } from '../layout/layout.component';
import { AdminDashboardComponent } from '../dashboard/dashboard.component';

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
    // {
    //     path: 'admin',
    //     component: AdminLayoutComponent,
    //     children: [
    //       { path: 'dashboard', component: AdminDashboardComponent },
    //       { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    //     ]
    //   },
    //   { path: '', redirectTo: 'admin/dashboard', pathMatch: 'full' }

];
