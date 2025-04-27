import { Component, OnInit } from '@angular/core';
import { ResearchProjectService } from 'src/app/core/services/research-project.service'; // Adjust to the correct path
import { Router } from '@angular/router';
import { ResearchProject } from 'src/app/core/models/research-project'; // Adjust to the correct path
import { MatDialog } from '@angular/material/dialog';
import { AddResearchComponent } from '../add-research/add-research.component';  // adjust path if needed
import { ActivatedRoute } from '@angular/router';

declare var AOS: any;
declare var GLightbox: any;

@Component({
  selector: 'app-research-list',
  templateUrl: './research-list.component.html',
})
export class ResearchListComponent implements OnInit {

  researchProjects: ResearchProject[] = [];
  lightbox: any; // Pas de const ici
  showAddForm = false;
  showDetails = false;
  selectedProjectId: number | null = null;



  constructor(
    private researchProjectService: ResearchProjectService,
    private router: Router,
    private dialog: MatDialog,
    private route: ActivatedRoute
  ) {}



  ngOnInit(): void {
    AOS.init();
    this.lightbox = GLightbox();
    this.getResearchProjects();
  
    // Get 'id' from the route parameters and assign it to selectedProjectId
    const projectId = this.route.snapshot.paramMap.get('id');  // Use 'id' instead of 'projectId'
    this.selectedProjectId = projectId ? +projectId : null;  // Convert it to a number and assign it
  }
  

  getResearchProjects(): void {
    this.researchProjectService.getProjects().subscribe((projects) => {
      this.researchProjects = projects;
    });
  }

  editProject(projectId: number) {
    // Rediriger vers la page d'édition du projet
    this.router.navigate(['/research/edit', projectId]); // Adaptez cela à votre routage
  }
  deleteProject(projectId: number): void {
    console.log(`Attempting to delete project with ID: ${projectId}`);
    if (confirm('Êtes-vous sûr de vouloir supprimer ce projet ?')) {
      this.researchProjectService.deleteProject(projectId).subscribe(
        () => {
          // On successful deletion, filter out the project from the list
          console.log('Project deleted successfully');
          this.researchProjects = this.researchProjects.filter(
            (project) => project.projectId !== projectId
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

  
  


  ////images
  getImageByFocus(researchFocus: string): string {
    // Define the images with explicit type assertion for keys
    const images: { [key: string]: string } = {
      'Soil Fertility Management': 'assets/images/Soil Fertility Management.jpg',
      'Crop Rotation and Diversification': 'assets/images/Crop Rotation and Diversification.jpg',
      'Water Conservation Techniques': 'assets/images/Water Conservation Techniques.jpg',
      'Organic Farming Practices': 'assets/images/Organic Farming Practices.jpg',
      'Agroforestry': 'assets/images/Agroforestry.jpg',
      'Precision Agriculture': 'assets/images/Precision Agriculture.jpg',
      'Integrated Pest Management': 'assets/images/Integrated Pest Management.jpg',
      'Soil Erosion Control': 'assets/images/Soil Erosion Control.jpg',
      'Hydroponics or Aquaponics': 'assets/images/Hydroponics or Aquaponics.jpeg',
      'Sustainable Livestock Grazing': 'assets/images/Sustainable Livestock Grazing.jpg',
      'Agrochemical Use and Environmental Impact': 'assets/images/Agrochemical Use and Environmental Impact.jpg',
      'Biochar for Soil Improvement': 'assets/images/Biochar for Soil Improvement.jpg',
      'Plant Disease Management': 'assets/images/Plant Disease Management.jpg',
      'Composting and Waste Recycling': 'assets/images/Composting and Waste Recycling.jpg',
      'Renewable Energy Integration': 'assets/images/Renewable Energy Integration.jpg',
      'Agri-ecosystem Restoration': 'assets/images/Agri-ecosystem Restoration.jpg',
      'Improved Irrigation Systems': 'assets/images/Improved Irrigation Systems.jpg',
      'Bee Pollination and Crop Productivity': 'assets/images/Bee Pollination and Crop Productivity.jpg',
      'Forest Farming': 'assets/images/Forest Farming.jpg',
      'Medicinal Plant Cultivation': 'assets/images/Medicinal Plant Cultivation.jpeg',
    };
  
    // Use the provided researchFocus string to get the correct image, or return a default image
    return images[researchFocus] || 'assets/images/agriculture.jpg'; // Default image if no match found
  }
  getDay(date: Date): string {
    const d = new Date(date);
    return d.getDate().toString();  // Gets the day of the month
  }
  
  getMonth(date: Date): string {
    const d = new Date(date);
    return d.toLocaleString('default', { month: 'long' }); // "December", "January", etc.
  }
  

  openAddResearchDialog(event: MouseEvent): void {
    event.preventDefault(); // Prevent the default anchor behavior
  
    // Open the dialog with the AddResearchComponent and custom styles
    const dialogRef = this.dialog.open(AddResearchComponent, {
      width: '800px', // Set dialog width (adjusted for your preference)
      panelClass: 'custom-dialog-container', // Custom dialog container class for styling
      disableClose: true, // Prevent dialog from closing by clicking outside
    });
  
    // Optionally subscribe to the result after the dialog is closed
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {  // If the result is true, it means the project was added
        this.refreshResearchProjects(); // Refresh the list of projects
      }
    });
  }
  

  refreshResearchProjects() {
    this.getResearchProjects(); // or whatever method you already have to reload the projects
  }

  onProjectAdded(): void {
    // Reload the list when a new project is added
    this.refreshResearchProjects();
  }
 

  // Close the modal when the closeModal event is emitted
  closeModal(): void {
    this.selectedProjectId = null; // Reset projectId to hide the modal
  }

   // Open the modal and set the selected project ID
   openModal(projectId: number): void {
    this.selectedProjectId = projectId;
  }


  
}