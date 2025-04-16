import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InstitutionListComponent } from './institution-list/institution-list.component';
import { AddInstitutionComponent } from './add-institution/add-institution.component';
import { EditInstitutionComponent } from './edit-institution/edit-institution.component';

const routes: Routes = [
  { path: '', component: InstitutionListComponent },
  { path: 'add', component: AddInstitutionComponent },
  { path: 'edit/:id', component: EditInstitutionComponent },

  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InstitutionRoutingModule {}
