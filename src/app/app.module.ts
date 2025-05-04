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
import { Institution } from './core/models/institution.model';
import { EquipmentComponent } from './loans/equipment/equipment.component';
import { AddEquipmentComponent } from './loans/add-equipment/add-equipment.component';
import { AddLandComponent } from './loans/add-land/add-land.component';
import { TermsAcceptanceComponent } from './loans/terms-acceptance/terms-acceptance.component';
import { InstitutionModule } from './university/institution/institution.module';
import { ResearchModule } from './university/research/research.module';
import { RecommendationsComponent } from './recommendations/recommendations.component';
import { LandComponent } from './loans/lands/lands.component';
import { LoanApprovalComponent } from './loan-approval/loan-approval.component';




@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    HomeComponent,
    UnauthorizedComponent,
  LandComponent,
    BackComponent,
    ContactComponent,
    LoanApplicationComponent,
    LoanInfoComponent,
    LoanManagementComponent,

    EquipmentComponent,
    AddEquipmentComponent,
    AddLandComponent,
    TermsAcceptanceComponent,
    RecommendationsComponent,
    LoanApprovalComponent,

 

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
    InstitutionModule,
    RecaptchaModule,
    NgChartsModule,
    UsersModule,
    ResearchModule,
  ],
  providers: [
    AuthService,
    AdminGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
