import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResearchProjectService } from 'src/app/core/services/research-project.service';
import { ResearchProject } from 'src/app/core/models/research-project';

@Component({
  selector: 'app-edit-research',
  templateUrl: './edit-research.component.html',
  styleUrls: ['./edit-research.component.css']
})
export class EditResearchComponent implements OnInit {
  projectId: number = 0;

  project: ResearchProject = {
    projectId: 0,
    title: '',
    description: '',
    startDate: new Date(), // Always a Date
    estimatedDuration: 0,
    researchFocus: '',
    status: '',
    soilType: '',
    waterRequirement: 0,
    climateConditions: '',
    fundingSource: ''
  };

  minDate: string;

  constructor(
    private route: ActivatedRoute,
    private researchProjectService: ResearchProjectService,
    private router: Router
  ) {
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.projectId = +params['id'];
      this.getProjectDetails(this.projectId);
    });
  }

  getProjectDetails(id: number): void {
    this.researchProjectService.getProjectById(id).subscribe(
      (response) => {
        if (response) {
          // Ensure date is converted to Date object if needed
          this.project = {
            ...response,
            startDate: new Date(response.startDate) // This ensures correct typing
          };
        } else {
          alert('Project not found!');
          this.router.navigate(['/research']);
        }
      },
      (error) => {
        console.error('Error fetching project details:', error);
        alert('An error occurred while fetching the project details.');
      }
    );
  }

  onSubmit(): void {
    console.log('Updating project:', this.project);
    this.researchProjectService.updateProject(this.projectId, this.project).subscribe(
      (response) => {
        console.log('Project Updated:', response);
        this.router.navigate(['/research']);
      },
      (error) => {
        console.error('Error updating project:', error);
        alert('An error occurred while updating the project. Please try again.');
      }
    );
  }
}
