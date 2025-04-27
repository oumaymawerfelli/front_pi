import { Component, OnInit } from '@angular/core';
import { InstitutionService } from 'src/app/core/services/institution.service';
import { Institution } from 'src/app/core/models/institution.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-institution-list',
  templateUrl: './institution-list.component.html',
})
export class InstitutionListComponent implements OnInit {
  institutions: Institution[] = [];
  showAddForm = false;
  selectedInstitution: Institution | null = null;
  selectedInstitutionToEdit: Institution | null = null;
  isModalVisible: boolean = false;
  selectedInstitutionIdToDelete: number | null = null;



  constructor(private institutionService: InstitutionService, private router: Router) {}

  ngOnInit(): void {
    this.getInstitutions();
  }

  toggleAddForm(): void {
    this.showAddForm = !this.showAddForm;
    this.selectedInstitution = null;
  }

  getInstitutions(): void {
    this.institutionService.getInstitutions().subscribe((data) => {
      this.institutions = data;
    });
  }

  deleteInstitution(id?: number): void {
    if (id === undefined) return;

    this.institutionService.deleteInstitution(id).subscribe(() => {
      this.getInstitutions();
    });
  }

  openDeleteModal(institutionId: number | undefined): void {
    if (institutionId === undefined) {
      console.error('Institution ID is undefined');
      return;
    }
    this.isModalVisible = true;
    this.selectedInstitutionIdToDelete = institutionId;
  }
  

  onConfirmDelete(): void {
    if (this.selectedInstitutionIdToDelete !== null) {
      this.institutionService.deleteInstitution(this.selectedInstitutionIdToDelete).subscribe(() => {
        this.getInstitutions(); // refresh list
      });
    }
    this.isModalVisible = false;
    this.selectedInstitutionIdToDelete = null;
  }
  
  onCancelDelete(): void {
    this.isModalVisible = false;
    this.selectedInstitutionIdToDelete = null;
  }
  

  onInstitutionAdded(newInstitution: Institution): void {
    this.institutions.push(newInstitution);
    this.showAddForm = false;
  }

  onCancelAdd(): void {
    this.showAddForm = false;
  }

onEdit(institution: Institution): void {
  this.selectedInstitutionToEdit = { ...institution }; // clone to avoid direct mutation
}
onInstitutionUpdated(updatedInstitution: Institution): void {
  const index = this.institutions.findIndex(inst => inst.institutionId === updatedInstitution.institutionId);
  if (index !== -1) {
    this.institutions[index] = updatedInstitution;
  }
  this.selectedInstitutionToEdit = null;
}

cancelEditForm(): void {
  this.selectedInstitutionToEdit = null;
}
  


}

