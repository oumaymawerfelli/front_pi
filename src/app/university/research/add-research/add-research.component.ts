import { Component,ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import { ResearchProjectService } from 'src/app/core/services/research-project.service';
import { Router } from '@angular/router';
import { ResearchProject } from 'src/app/core/models/research-project';
import { MatDialogRef } from '@angular/material/dialog';  // Import MatDialogRef


@Component({
  selector: 'app-add-research',
  templateUrl: './add-research.component.html',
  styleUrls: ['./add-research.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AddResearchComponent {
  @Output() projectAdded = new EventEmitter<void>();
  isFormVisible: boolean = true; // Flag to control form visibility


  newProject: any = {
    title: '',
    description: '',
    startDate: '',
    estimatedDuration: null,
    researchFocus: '',
    status: '',
    soilType: '',
    waterRequirement: null,
    climateConditions: '',
    fundingSource: ''
  };

  minDate: string;  // Declare the minDate property here
  formSubmitted = false; // This will control form visibility

  constructor(private researchProjectService: ResearchProjectService, private router: Router,    private dialogRef: MatDialogRef<AddResearchComponent>  // Inject MatDialogRef here
  ) {
    // Get today's date in YYYY-MM-DD format
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];
    
  }

  // Method to convert waterRequirement strings to numbers
  convertWaterRequirement(waterRequirement: string): number {
    if (waterRequirement === 'Low') {
      return 1;
    } else if (waterRequirement === 'Medium') {
      return 2;
    } else if (waterRequirement === 'High') {
      return 3;
    } else {
      return 0;  // Default if no valid value
    }
  }

  onSubmit() {
    this.newProject.waterRequirement = this.convertWaterRequirement(this.newProject.waterRequirement);
  
    console.log('Sending project:', this.newProject);
  
    this.researchProjectService.addProject(this.newProject).subscribe(
      (response) => {
        console.log('Research Project Added:', response);
  
        // Emit event to refresh the list
        this.projectAdded.emit();
  
        // Set formSubmitted to true to show success message
        this.formSubmitted = true;
  
        // Close the form after successful submission
        this.isFormVisible = false;  // Hide the form
      },
      (error) => {
        console.error('Error adding project:', error);
        alert('An error occurred while adding the project. Please try again.');
      }
    );
  }
  // Method to toggle visibility if needed
  toggleForm() {
    this.isFormVisible = !this.isFormVisible;
  }
  // Close the success message and the dialog
  closeSuccessMessage() {
    this.formSubmitted = false;  // Hide the success message
    this.dialogRef.close();  // Close the dialog completely
  }
}
