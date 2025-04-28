import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResearchListComponent } from './research-list/research-list.component';
import { AddResearchComponent } from './add-research/add-research.component';
import { EditResearchComponent } from './edit-research/edit-research.component';
import { ResearchDetailsComponent } from './research-details/research-details.component';


const routes: Routes = [
  { path: '', component: ResearchListComponent },
  { path: 'add', component: AddResearchComponent },
  { path: 'edit/:id', component: EditResearchComponent },  // Edit research route
  { path: 'research-project/:id', component: ResearchDetailsComponent }, // Détails du projet

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResearchRoutingModule {}
