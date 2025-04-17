import { Component } from '@angular/core';
import { ResearchProjectService } from 'src/app/core/services/research-project.service';
import { Router } from '@angular/router';
import { ResearchProject } from 'src/app/core/models/research-project';

@Component({
  selector: 'app-add-research',
  templateUrl: './add-research.component.html',
  styleUrls: ['./add-research.component.css']
})
export class AddResearchComponent {
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

  constructor(private researchProjectService: ResearchProjectService, private router: Router) {
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
    // Convert waterRequirement to a number before submitting
    this.newProject.waterRequirement = this.convertWaterRequirement(this.newProject.waterRequirement);

    console.log('Sending project:', this.newProject); // 🔍 Add this

    this.researchProjectService.addProject(this.newProject).subscribe(
      (response) => {
        console.log('Research Project Added:', response);
        this.router.navigate(['/research']);
      },
      (error) => {
        console.error('Error adding project:', error);
        alert('An error occurred while adding the project. Please try again.');
      }
    );
  }
}
