import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoanManagementComponent } from './front/loan-management/loan-management.component';
import { LoanApplicationComponent } from './front/loan-application/loan-application.component';
import { LoanInfoComponent } from './front/loan-info/loan-info.component';
import { TermsAcceptanceComponent } from './front/terms-acceptance/terms-acceptance.component';
import { DashbordComponent } from './back/dashbord/dashbord.component';


const routes: Routes = [
  { path: '', redirectTo: '/loan-management', pathMatch: 'full' }, // Default route
  { path: 'loan-management', component: LoanManagementComponent },
  { path: 'loan-application', component: LoanApplicationComponent },
  { path: 'terms-acceptance', component: TermsAcceptanceComponent },
  { path: 'loan-info', component: LoanInfoComponent },
  { path: 'dashboard', component: DashbordComponent} ,
  
  { path: '**', redirectTo: '/loan-management' }

// Add this line to include the signature component
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
