import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactComponent } from './contact/contact.component';
import { MarketplaceComponent } from './marketplace/marketplace.component';
import { FrontComponent } from './component/front/front.component';
import { BackComponent } from './component/back/back.component';
import { ListUsersComponent } from './users/list-users/list-users.component';
import { ProfileComponent } from './users/profile/profile.component';
import { FormComponent } from './users/form/form.component';
import { RegisterComponent } from './users/register/register.component';
import { LoginComponent } from './users/login/login.component';
import { AdminGuard } from './guards/admin.guard';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { OAuth2RedirectComponent } from './users/oauth2-redirect/oauth2-redirect.component';
import { PendingUsersComponent } from './pending-users/pending-users.component';
import { ForgotPasswordComponent } from './users/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './users/reset-password/reset-password.component';
import { LoanApplicationComponent } from './loans/loan-application/loan-application.component';
import { LoanInfoComponent } from './loans/loan-info/loan-info.component';
import { LoanManagementComponent } from './loans/loan-management/loan-management.component';

const routes: Routes = [
  { path: '', redirectTo: '/front', pathMatch: 'full' },
  { path: 'marketplace', component: MarketplaceComponent },
  {
    path: 'front', 
    component: FrontComponent, 
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'profile', component: ProfileComponent },
      {path: 'forgot-password', component: ForgotPasswordComponent},
      {path: 'reset-password/:token', component: ResetPasswordComponent}
      
    ]
  },
  {
    path: 'loans', 
    component: FrontComponent, 
    children: [
      { path: 'loan-management', component: LoanManagementComponent },
      { path: 'loan-application', component: LoanApplicationComponent },
      { path: 'loan-info', component: LoanInfoComponent },

 
    ]
  },
  { path: 'contact', component: ContactComponent },



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
  { path: 'users', component: ListUsersComponent, canActivate: [AdminGuard] },
  { path: 'oauth2-redirect', component: OAuth2RedirectComponent },
  { path: 'users/new', component: FormComponent, canActivate: [AdminGuard] },
  { path: 'unauthorized', component: UnauthorizedComponent },
  { path: '**', redirectTo: '/front/login' },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
