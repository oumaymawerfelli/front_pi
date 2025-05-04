import { Component, OnInit, Input } from '@angular/core';
import { ProductService } from 'src/app/core/services/product.service'; 
import { Product } from 'src/app/core/services/product.service'; 
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  searchText: string = '';
  totalProductCount : number = 0 ;
  totalProductsInStock: number = 0 ;
  totalProductsOutOfStock: number = 0 ;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }


  
  loadProducts(): void {
    this.productService.getAllProducts().subscribe((data) => {
      this.products = data.map((product) => {
        const img = product.productImage?.trim().toLowerCase();
        if (!img || img === 'string') {
          product.productImage = 'assets/images/placeholder.PNG';
        }


        return product;
      });
      this.totalProductCount = this.products.length;
      this.totalProductsInStock = this.products.filter (p=> p.productStock > 0).length;
      this.totalProductsOutOfStock = this.products.filter (p=> p.productStock == 0).length;
    });
  }
 
  selectedFilterRadioButton: string = 'all';
    onFilterChanged(value:string){
      this.selectedFilterRadioButton = value;
    
  }


  

}
