import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './users/register/register.component';
import { LoginComponent } from './users/login/login.component';
import { BackComponent } from './component/back/back.component';
import { AdminGuard } from './guards/admin.guard';
import { PendingUsersComponent } from './pending-users/pending-users.component';
import { ListUsersComponent } from './users/list-users/list-users.component';
import { ProfileComponent } from './users/profile/profile.component';
import { OAuth2RedirectComponent } from './users/oauth2-redirect/oauth2-redirect.component';
import { ForgotPasswordComponent } from './users/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './users/reset-password/reset-password.component';

const routes: Routes = [
       // Default route
  { path: 'landing', component: LandingComponent ,
    children: [
    {path: 'register', component: RegisterComponent},
    {path: 'login', component: LoginComponent},
    {path: 'forgot-password', component: ForgotPasswordComponent},
    {path: 'reset-password/:token', component: ResetPasswordComponent},
  ]
} ,// /landing route

{ 
  path: 'admin', 
  component: BackComponent, 
  canActivate: [AdminGuard],
  children: [
    { path: 'profile', component: ProfileComponent },
    { path: 'users', component: ListUsersComponent, canActivate: [AdminGuard] },
    { path: 'pending-users', component: PendingUsersComponent, canActivate: [AdminGuard]},
  ]
},

{path: 'home', component: HomeComponent,
  children:[
    { path: 'profile', component: ProfileComponent },
  ]
},

{ path: 'oauth2-redirect', component: OAuth2RedirectComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
