import { Component, OnInit, Inject, Optional } from '@angular/core';
import { ResearchProjectService } from 'src/app/core/services/research-project.service';
import { Router } from '@angular/router';
import { ResearchProject } from 'src/app/core/models/research-project';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-edit-research',
    templateUrl: './edit-research.component.html',
    styleUrls: ['./edit-research.component.css'],  

})
export class EditResearchComponent implements OnInit {
    project: ResearchProject; // Use the ResearchProject interface
    minDate: string;
    formSubmitted = false;

    constructor(
        private researchProjectService: ResearchProjectService,
        private router: Router,
        private dialogRef: MatDialogRef<EditResearchComponent>,
        @Optional() @Inject(MAT_DIALOG_DATA) public data: ResearchProject // Inject ResearchProject
    ) {
        const today = new Date();
        this.minDate = today.toISOString().split('T')[0];
        this.project = {} as ResearchProject; // Initialize to an empty ResearchProject
    }

    ngOnInit(): void {
        if (this.data) {
            this.project = { ...this.data };
        }
    }

    convertWaterRequirement(waterRequirement: string): number {
        if (waterRequirement === 'Low') {
            return 1;
        } else if (waterRequirement === 'Medium') {
            return 2;
        } else if (waterRequirement === 'High') {
            return 3;
        } else {
            return 0;
        }
    }

    onSubmit() {
        this.project.waterRequirement = this.convertWaterRequirement(this.project.waterRequirement.toString()); // Ensure string conversion

        this.researchProjectService.updateProject(this.project).subscribe(
            (response) => {
                console.log('Project Updated:', response);
                this.dialogRef.close('projectUpdated');
                this.formSubmitted = true;
            },
            (error) => {
                console.error('Error updating project:', error);
                alert('An error occurred. Please try again.');
            }
        );
    }

    closeSuccessMessage() {
        this.formSubmitted = false;
    }

    onCancel() {
        this.dialogRef.close();
    }
}