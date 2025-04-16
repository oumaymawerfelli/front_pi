import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InstitutionService } from 'src/app/core/services/institution.service';
import { Institution } from 'src/app/core/models/institution.model';

@Component({
  selector: 'app-add-institution',
  templateUrl: './add-institution.component.html',
  styleUrls: ['./add-institution.component.css']
})
export class AddInstitutionComponent {
  institutionForm: FormGroup;

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
      const newInstitution: Institution = this.institutionForm.value;
      this.institutionService.addInstitution(newInstitution).subscribe(() => {
        this.router.navigate(['/institutions']);
      });
    }
  }
}
