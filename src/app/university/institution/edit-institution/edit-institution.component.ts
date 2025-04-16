import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InstitutionService } from 'src/app/core/services/institution.service';
import { Institution } from 'src/app/core/models/institution.model';

@Component({
  selector: 'app-edit-institution',
  templateUrl: './edit-institution.component.html',
  styleUrls: ['./edit-institution.component.css']
})
export class EditInstitutionComponent implements OnInit {
  institutionForm: FormGroup;
  institutionId!: number;

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

  ngOnInit(): void {
    this.institutionId = +this.route.snapshot.paramMap.get('id')!;
    this.institutionService.getInstitutionById(this.institutionId).subscribe(data => {
      this.institutionForm.patchValue(data);
    });
  }

  onSubmit(): void {
    if (this.institutionForm.valid) {
      this.institutionService.updateInstitution(this.institutionForm.value).subscribe(() => {
        this.router.navigate(['/institutions']);
      });
    }
  }
}
