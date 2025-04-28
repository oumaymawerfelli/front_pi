import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; 

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { HomeComponent } from './home/home.component';
import { InvestorComponent } from './investment/investor/investor.component';
import { InvestorListComponent } from './investment/investor-list/investor-list.component';
import { InvestorHistoComponent } from './investment/investor-histo/investor-histo.component';



@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    HomeComponent,
    InvestorComponent,
    InvestorListComponent,
    InvestorHistoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
   
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
