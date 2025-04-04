import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Export interfaces first
export interface ImageItem {
  url: string;
  title: string;
  description: string;
}

export interface EquipmentImage extends ImageItem {
  type: 'exterior' | 'interior' | 'operation';
}

export interface LoanItem {
  id?: string;
  name: string;
  description: string;
  duration: string;
  specifications: string[];
  images: EquipmentImage[];
  featuredImage?: string;
}

export interface LandItem {
  images: ImageItem[];
  location: string;
  size: number;
  soilType: string;
  waterRequirement: string;
  features: string[];
}
export interface LandItem {
  images: ImageItem[];
  location: string;
  size: number;
  soilType: string;
  waterRequirement: string;
  features: string[];
  
}

@Component({
  selector: 'app-loan-info',
  templateUrl: './loan-info.component.html',
  styleUrls: ['./loan-info.component.css']
})
export class LoanInfoComponent implements OnInit {
  equipmentItems: LoanItem[] = [
    {
      name: 'Agricultural Tractors',
      description: 'Modern farming tractors with GPS guidance',
      duration: '6-24 months',
      specifications: ['120 HP', '4WD', 'Auto Steering'],
      featuredImage: 'assets/img/hero_1.jpg',
      images: [
        { url: 'assets/img/frontview.jpg', title: 'Front View', description: 'Modern exterior design', type: 'exterior' },
        { url: 'assets/img/cabin.jpg', title: 'Operator Cabin', description: 'Ergonomic control panel', type: 'interior' },
        { url: 'assets/img/fieldoperation.jpg', title: 'Field Operation', description: 'Demonstration of plowing', type: 'operation' }
      ]
    },
    {
      name: ' Sidi Rezig, Mégrine, Tunisia',
      description: 'Combine harvesters for grain crops',
      duration: '12-36 months',
      specifications: ['600L Capacity', 'Auto Threshing'],
      featuredImage: 'assets/img/equipment2-featured.jpg',
      images: [
        { url: 'assets/img/hav.jpg', title: 'Combine Harvester', description: 'High-efficiency harvesting machine', type: 'exterior' },
        { url: 'assets/img/havvv.jpg', title: 'In Action', description: 'Harvesting grains in large fields', type: 'operation' }
      ]
    }
  ];

  landItems: LandItem[] = [
    {
      images: [
        { url: 'assets/img/land1.jpg', title: 'Main View', description: 'Farmland overview' },
        { url: 'assets/img/land1_irrigation.jpg', title: 'Irrigation System', description: 'Installed water irrigation' },
        { url: 'assets/img/land1_access.jpg', title: 'Access Road', description: 'Road access for easy transport' }
      ],
      location: 'North Farmlands',
      size: 50,
      soilType: 'Loamy Soil',
      waterRequirement: 'Medium',
      features: ['Irrigation System', 'Access Road']
    },
    {
      images: [
        { url: 'assets/img/land2.jpg', title: 'Main View', description: 'Scenic river valley farmland' },
        { url: 'assets/img/land2_soil.jpg', title: 'Soil Quality', description: 'High fertility alluvial soil' }
      ],
      location: 'River Valley Plots',
      size: 75,
      soilType: 'Alluvial Soil',
      waterRequirement: 'High',
      features: ['River Access', 'Fertile Land']
    }
  ];

  loanRequest = {
    id: 'LN-202308-001',
    status: 'Under Review',
    availabilityDate: '2023-10-15',
    loanDuration: '12 months',
    approvalDate: ''
  };

  borrower = {
    name: 'John Doe',
    contact: 'john.doe@agrifin.com',
    affiliation: 'National Farmers Association',
    creditRating: 'A+'
  };

  selectedImageIndex: { [key: number]: number } = {};
  selectedLandImageIndex: { [key: number]: number } = {};

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.equipmentItems.forEach((_, index) => {
      this.selectedImageIndex[index] = 0;
    });

    this.landItems.forEach((_, index) => {
      this.selectedLandImageIndex[index] = 0;
    });
  }

  nextImage(equipmentIndex: number): void {
    const images = this.equipmentItems[equipmentIndex].images;
    this.selectedImageIndex[equipmentIndex] = (this.selectedImageIndex[equipmentIndex] + 1) % images.length;
  }

  previousImage(equipmentIndex: number): void {
    const images = this.equipmentItems[equipmentIndex].images;
    this.selectedImageIndex[equipmentIndex] = (this.selectedImageIndex[equipmentIndex] - 1 + images.length) % images.length;
  }

  nextLandImage(landIndex: number): void {
    const images = this.landItems[landIndex].images;
    this.selectedLandImageIndex[landIndex] = (this.selectedLandImageIndex[landIndex] + 1) % images.length;
  }

  previousLandImage(landIndex: number): void {
    const images = this.landItems[landIndex].images;
    this.selectedLandImageIndex[landIndex] = (this.selectedLandImageIndex[landIndex] - 1 + images.length) % images.length;
  }

  redirectToLoanApplication(item: LoanItem | LandItem): void {
    this.router.navigate(['/loan-application'], {
      state: { selectedItem: item, borrower: this.borrower }
    });
  }
  
  }

