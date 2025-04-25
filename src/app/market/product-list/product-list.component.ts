import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/core/services/product.service'; 
import { Product } from 'src/app/core/services/product.service'; 

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  searchText: string = '';

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getAllProducts().subscribe((data) => {
      this.products = data.map((product) => {
        if (!product.productImage) {
          product.productImage = 'assets/market-assets/images/placeholder.PNG'; // Assign placeholder image
        }
        return product;
      });
    });
  }
}
