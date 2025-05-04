import { Component, Input } from '@angular/core';
import { Product } from 'src/app/core/services/product.service'; // Adjust path as needed

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  @Input() product!: Product;
  @Input() showEditButton: boolean = false;
  
  onEditProduct() {
    console.log('Edit product clicked for product:', this.product.productName);
    
  }

  
}
