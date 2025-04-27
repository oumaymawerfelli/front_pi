import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent } from './form/form.component';
import { ListUsersComponent } from './list-users/list-users.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { OAuth2RedirectComponent } from './oauth2-redirect/oauth2-redirect.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RecaptchaModule } from 'ng-recaptcha';
import { RouterModule } from '@angular/router';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CompleteProfileComponent } from './complete-profile/complete-profile.component';
import { AdminAnalyticsComponent } from './admin-analytics/admin-analytics.component';
import { NgChartsConfiguration, NgChartsModule } from 'ng2-charts';
import { Chart } from 'chart.js';








@NgModule({
  declarations: [
    FormComponent,
    ListUsersComponent,
    ProfileComponent,
    RegisterComponent,
    LoginComponent,
    OAuth2RedirectComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    CompleteProfileComponent,
    AdminAnalyticsComponent
  ],
  imports: [
    CommonModule,
  
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RecaptchaModule,
    RouterModule,
    MatSnackBarModule,
    NgChartsModule,
   
    
  
    
    
  ],
  exports: [
    FormComponent,
    ListUsersComponent,
    ProfileComponent,
    RegisterComponent,
    LoginComponent
  ]
})
export class UsersModule { }
