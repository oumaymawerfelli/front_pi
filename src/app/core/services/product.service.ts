import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface Farmer {
  idUser: number;
  name: string;
  email: string;
  
}
export interface Product {
  productId: number;
  productName: string;       
  productDescription: string; 
  productCategory: string; 
  productPrice: number;  
  DiscountPrice: number;  
  productStock: number; 
  farmer: Farmer;     
  productImage: string; 

      

}



@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl = 'http://localhost:8089/pi/products';

  constructor(private http: HttpClient) {}

  // Get all products
  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/get-all-products`);  // Appending the specific endpoint
  }
    // Add a new product
    addProduct(product: Product): Observable<Product> {
      return this.http.post<Product>(`${this.baseUrl}/add-product`, product);
    }
  
    // Update a product
    updateProduct(id: number, product: Product): Observable<Product> {
      return this.http.put<Product>(`${this.baseUrl}/update-product/${id}`, product);
    }
  
    // Get a product by ID
    getProductById(id: number): Observable<Product> {
      return this.http.get<Product>(`${this.baseUrl}/get-product/${id}`);
    }
  
    // Delete a product
    deleteProduct(id: number): Observable<void> {
      return this.http.delete<void>(`${this.baseUrl}/delete-product/${id}`);
    }



}
