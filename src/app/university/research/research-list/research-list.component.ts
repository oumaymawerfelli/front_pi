import { Component, OnInit } from '@angular/core';
import { ResearchProjectService } from 'src/app/core/services/research-project.service'; // Adjust to the correct path
import { Router } from '@angular/router';
import { ResearchProject } from 'src/app/core/models/research-project'; // Adjust to the correct path

@Component({
  selector: 'app-research-list',
  templateUrl: './research-list.component.html',
})
export class ResearchListComponent implements OnInit {

  researchProjects: ResearchProject[] = [];

  constructor(
    private researchProjectService: ResearchProjectService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getResearchProjects();
  }

  getResearchProjects(): void {
    this.researchProjectService.getProjects().subscribe((projects) => {
      this.researchProjects = projects;
    });
  }

  

  deleteProject(projectId: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce projet ?')) {
      this.researchProjectService.deleteProject(projectId).subscribe(
        () => {
          this.researchProjects = this.researchProjects.filter(
            (project) => project.projectId !== projectId // Remplacer 'id' par 'projectId'
          );
          alert('Le projet a été supprimé.');
        },
        (error) => {
          console.error('Erreur lors de la suppression du projet:', error);
          alert('Erreur lors de la suppression du projet.');
        }
      );
    }
  }

  viewDetails(projectId: number): void {
    this.router.navigate(['/research-project', projectId]); // Redirige vers la page de détails avec l'ID du projet
  }
  
  
}
