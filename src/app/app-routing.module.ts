import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './users/register/register.component';
import { LoginComponent } from './users/login/login.component';

const routes: Routes = [
  { path: '', component: HomeComponent },          // Default route
  { path: 'landing', component: LandingComponent ,
    children: [
    {path: 'register', component: RegisterComponent},
    {path: 'login', component: LoginComponent},
  ]
} ,// /landing route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
