import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module'; // Ensure this is imported
import { AppComponent } from './app.component';
import { LoanManagementComponent } from './front/loan-management/loan-management.component';
import { LoanApplicationComponent } from './front/loan-application/loan-application.component';
import { LoanInfoComponent } from './front/loan-info/loan-info.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TermsAcceptanceComponent } from './front/terms-acceptance/terms-acceptance.component';
import { DashbordComponent } from './back/dashbord/dashbord.component';



@NgModule({
  declarations: [
    AppComponent,
    LoanManagementComponent,
    LoanApplicationComponent,
    LoanInfoComponent,
    TermsAcceptanceComponent,
    DashbordComponent,
  
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, // Ensure this is included
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
