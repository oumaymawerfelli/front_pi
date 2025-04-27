import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },          // Default route
  { path: 'login', component: LandingComponent } ,// /landing route
  { path: 'university/institution', loadChildren: () => import('./university/institution/institution.module').then(m => m.InstitutionModule) },
  { path: 'university/research-project', loadChildren: () => import('./university/research/research.module').then(m => m.ResearchModule) }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
