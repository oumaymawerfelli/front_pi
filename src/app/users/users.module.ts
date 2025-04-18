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





@NgModule({
  declarations: [
    FormComponent,
    ListUsersComponent,
    ProfileComponent,
    RegisterComponent,
    LoginComponent,
    OAuth2RedirectComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
    
    
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
