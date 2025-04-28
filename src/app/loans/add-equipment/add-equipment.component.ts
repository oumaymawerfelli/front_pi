import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {LandService  } from 'src/app/services-loans/lands-service.service';
import { ApiService } from 'src/app/services-loans/api.service';


@Component({
  selector: 'app-add-equipment',
  templateUrl: './add-equipment.component.html',
  styleUrls: ['./add-equipment.component.css']
})
export class AddEquipmentComponent {
  equipmentForm: FormGroup;
  pageTitle: any;
  messageFromBackend: any;

  constructor(private fb: FormBuilder, private apiService: ApiService) {
    this.equipmentForm = this.fb.group({
      nameEquipment: ['', Validators.required],
      descriptionEquipment: ['', Validators.required],
      availabilityEquipment: [true], // default to true
      images: [''] // comma-separated image URLs
    });
  }

  submitEquipment() {
    if (this.equipmentForm.valid) {
      const equipment = {
        ...this.equipmentForm.value,
        images: this.equipmentForm.value.images
          .split(',')
          .map((s: string) => s.trim())
          .filter((s: string) => s !== '')
      };

      this.apiService.addEquipment(equipment).subscribe({
        next: () => {
          alert('Equipment added successfully!');
          this.equipmentForm.reset({ availabilityEquipment: true });
          this.closeModal();
        },
        error: (err) => {
          console.error(err);
          alert('Failed to add equipment.');
        }
      });
    }
  }

  closeModal() {
    const modalElement = document.getElementById('addEquipmentModal');
    if (modalElement) {
      // Ensure Bootstrap is available globally
      const modalInstance = (window as any).bootstrap.Modal.getInstance(modalElement);
      modalInstance?.hide();
    }
  }
}