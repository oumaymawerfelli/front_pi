import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServicesComponent } from './services/services.component';

const routes: Routes = [
  { path: 'services', component: ServicesComponent },
  // Optionnel : redirection vers /services si aucune route n'est spécifiée


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
