import { Component, Input } from '@angular/core';
import { Product } from 'src/app/core/services/product.service'; // Adjust path as needed

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  @Input() product!: Product;


  
}
