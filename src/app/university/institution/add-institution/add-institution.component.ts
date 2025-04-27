import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InstitutionService } from 'src/app/core/services/institution.service';
import { Institution } from 'src/app/core/models/institution.model';
import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-add-institution',
  templateUrl: './add-institution.component.html',
  styleUrls: ['./add-institution.component.css']
})
export class AddInstitutionComponent {
  institutionForm: FormGroup;
  isFormVisible: boolean = true;

  @Output() institutionAdded = new EventEmitter<Institution>();
  @Output() cancelAdd = new EventEmitter<void>();


  constructor(
    private fb: FormBuilder,
    private institutionService: InstitutionService,
    private router: Router
  ) {
    this.institutionForm = this.fb.group({
      name: ['', Validators.required],
      location: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.institutionForm.valid) {
      const institutionData: Institution = this.institutionForm.value;

      this.institutionService.addInstitution(institutionData).subscribe((addedInstitution) => {
        this.institutionAdded.emit(addedInstitution);
        this.router.navigate(['/institutions']);
      });
    }
  }

  onCancel(): void {
    this.cancelAdd.emit();
  }
}
