import { Component,  Input, Output, EventEmitter } from '@angular/core';
import { ProductService, Product } from 'src/app/core/services/product.service';

@Component({
  selector: 'app-edit-prod',
  templateUrl: './edit-prod.component.html',
  styleUrls: ['./edit-prod.component.css']
})
export class EditProdComponent {
  @Input() productToEdit!: Product;
  @Output() closeEdit = new EventEmitter<void>();
  @Output() productUpdated = new EventEmitter<Product>();

  constructor(private productService: ProductService) {}


  updateProduct() {
    if (!this.productToEdit) return;

    this.productService.updateProduct(this.productToEdit.productId, this.productToEdit).subscribe(
      updatedProduct => {
        console.log('Product updated successfully:', updatedProduct);
        this.productUpdated.emit(updatedProduct);
        this.closeEdit.emit();  // Close the form
      },
      error => {
        console.error('Error updating product:', error);
      }
    );
  }

  cancelEdit() {
    this.closeEdit.emit();
  }


}
