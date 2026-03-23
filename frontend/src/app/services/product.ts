import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = 'http://localhost:8080/api/products';

  constructor(private http: HttpClient) {}

  // Get all products - Everyone
  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  // Get product by id - Everyone
  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  // Create product - Admin or Staff
  createProduct(product: Product, user: User): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, { product, user });
  }

  // Update product - Admin or Staff
  updateProduct(id: number, product: Product, user: User): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${id}`, { product, user });
  }

  // Delete product - Admin only
  deleteProduct(id: number, user: User): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { body: user });
  }
}