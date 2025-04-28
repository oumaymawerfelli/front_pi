import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/core/services/product.service';
import { Product } from 'src/app/core/services/product.service';

@Component({
  selector: 'app-add-prod',
  templateUrl: './add-prod.component.html',
  styleUrls: ['./add-prod.component.css']
})
export class AddProdComponent {
  productForm!: FormGroup;
  categories = ['Produce', 'Items', 'Equipment', 'Others'];
  submissionSuccess = false;
  isLoading = false;
  showForm: boolean = false;

  constructor(
    private productService: ProductService,
    private fb: FormBuilder
  ) {
    this.productForm = this.fb.group({
      productName: ['', [Validators.required]],
      productDescription: ['', [Validators.required]],
      productCategory: ['', [Validators.required]],
      productPrice: ['', [Validators.required, Validators.min(0)]],
      productStock: ['', [Validators.required, Validators.min(0)]],
      productImage: ['']
    });
  }

  onSubmit(): void {
    if (this.productForm.invalid || this.isLoading) {
      return;
    }

    this.isLoading = true;
    const product: Product = this.productForm.value;

    this.productService.addProduct(product).subscribe({
      next: (response) => {
        console.log('Product added successfully', response);
        this.submissionSuccess = true;
        this.productForm.reset();
        this.isLoading = false;
        
        // Hide success message after 3 seconds
        setTimeout(() => {
          this.submissionSuccess = false;
        }, 3000);
      },
      error: (error) => {
        console.error('Error adding product', error);
        this.isLoading = false;
      }
    });
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
  }
}