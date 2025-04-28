import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { InstitutionListComponent } from './institution-list/institution-list.component';
import { AddInstitutionComponent } from './add-institution/add-institution.component';
import { InstitutionRoutingModule } from './institution-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditInstitutionComponent } from './edit-institution/edit-institution.component';
import { ModalConfirmDeleteComponent } from '../modal-confirm-delete/modal-confirm-delete.component';  // Adjust path if needed

@NgModule({
  declarations: [
    InstitutionListComponent,
    AddInstitutionComponent,
    EditInstitutionComponent,
    ModalConfirmDeleteComponent,
  ],
  imports: [
    CommonModule,
    InstitutionRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  exports: [ModalConfirmDeleteComponent]  // Export to make it available in other modules

})
export class InstitutionModule {}
 