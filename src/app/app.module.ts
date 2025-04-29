import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { HomeComponent } from './home/home.component';
import { LoanApplicationComponent } from './loans/loan-application/loan-application.component';
import { LoanInfoComponent } from './loans/loan-info/loan-info.component';
import { LoanManagementComponent } from './loans/loan-management/loan-management.component';
import { EquipmentComponent } from './loans/equipment/equipment.component';
import { AddEquipmentComponent } from './loans/add-equipment/add-equipment.component';
import { AddLandComponent } from './loans/add-land/add-land.component';
import { TermsAcceptanceComponent } from './loans/terms-acceptance/terms-acceptance.component';
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
import { PanierComponent } from './panier/panier.component';
import { FrontComponent } from './component/front/front.component';
import { BackComponent } from './component/back/back.component';


import { ContactComponent } from './contact/contact.component';


import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { MarketComponent } from './market/market.component';
import { ProductListComponent } from './market/product-list/product-list.component';
import { ProductComponent } from './market/product-list/product/product.component';
import { FilterComponent } from './market/product-list/filter/filter.component';
import { SearchComponent } from './market/product-list/search/search.component';
import { FarmMenuComponent } from './market/farm-menu/farm-menu.component';
import { AddProdComponent } from './market/farm-menu/add-prod/add-prod.component';
import { RecaptchaModule } from 'ng-recaptcha'; // Import RecaptchaModule
import { NgChartsModule } from 'ng2-charts';
import { AdminAnalyticsComponent } from './users/admin-analytics/admin-analytics.component';
import { EditProdComponent } from './market/farm-menu/edit-prod/edit-prod.component';
import { AiAssisstantComponent } from './market/ai-assisstant/ai-assisstant.component';
import { MarketplaceComponent } from './marketplace/marketplace.component';
import { OrdersComponent } from './orders/orders.component';
import { ChatbotComponent } from './chatbot/chatbot.component';




@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    HomeComponent,
    LoanApplicationComponent,
    LoanInfoComponent,
    LoanManagementComponent,
    EquipmentComponent,
    AddEquipmentComponent,
    AddLandComponent,
    TermsAcceptanceComponent,
    PendingUsersComponent, // only components that aren't in UsersModule
    PanierComponent,
    FrontComponent,
    BackComponent,
    UnauthorizedComponent,
    PendingUsersComponent,
    LoanManagementComponent,
    LoanApplicationComponent,
    LoanInfoComponent,
    ContactComponent,
    MarketComponent,
    ProductListComponent,
    ProductComponent,
    FilterComponent,
    SearchComponent,
    FarmMenuComponent,
    AddProdComponent,
    EditProdComponent,
    AiAssisstantComponent,
    MarketplaceComponent,
    OrdersComponent,
    ChatbotComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
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
