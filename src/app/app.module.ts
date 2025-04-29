import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { HomeComponent } from './home/home.component';


import { InvestorComponent } from './investment/investor/investor.component';
import { InvestorListComponent } from './investment/investor-list/investor-list.component';
import { InvestorHistoComponent } from './investment/investor-histo/investor-histo.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { RecaptchaModule } from 'ng-recaptcha'; // Import RecaptchaModule
import { NgChartsModule } from 'ng2-charts';
import { AdminAnalyticsComponent } from './users/admin-analytics/admin-analytics.component';





@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    HomeComponent,

    InvestorComponent,
    InvestorListComponent,
    InvestorHistoComponent,

    PendingUsersComponent, // only components that aren't in UsersModule
    MarketplaceComponent,
    PanierComponent,
    FrontComponent,
    BackComponent,
    UnauthorizedComponent,
    PendingUsersComponent,
    LoanManagementComponent,
    LoanApplicationComponent,
    LoanInfoComponent,
    ContactComponent,
   
   

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    FormsModule,
    HttpClientModule,
   
    

    UsersModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgbModule,
    
    FormsModule,
    ReactiveFormsModule,
    RecaptchaModule,
    NgChartsModule

  ],
  providers: [AuthService, AdminGuard],

  bootstrap: [AppComponent]
})
export class AppModule { }
