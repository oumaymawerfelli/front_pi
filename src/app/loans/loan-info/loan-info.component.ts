import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EquipmentService } from 'src/app/services-loans/equipment.service'; 


export interface Equipment {
  typeEquipment(arg0: string, typeEquipment: any): unknown;
  idEquipment: number;
  nameEquipment: string;
  descriptionEquipment: string;
  availabilityEquipment: boolean;
  images: string[];
}

export interface User {
  idUser: number;
  name: string;
  email: string;
  phone: string;
  role: string;
}

export interface LoanRequest {
  idReq: number;
  loanPurpose: string;
  loanDuration: number;
  startDate: string;
  specialRequest: string;
  statusReq: string;
  signature: string;
  equipment: Equipment;
  land?: any;
  borrower: User;
}

export interface Borrower {
  name: string;
  contact: string;
  affiliation: string;
  creditRating: string;
}

@Component({
  selector: 'app-loan-info',
  templateUrl: './loan-info.component.html',
  styleUrls: ['./loan-info.component.css']
})
export class LoanInfoComponent implements OnInit {

  equipmentItems: Equipment[] = [];
  selectedImageIndex: { [key: number]: number } = {};

  borrower: Borrower = {
    name: 'John Doe',
    contact: 'john.doe@agrifin.com',
    affiliation: 'National Farmers Association',
    creditRating: 'A+'
  };
  
  pageTitle: any;
  messageFromBackend: any;

  constructor(
    private router: Router,
    private equipmentService: EquipmentService
  ) {}

  ngOnInit(): void {
    this.loadEquipmentItems();
  }

  loadEquipmentItems(): void {
    this.equipmentService.getEquipments().subscribe({
      next: (data: Equipment[]) => {
        this.equipmentItems = data;

        // Initialize selected image index for each equipment
        this.equipmentItems.forEach((_, index) => {
          this.selectedImageIndex[index] = 0;
        });
      },
      error: (err: any) => {
        console.error('Failed to load equipment data:', err);
      }
    });
  }

  nextImage(index: number): void {
    const images = this.equipmentItems[index].images;
    this.selectedImageIndex[index] = (this.selectedImageIndex[index] + 1) % images.length;
  }

  previousImage(index: number): void {
    const images = this.equipmentItems[index].images;
    this.selectedImageIndex[index] = (this.selectedImageIndex[index] - 1 + images.length) % images.length;
  }

  redirectToLoanApplication(equipment: Equipment): void {
    this.router.navigate(['/loan-application'], {
      state: { selectedItem: equipment, borrower: this.borrower }
    });
  }
}
