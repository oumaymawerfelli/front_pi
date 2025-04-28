import { Component, OnInit } from '@angular/core';
import { ResearchProjectService } from 'src/app/core/services/research-project.service'; // Adjust to the correct path
import { Router } from '@angular/router';
import { ResearchProject } from 'src/app/core/models/research-project'; // Adjust to the correct path
import { MatDialog } from '@angular/material/dialog';
import { AddResearchComponent } from '../add-research/add-research.component';  // adjust path if needed
import { ActivatedRoute } from '@angular/router';
import { ModalConfirmDeleteComponent } from 'src/app/university/modal-confirm-delete/modal-confirm-delete.component';
import { EditResearchComponent } from '../edit-research/edit-research.component';

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
  isModalVisible: boolean = false; // Controls visibility of the delete confirmation modal
  selectedProjectIdToDelete: number | null = null; // Stores the selected project ID to delete



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
    const dialogRef = this.dialog.open(EditResearchComponent, {
      width: '600px', // you can adjust the size
      data: { id: projectId }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      // Refresh list or handle after closing edit
      console.log('The dialog was closed');
    });
  }
  deleteProject(id: number): void {
    if (id === undefined) return;
  
    this.researchProjectService.deleteProject(id).subscribe(() => {
      console.log(`Project with ID ${id} deleted`);
      this.getResearchProjects(); // Refresh the list of projects
    });
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
  

  



  openAddResearchDialog(event: Event): void {
    event.preventDefault();

    // Open the dialog with the AddResearchComponent and custom styles
    const dialogRef = this.dialog.open(AddResearchComponent, {
      width: '800px', // Set dialog width (adjusted for your preference)
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'projectAdded') {
        this.refreshResearchProjects(); // Refresh after adding a project
      }
    });
  }

  // This method should fetch the latest list of research projects
  refreshResearchProjects() {
    this.researchProjectService.getProjects().subscribe((projects) => {
      this.researchProjects = projects;
    });
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
  openDeleteModal(projectId: number | undefined): void {
    if (projectId === undefined) {
      console.error('Project ID is undefined');
      return;
    }
    this.isModalVisible = true; // Open the modal for deletion
    this.selectedProjectIdToDelete = projectId; // Store the selected project ID to delete
  }
  
  
  onConfirmDelete(): void {
    if (this.selectedProjectIdToDelete !== null) {
      this.researchProjectService.deleteProject(this.selectedProjectIdToDelete).subscribe(
        () => {
          console.log(`Project with ID ${this.selectedProjectIdToDelete} deleted successfully.`);
          this.getResearchProjects(); // Refresh the list of research projects
          this.isModalVisible = false; // Close modal after successful deletion
          this.selectedProjectIdToDelete = null; // Reset selected ID
        },
        (error) => {
          console.error('Error while deleting project:', error);
          alert('Error occurred while deleting the project');
        }
      );
    }
  }
  
  onCancelDelete(): void {
    this.isModalVisible = false; // Close the modal without making changes
    this.selectedProjectIdToDelete = null; // Reset the selected project ID
  }


  openEditResearchDialog(event: Event, project: ResearchProject): void {
    event.preventDefault();

    const dialogRef = this.dialog.open(EditResearchComponent, {
        width: '800px',
        data: project
    });

    dialogRef.afterClosed().subscribe(result => {
        if (result === 'projectUpdated') {
            this.refreshResearchProjects();
        }
    });
}
  
  
  
  


  
}