import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';
import { ProductService, Product } from 'src/app/core/services/product.service';

@Component({
  selector: 'app-farm-menu',
  templateUrl: './farm-menu.component.html',
  styleUrls: ['./farm-menu.component.css']
})
export class FarmMenuComponent implements OnInit {
  userName: string = '';
  userEmail: string = '';
  products: Product[] = [];
  myProducts: Product[] = [];  // Products belonging to the connected user
  selectedProduct: Product | null = null; // Product currently being edited

  constructor(private productService: ProductService, private userService: UserService) {}

  ngOnInit() {
    this.userService.getProfile().subscribe(profile => {
      this.userEmail = profile.email;
      this.userName = profile.name;

      this.productService.getAllProducts().subscribe(allProducts => {
        
        // Set placeholder image if needed
        allProducts.forEach(product => {
          const img = product.productImage?.trim().toLowerCase();
          if (!img || img === 'string') {
            product.productImage = 'assets/market-assets/images/placeholder.PNG';
          }
        });

        this.products = allProducts;
        this.myProducts = this.products.filter(product =>
          product.farmer && product.farmer.email === this.userEmail
        );
      });
    });
  }

 
}
