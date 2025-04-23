import { Component, OnInit } from '@angular/core';
import { EquipmentService, Equipment } from 'src/app/services-loans/equipment.service';
import { Router } from '@angular/router';

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
pageTitle: any;

  constructor(
    private equipmentService: EquipmentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllEquipment();
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

  // Mise à jour d’un équipement avec fichiers + URLs
  updateEquipment(id: number, equipment: Equipment): void {
    const formData = new FormData();

    formData.append('nameEquipment', equipment.nameEquipment);

    formData.append('descriptionEquipment', equipment.descriptionEquipment);
    formData.append('availabilityEquipment', String(equipment.availabilityEquipment));
    
    // Ajouter les URLs
    const imageUrls = this.imageUrlsInput
      .split(',')
      .map((url) => url.trim())
      .filter((url) => url !== '');
    imageUrls.forEach((url) => {
      formData.append('imageUrls', url);
    });

    // Ajouter les fichiers uploadés
    for (let i = 0; i < this.selectedFiles.length; i++) {
      formData.append('images', this.selectedFiles[i], this.selectedFiles[i].name);
    }

    this.equipmentService.updateEquipment(id, formData).subscribe(() => {
      this.getAllEquipment();
      this.selectedEquipment = null;
      this.selectedFiles = [];
      this.imageUrlsInput = '';
    });
  }
}
