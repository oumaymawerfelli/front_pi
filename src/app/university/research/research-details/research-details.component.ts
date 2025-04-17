import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ResearchProjectService } from 'src/app/core/services/research-project.service';
import { ResearchProject } from 'src/app/core/models/research-project';

@Component({
  selector: 'app-research-details',
  templateUrl: './research-details.component.html',
  styleUrls: ['./research-details.component.css'], // Lien vers ton fichier CSS

})
export class ResearchDetailsComponent implements OnInit {
  projectId: number = 0;  // Initialisation de projectId à 0
  researchProject: ResearchProject | undefined;

  constructor(
    private route: ActivatedRoute,
    private researchProjectService: ResearchProjectService
  ) {}

  ngOnInit(): void {
    // Récupérer l'ID du projet depuis l'URL
    this.projectId = +this.route.snapshot.paramMap.get('id')!;

    // Appeler le service pour récupérer les détails du projet
    this.researchProjectService.getProjectById(this.projectId).subscribe(
      (project) => {
        this.researchProject = project; // Stocker les détails du projet
      },
      (error) => {
        console.error('Erreur lors de la récupération du projet:', error);
      }
    );
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
