import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

// Modules
import { AppRoutingModule } from './app-routing.module';
import { UsersModule } from './users/users.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RecaptchaModule } from 'ng-recaptcha';
import { NgChartsModule } from 'ng2-charts';

// Services and Guards
import { AuthService } from './core/services/auth.service';
import { AdminGuard } from './guards/admin.guard';

// Components
import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { HomeComponent } from './home/home.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';

import { BackComponent } from './component/back/back.component';
import { ContactComponent } from './contact/contact.component';

// Loan Components
import { LoanApplicationComponent } from './loans/loan-application/loan-application.component';
import { LoanInfoComponent } from './loans/loan-info/loan-info.component';
import { LoanManagementComponent } from './loans/loan-management/loan-management.component';

import { EquipmentComponent } from './loans/equipment/equipment.component';
import { AddEquipmentComponent } from './loans/add-equipment/add-equipment.component';
import { AddLandComponent } from './loans/add-land/add-land.component';
import { TermsAcceptanceComponent } from './loans/terms-acceptance/terms-acceptance.component';



@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    HomeComponent,
    UnauthorizedComponent,
  
    BackComponent,
    ContactComponent,
    LoanApplicationComponent,
    LoanInfoComponent,
    LoanManagementComponent,

    EquipmentComponent,
    AddEquipmentComponent,
    AddLandComponent,
    TermsAcceptanceComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UsersModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgbModule,
    RecaptchaModule,
    NgChartsModule,
    UsersModule
  ],
  providers: [
    AuthService,
    AdminGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
