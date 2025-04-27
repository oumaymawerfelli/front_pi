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
  userId: number = 0; // Fixed: Changed to number and initialized with 0
  myProducts: Product[] = [];  // Products belonging to the connected user
  

  constructor(private productService: ProductService, private userService: UserService) {}

  ngOnInit() {
    // Fetch the logged-in user using the getLoggedInUser() method
    this.userService.getLoggedInUser().subscribe(
      (user) => {
        // Safely assign userId if it's not undefined
        if (user.idUser !== undefined) {
          this.userId = user.idUser;
        } else {
          console.error('User idUser is undefined');
        }

        // Set user information
        this.userEmail = user.email;
        this.userName = user.name;

        // Now fetch the products for this user
        this.loadProductsForUser(user);
      },
      (error) => {
        console.error('Error fetching logged-in user:', error);
      }
    );
  }

  // Method to load products for the current user
  loadProductsForUser(user: any) {
    this.productService.getProductsByUserId(this.userId).subscribe(allProducts => {
      // Set placeholder image if needed
      allProducts.forEach(product => {
        const img = product.productImage?.trim().toLowerCase();
        if (!img || img === 'string') {
          product.productImage = 'assets/market-assets/images/placeholder.PNG';
        }
      });

      // Directly assign the products to myProducts
      this.myProducts = allProducts;
    });
  }
  editProduct(product: Product) {
    console.log('Product received:', product);
    // Now you can use the product object as needed
  }

  deleteProduct(productId: number) {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(productId).subscribe(
        () => {
          // If delete is successful, filter the deleted product out of the list
          this.myProducts = this.myProducts.filter(product => product.productId !== productId);
          console.log('Product deleted successfully');
        },
        (error) => {
          console.error('Error deleting product:', error);
        }
      );
    }
  }
}
