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

  constructor(
    private institutionService: InstitutionService,
    private router: Router // ✅ Inject Router
  ) {}

  ngOnInit(): void {
    this.getInstitutions();
  }

  getInstitutions(): void {
    this.institutionService.getInstitutions().subscribe((data) => {
      console.log('Institutions fetched:', data);
      this.institutions = data;
    });
  }

  goToEdit(id: number): void {
    this.router.navigate(['/institutions/edit', id]); // ✅ Navigate to edit page
  }

  deleteInstitution(id?: number): void {
    if (id === undefined) return;
  
    this.institutionService.deleteInstitution(id).subscribe(() => {
      console.log(`Institution with ID ${id} deleted.`);
      this.getInstitutions(); // Refresh the list
    });
  }
  

 
}
