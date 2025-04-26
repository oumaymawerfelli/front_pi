import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Core components
import { LandingComponent } from './landing/landing.component';
import { HomeComponent } from './home/home.component';
<<<<<<< Updated upstream
import { LoanManagementComponent } from './loans/loan-management/loan-management.component';
import { LoanApplicationComponent } from './loans/loan-application/loan-application.component';
import { LoanInfoComponent } from './loans/loan-info/loan-info.component';
import { EquipmentComponent } from './loans/equipment/equipment.component';
import { AddEquipmentComponent } from './loans/add-equipment/add-equipment.component';
import { AddLandComponent } from './loans/add-land/add-land.component';
import { TermsAcceptanceComponent } from './loans/terms-acceptance/terms-acceptance.component';
 // Import the EquipmentComponent
const routes: Routes = [

  { path: '', component: HomeComponent },          // Default route
  { path: 'login', component: LandingComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Default route
  { path: 'home/loan-management', component: LoanManagementComponent },
  { path: 'home/loan-application', component: LoanApplicationComponent },
  { path: 'terms-acceptance', component: TermsAcceptanceComponent },
  { path: 'home/loan-info', component: LoanInfoComponent },
  
  { path: 'home/add-equipment', component: AddEquipmentComponent },
  { path: 'home/equipment', component: EquipmentComponent },
  
  { path: '**', redirectTo: '/home' }


  
=======
import { BackComponent } from './component/back/back.component';

// User components
import { RegisterComponent } from './users/register/register.component';
import { LoginComponent } from './users/login/login.component';
import { ProfileComponent } from './users/profile/profile.component';
import { ListUsersComponent } from './users/list-users/list-users.component';
import { PendingUsersComponent } from './pending-users/pending-users.component';
import { ForgotPasswordComponent } from './users/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './users/reset-password/reset-password.component';
import { OAuth2RedirectComponent } from './users/oauth2-redirect/oauth2-redirect.component';

// Loan components
import { LoanApprovalComponent } from './loans/loan-approval/loan-approval-component.component';
import { LoanApplicationComponent } from './loans/loan-application/loan-application.component';
import { LoanInfoComponent } from './loans/loan-info/loan-info.component';
import { LoanManagementComponent } from './loans/loan-management/loan-management.component';
import { EquipmentComponent } from './loans/equipment/equipment.component';
import { AddEquipmentComponent } from './loans/add-equipment/add-equipment.component';

import { AddLandComponent } from './loans/add-land/add-land.component';
// Guards

import { AdminGuard } from './guards/admin.guard';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [

  // ✅ Default route redirecting to landing/login
  { path: '', redirectTo: '/landing/login', pathMatch: 'full' },

  // ✅ Public Landing + Auth Routes
  {
    path: 'landing',
    component: LandingComponent,
    children: [
      { path: 'register', component: RegisterComponent },
      { path: 'login', component: LoginComponent },
      { path: 'forgot-password', component: ForgotPasswordComponent },
      { path: 'reset-password/:token', component: ResetPasswordComponent }
    ]
  },

  // ✅ Home (user) routes - requires login
  {
    path: 'home',
    component: HomeComponent,

    children: [
      { path: 'profile', component: ProfileComponent },
      { path: 'loan-application', component: LoanApplicationComponent, canActivate:[AuthGuard], },
      { path: 'loan-info', component: LoanInfoComponent,  canActivate:[AuthGuard], },
      { path: 'loan-management', component: LoanManagementComponent, canActivate:[AuthGuard], },
      { path: 'loan-approval', component: LoanApprovalComponent },
    
  
      // ✅ Equipment routes
      { path: 'equipment', component: EquipmentComponent, canActivate:[AuthGuard],},
      { path: 'add-equipment', component: AddEquipmentComponent, canActivate:[AuthGuard], },
  
      // ✅ Land routes
     
      { path: 'add-land', component: AddLandComponent }
      
    ]
  },


 
 

  // ✅ Admin Dashboard - requires login + admin
  {
    path: 'admin',
    component: BackComponent,
   
    children: [
      { path: 'profile', component: ProfileComponent },
      { path: 'users', component: ListUsersComponent },
      { path: 'pending-users', component: PendingUsersComponent }
    ]
  },
  
     
    
  

  // ✅ OAuth2 redirect handling
  { path: 'oauth2-redirect', component: OAuth2RedirectComponent },

  // ✅ Wildcard (optional: redirect to landing or 404 component)
  { path: '**', redirectTo: '/landing/login' }
>>>>>>> Stashed changes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
