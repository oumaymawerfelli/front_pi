import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { HomeComponent } from './home/home.component';
<<<<<<< HEAD
import { InvestorComponent } from './investment/investor/investor.component';
import { InvestorListComponent } from './investment/investor-list/investor-list.component';
import { InvestorHistoComponent } from './investment/investor-histo/investor-histo.component';


const routes: Routes = [
  { path: '', component: HomeComponent },                  // Route par défaut
  { path: 'login', component: LandingComponent },           // Route pour la page de login
  { path: 'investor', component: InvestorComponent },       // Route pour le composant 'Investor'
  { path: 'investors', component: InvestorListComponent },  // Route pour la liste des investisseurs
  { path: 'investments/:id/history', component: InvestorHistoComponent },  // Historique des investissements
  { path: '**', redirectTo: '' },                           // Redirection vers la route par défaut
=======
import { RegisterComponent } from './users/register/register.component';
import { LoginComponent } from './users/login/login.component';
import { BackComponent } from './component/back/back.component';
import { AdminGuard } from './guards/admin.guard';
import { PendingUsersComponent } from './pending-users/pending-users.component';
import { ListUsersComponent } from './users/list-users/list-users.component';
import { ProfileComponent } from './users/profile/profile.component';
import { OAuth2RedirectComponent } from './users/oauth2-redirect/oauth2-redirect.component';
import { ForgotPasswordComponent } from './users/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './users/reset-password/reset-password.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminAnalyticsComponent } from './users/admin-analytics/admin-analytics.component';


const routes: Routes = [
       // Default route
  { path: 'landing', component: LandingComponent ,
    children: [
    {path: 'register', component: RegisterComponent},
    {path: 'login', component: LoginComponent},
    {path: 'forgot-password', component: ForgotPasswordComponent},
    {path: 'reset-password/:token', component: ResetPasswordComponent},
  ]
} ,// /landing route

{ 
  path: 'admin', 
  component: BackComponent, 
  canActivate: [AdminGuard],
  children: [
    { path: 'profile', component: ProfileComponent },
    { path: 'users', component: ListUsersComponent, canActivate: [AdminGuard] },
    { path: 'pending-users', component: PendingUsersComponent, canActivate: [AdminGuard]},
    { path: 'analytics', component: AdminAnalyticsComponent, canActivate: [AdminGuard] },
  ]
},

{path: 'home', component: HomeComponent,
 
  children:[
    { path: 'profile', component: ProfileComponent , canActivate:[AuthGuard],},
   
  ]
},
{path: '', redirectTo: '/landing', pathMatch: 'full'},

{ path: 'oauth2-redirect', component: OAuth2RedirectComponent },
>>>>>>> origin/nada
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
