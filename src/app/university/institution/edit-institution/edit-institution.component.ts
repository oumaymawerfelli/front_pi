import { Component, EventEmitter, Input, OnChanges,Output, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InstitutionService } from 'src/app/core/services/institution.service';
import { Institution } from 'src/app/core/models/institution.model';

@Component({
  selector: 'app-edit-institution',
  templateUrl: './edit-institution.component.html',
  styleUrls: ['./edit-institution.component.css']
})
export class EditInstitutionComponent implements OnChanges {
  institutionForm: FormGroup;
  institutionId!: number;
  isFormVisible: boolean = true;  // Flag to manage form visibility
  @Input() institution!: Institution;
  @Output() institutionUpdated = new EventEmitter<Institution>();
  @Output() cancelEdit = new EventEmitter<void>();

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private institutionService: InstitutionService,
    public router: Router  //
  ) {
    this.institutionForm = this.fb.group({
      institutionId: [''], // hidden, but needed
      name: ['', Validators.required],
      location: ['', Validators.required],
    });
  }
 
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['institution'] && this.institution) {
      this.institutionForm.patchValue({
        institutionId: this.institution.institutionId,
        name: this.institution.name,
        location: this.institution.location
      });
    }
  }
  
  onUpdate(): void {
    if (this.institutionForm.valid) {
      const updatedInstitution = this.institutionForm.value;
      this.institutionService.updateInstitution(updatedInstitution).subscribe(() => {
        this.institutionUpdated.emit(updatedInstitution);
      });
    }
  }
onCancel(): void {
  this.cancelEdit.emit();
}
}
