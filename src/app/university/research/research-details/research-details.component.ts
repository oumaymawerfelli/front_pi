import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ResearchProjectService } from 'src/app/core/services/research-project.service';
import { ResearchProject } from 'src/app/core/models/research-project';

@Component({
  selector: 'app-research-details',
  templateUrl: './research-details.component.html',
  styleUrls: ['./research-details.component.css'], 

})
export class ResearchDetailsComponent implements OnInit {
  //projectId: number = 0;  // Initialisation de projectId à 0
  researchProject: ResearchProject | undefined;
  @Input() projectId: number | null = null;
  @Output() closeModal = new EventEmitter<void>(); // Output to emit close event to parent component



  constructor(
    private route: ActivatedRoute,
    private researchProjectService: ResearchProjectService
  ) {}

  ngOnInit(): void {
    if (this.projectId) {
      this.researchProjectService.getProjectById(this.projectId).subscribe(
        (project) => {
          this.researchProject = project;
        },
        (error) => {
          console.error('Error fetching project details:', error);
        }
      );
    }
  }

  // Emit the close event to parent component
  close() {
    this.closeModal.emit();
  }
  

  getStatusClass(status: string): string {
    switch(status) {
      case 'approved':
        return 'approved';
      case 'pending':
        return 'pending';
      case 'rejected':
        return 'rejected';
      default:
        return '';
    }
  }
  
}