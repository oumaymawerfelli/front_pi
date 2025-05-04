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
  

  selectedProduct: Product | null = null;
  isEditing: boolean = false;

  constructor(private productService: ProductService, private userService: UserService) {}

  ngOnInit() {
    // Step 1: Get the logged-in user's ID only
    const userId = this.userService.getLoggedInUserId();  // Use the simple method we discussed

    if (userId !== null) {
      this.userId = userId;

      // // Step 2: Fetch detailed user info if needed
      // this.userService.getLoggedInUser().subscribe(user => {
      //   this.userName = user.name;
      //   this.userEmail = user.email;
      // });

      // Step 3: Directly load products
      this.loadProductsForUser(this.userId);
    } else {
      console.error('No logged-in user found.');
    }
  }

  loadProductsForUser(userId: number) {
    this.productService.getProductsByUserId(userId).subscribe(products => {
      products.forEach(product => {
        const img = product.productImage?.trim().toLowerCase();
        if (!img || img === 'string') {
          product.productImage = 'assets/images/placeholder.PNG';
        }
      });
      this.myProducts = products;
    });
  }

  editProduct(product: Product) {
    console.log('Editing product:', product);
    this.selectedProduct = { ...product };  // Make a copy to avoid direct mutation
    this.isEditing = true;
  }
  
  onProductUpdated(updatedProduct: Product) {
    // Update the product in the list without reloading everything
    const index = this.myProducts.findIndex(p => p.productId === updatedProduct.productId);
    if (index !== -1) {
      this.myProducts[index] = updatedProduct;
    }
  }
  
  onCloseEdit() {
    this.isEditing = false;
    this.selectedProduct = null;
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
