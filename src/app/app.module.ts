import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './users/login/login.component';
import { RegisterComponent } from './users/register/register.component';
import { ResetPasswordComponent } from './users/reset-password/reset-password.component';
import { ForgotPasswordComponent } from './users/forgot-password/forgot-password.component';
import { ListUsersComponent } from './users/list-users/list-users.component';
import { FormComponent } from './users/form/form.component';
import { OAuth2RedirectComponent } from './users/oauth2-redirect/oauth2-redirect.component';
import { ProfileComponent } from './users/profile/profile.component';
import { PendingUsersComponent } from './pending-users/pending-users.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsersModule } from './users/users.module';
import { AuthService } from './core/services/auth.service';
import { AdminGuard } from './guards/admin.guard';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MarketplaceComponent } from './marketplace/marketplace.component';
import { PanierComponent } from './panier/panier.component';
import { FrontComponent } from './component/front/front.component';
import { BackComponent } from './component/back/back.component';
import { ContactComponent } from './contact/contact.component';
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
import { RecaptchaModule } from 'ng-recaptcha'; // Import RecaptchaModule
import { LoanApprovalComponent } from './loans/loan-approval/loan-approval-component.component';

// ADD missing loan components here
import { AddEquipmentComponent } from './loans/add-equipment/add-equipment.component';
import { EquipmentComponent } from './loans/equipment/equipment.component';

@NgModule({
  declarations: [
    AppComponent,
    LoanApprovalComponent,
    LandingComponent,
    HomeComponent,
    PendingUsersComponent,
    MarketplaceComponent,
    PanierComponent,
    FrontComponent,
    BackComponent,
    UnauthorizedComponent,
    LoanManagementComponent,
    LoanApplicationComponent,
    LoanInfoComponent,
    ContactComponent,
    AddEquipmentComponent, // newly added
    EquipmentComponent     // newly added
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgbModule,
    RecaptchaModule
  ],
  providers: [AuthService, AdminGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
