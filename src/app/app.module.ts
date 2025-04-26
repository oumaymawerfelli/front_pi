import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { HomeComponent } from './home/home.component';
import { LoanApplicationComponent } from './loans/loan-application/loan-application.component';
import { LoanInfoComponent } from './loans/loan-info/loan-info.component';
import { LoanManagementComponent } from './loans/loan-management/loan-management.component';
<<<<<<< Updated upstream
import { EquipmentComponent } from './loans/equipment/equipment.component';
import { AddEquipmentComponent } from './loans/add-equipment/add-equipment.component';
import { AddLandComponent } from './loans/add-land/add-land.component';
import { TermsAcceptanceComponent } from './loans/terms-acceptance/terms-acceptance.component';
=======
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { RecaptchaModule } from 'ng-recaptcha';
import { LoanApprovalComponent} from './loans/loan-approval/loan-approval-component.component'; // Import RecaptchaModule
import { EquipmentComponent } from './loans/equipment/equipment.component';
import { AddEquipmentComponent } from './loans/add-equipment/add-equipment.component';

import { AddLandComponent } from './loans/add-land/add-land.component';

>>>>>>> Stashed changes


@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    HomeComponent,
    LoanApplicationComponent,
    LoanInfoComponent,
<<<<<<< Updated upstream
    LoanManagementComponent,
    EquipmentComponent,
    AddEquipmentComponent,
    AddLandComponent,
    TermsAcceptanceComponent
=======
    ContactComponent,
    LoanApprovalComponent,
    EquipmentComponent,
    AddEquipmentComponent,
    AddLandComponent,
>>>>>>> Stashed changes
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
