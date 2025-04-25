import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Product {

  productName: string;       
  productDescription: string; 
  productCategory: string; 
  productPrice: number;  
  DiscountPrice: number;  
  productStock: number;      
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


}
