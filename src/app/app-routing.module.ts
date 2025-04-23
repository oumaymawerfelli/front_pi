import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { HomeComponent } from './home/home.component';
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


  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
