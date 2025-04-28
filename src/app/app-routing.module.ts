import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { HomeComponent } from './home/home.component';
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
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
