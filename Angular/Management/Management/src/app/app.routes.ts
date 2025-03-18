import { Routes } from '@angular/router';
import { LoginComponent } from '../Authentication/Components/login/login.component';
import { AllUsersComponent } from '../Users/all-users/all-users.component';

export const routes: Routes = [
    {path: '',component:LoginComponent},
    {path: 'login',component:LoginComponent},
    {path:'users',component:AllUsersComponent}

];
