import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MarketplaceComponent } from './marketplace/marketplace.component';
import { PanierComponent } from './panier/panier.component';
//investment 
import { InvestorComponent } from './investment/investor/investor.component';
import { InvestorListComponent } from './investment/investor-list/investor-list.component';
import { InvestorHistoComponent } from './investment/investor-histo/investor-histo.component';
import { OrdersComponent } from './orders/orders.component';

import { MarketComponent } from './market/market.component';
import { ProductListComponent } from './market/product-list/product-list.component';
import { ProductComponent } from './market/product-list/product/product.component';
import { FilterComponent } from './market/product-list/filter/filter.component';
import { SearchComponent } from './market/product-list/search/search.component';
import { FarmMenuComponent } from './market/farm-menu/farm-menu.component';
import { AddProdComponent } from './market/farm-menu/add-prod/add-prod.component';
import { EditProdComponent } from './market/farm-menu/edit-prod/edit-prod.component';
import { AiAssisstantComponent } from './market/ai-assisstant/ai-assisstant.component';


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
    FarmMenuComponent,
    ProductListComponent,
    ProductComponent,
    FilterComponent,
    SearchComponent,
    AddProdComponent,
    EditProdComponent,
    AiAssisstantComponent,
    PanierComponent,
    InvestorComponent,
    InvestorListComponent,
    InvestorHistoComponent,
    OrdersComponent,
MarketplaceComponent,
    EquipmentComponent,
    AddEquipmentComponent,
    AddLandComponent,
    TermsAcceptanceComponent,
    RecommendationsComponent,
    LoanApprovalComponent,
    MarketComponent,

 

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UsersModule,
  CommonModule,
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
