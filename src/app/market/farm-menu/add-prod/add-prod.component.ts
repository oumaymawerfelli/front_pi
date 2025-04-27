import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/core/services/product.service'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-prod',
  templateUrl: './add-prod.component.html',
  styleUrls: ['./add-prod.component.css']
})
export class AddProdComponent {
  productForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router
  ) {
    this.productForm = this.fb.group({
      productName: ['', Validators.required],
      productPrice: ['', [Validators.required, Validators.min(0)]],
      productDescription: [''],
      productCategory: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.productForm.valid) {
      const product = this.productForm.value;
      this.productService.addProduct(product).subscribe({
        next: (response) => {
          console.log('Produit ajouté avec succès', response);
          this.productForm.reset();
          // Redirect or notify
          this.router.navigate(['/farm-menu']); // ou autre page après ajout
        },
        error: (err) => {
          console.error('Erreur lors de l\'ajout', err);
        }
      });
    }
  }
}
