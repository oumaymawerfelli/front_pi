import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/core/services/user.service';

// export interface Farmer {
//   idUser: number;
//   name: string;
//   email: string;
  
// }
export interface Product {
  productId: number;
  productName: string;       
  productDescription: string; 
  productCategory: string; 
  productPrice: number;    
  productStock: number; 
  farmerId: number;
   farmerName: string; 
   farmerEmail: string;      
  productImage: string; 

      

}



@Injectable({
  providedIn: 'root',
})
export class ProductService {
  getAll(): Observable<Product[]> {
    // Ensure this method returns an observable
    return this.http.get<Product[]>('your-api-endpoint/products');
  }
  private baseUrl = 'http://localhost:8089/pi/products';

  constructor(private http: HttpClient) {

  }
  private getHeaders() {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }


  // Get all products
  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/get-all-products`);  // Appending the specific endpoint
  }
  getAllProducts2(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/get-all-products2`);  // Appending the specific endpoint
  }


  addProduct(product: Product): Observable<Product> {
    const { farmerName,farmerEmail,farmerId, ...productDetails } = product; // Exclude farmer info, it's handled by the backend
    const headers= this.getHeaders()
    return this.http.post<Product>(`${this.baseUrl}/add-product`, productDetails, {headers
    });
  }
  
  
  
    // Update a product
    updateProduct(id: number, product: Product): Observable<Product> {
      const headers = this.getHeaders();
      return this.http.put<Product>(`${this.baseUrl}/update-product/${id}`, product, { headers });
    }
  
    // Get a product by ID
    getProductById(id: number): Observable<Product> {
      return this.http.get<Product>(`${this.baseUrl}/get-product/${id}`);
    }
  
    // Delete a product
    deleteProduct(id: number): Observable<void> {
      return this.http.delete<void>(`${this.baseUrl}/delete-product/${id}`);
    }

    // New method to get products by user ID
    getProductsByUserId(userId: number): Observable<Product[]> {
      return this.http.get<Product[]>(`${this.baseUrl}/get-products-by-user/${userId}`);
    }



}
