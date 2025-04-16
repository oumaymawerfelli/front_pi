import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InstitutionListComponent } from './institution-list/institution-list.component';
import { AddInstitutionComponent } from './add-institution/add-institution.component';
import { InstitutionRoutingModule } from './institution-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditInstitutionComponent } from './edit-institution/edit-institution.component';

@NgModule({
  declarations: [
    InstitutionListComponent,
    AddInstitutionComponent,
    EditInstitutionComponent
  ],
  imports: [
    CommonModule,
    InstitutionRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class InstitutionModule { }
