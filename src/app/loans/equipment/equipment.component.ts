import { Component, OnInit } from '@angular/core';
import { EquipmentService, Equipment } from 'src/app/services-loans/equipment.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-equipment',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.css'],
})
export class EquipmentComponent implements OnInit {
  equipmentList: Equipment[] = [];
  selectedEquipment: Equipment | null = null;
  selectedFiles: File[] = [];
  imageUrlsInput: string = '';
  searchId!: number;
  searchError: boolean = false;
  pageTitle: string = "Equipment Management";

  filter = {
    name: '',
    type: '',
    availability: null
  };

  
  applyFilter(): void {
    this.equipmentService.filterEquipments(this.filter).subscribe((data: Equipment[]) => {
      this.equipmentList = data;
    });
  }
  showAddForm: boolean = false;
selectedEquipmentId: number | null = null;



  

  constructor(
   
      private equipmentService: EquipmentService,
      private router: Router,
      private http: HttpClient // ✅ inject it here!
   
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      const el = document.getElementById('equipmentManagementSection');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100); // Small delay to wait until view is rendered
  
    this.getAllEquipment();
    
  }



  
  toggleAddForm(equipmentId: number): void {
    if (this.selectedEquipmentId === equipmentId && this.showAddForm) {
      // Close the form if it's already open for the same equipment
      this.showAddForm = false;
      this.selectedEquipmentId = null;
    } else {
      // Open the form for this equipment
      this.showAddForm = true;
      this.selectedEquipmentId = equipmentId;
    }
  }


  // Récupérer tous les équipements
  getAllEquipment(): void {
    this.equipmentService.getEquipments().subscribe((data: Equipment[]) => {
      this.equipmentList = data;
    });
  }
  

  // Rechercher un équipement par ID
  getEquipment(id: number): void {
    if (!id) return;

    this.equipmentService.getEquipment(id).subscribe({
      next: (data: Equipment) => {
        this.selectedEquipment = data;
        this.equipmentList = [data];
        this.searchError = false;
      },
      error: () => {
        this.searchError = true;
        this.selectedEquipment = null;
        this.getAllEquipment(); // recharge toute la liste si pas trouvé
      },
    });
  }

  // Réinitialiser la recherche
  resetSearch(): void {
    this.searchId = 0;
    this.searchError = false;
    this.selectedEquipment = null;
    this.getAllEquipment();
  }

  // Supprimer un équipement
  deleteEquipment(id: number): void {
    this.equipmentService.deleteEquipment(id).subscribe(() => {
      this.getAllEquipment();
    });
  }

  // Gestion de la sélection de fichiers
  onFileSelected(event: any): void {
    this.selectedFiles = event.target.files;
  }

  updateEquipment(id: number, equipment: Equipment): void {
    const formData = new FormData();
  
    formData.append('nameEquipment', equipment.nameEquipment || '');
    formData.append('descriptionEquipment', equipment.descriptionEquipment || '');
    formData.append('availabilityEquipment', String(equipment.availabilityEquipment));
  
    // Prepare image URLs if available
    const imageUrls = this.imageUrlsInput
      ? this.imageUrlsInput.split(',').map(url => url.trim()).filter(url => url !== '')
      : (equipment.images || []);
  
    imageUrls.forEach((url) => {
      formData.append('imageUrls', url); // Append multiple imageUrls correctly
    });
  
    for (let i = 0; i < this.selectedFiles.length; i++) {
      formData.append('images', this.selectedFiles[i], this.selectedFiles[i].name);
    }
  
    this.http.put(`http://localhost:8089/your-backend-api/equipment/update/${id}`, formData)
      .subscribe({
        next: (response: any) => {
          console.log('Update successful:', response);
          this.getAllEquipment();
          this.resetForm();
        },
        error: (error: any) => {
          console.error('Update failed:', error);
        }
      });
  }
  
  resetForm() {
    this.selectedFiles = [];
    this.imageUrlsInput = '';
    this.selectedEquipmentId = null;
    this.showAddForm = false;
  }
}  
