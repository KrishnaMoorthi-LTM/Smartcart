import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/product';

export interface CartItem {
  product: Product;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartItems: CartItem[] = [];
  private cartSubject = new BehaviorSubject<CartItem[]>([]);

  cart$ = this.cartSubject.asObservable();

  addToCart(product: Product): void {
    const existing = this.cartItems.find(i => i.product.id === product.id);
    if (existing) {
      existing.quantity++;
    } else {
      this.cartItems.push({ product, quantity: 1 });
    }
    this.cartSubject.next([...this.cartItems]);
  }

  removeFromCart(productId: number): void {
    this.cartItems = this.cartItems.filter(i => i.product.id !== productId);
    this.cartSubject.next([...this.cartItems]);
  }

  increaseQuantity(productId: number): void {
    const item = this.cartItems.find(i => i.product.id === productId);
    if (item) {
      item.quantity++;
      this.cartSubject.next([...this.cartItems]);
    }
  }

  decreaseQuantity(productId: number): void {
    const item = this.cartItems.find(i => i.product.id === productId);
    if (item && item.quantity > 1) {
      item.quantity--;
      this.cartSubject.next([...this.cartItems]);
    } else {
      this.removeFromCart(productId);
    }
  }

  getCartCount(): number {
    return this.cartItems.reduce((sum, i) => sum + i.quantity, 0);
  }

  getTotalPrice(): number {
    return this.cartItems.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
  }

  clearCart(): void {
    this.cartItems = [];
    this.cartSubject.next([]);
  }
}