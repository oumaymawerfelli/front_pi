import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MarketplaceComponent } from './marketplace/marketplace.component';
import { FrontComponent } from './component/front/front.component';
import { BackComponent } from './component/back/back.component';
import { PanierComponent } from './panier/panier.component';

const routes: Routes = [
  { path: '', redirectTo: '/marketplace', pathMatch: 'full' },
  { path: 'marketplace', component: MarketplaceComponent },
  { path: 'front', component: FrontComponent },
  { path: 'admin', component: BackComponent },
  {path: 'Panier', component: PanierComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
