import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  private wishlistItems: Product[] = [];
  private wishlistSubject = new BehaviorSubject<Product[]>([]);

  wishlist$ = this.wishlistSubject.asObservable();

  constructor() {
    const saved = localStorage.getItem('wishlist');
    if (saved) {
      this.wishlistItems = JSON.parse(saved);
      this.wishlistSubject.next(this.wishlistItems);
    }
  }

  addToWishlist(product: Product): void {
    const exists = this.wishlistItems.find(p => p.id === product.id);
    if (!exists) {
      this.wishlistItems.push(product);
      this.save();
    }
  }

  removeFromWishlist(productId: number): void {
    this.wishlistItems = this.wishlistItems.filter(p => p.id !== productId);
    this.save();
  }

  isInWishlist(productId: number): boolean {
    return this.wishlistItems.some(p => p.id === productId);
  }

  getWishlistCount(): number {
    return this.wishlistItems.length;
  }

  clearWishlist(): void {
  this.wishlistItems = [];
  localStorage.removeItem('wishlist');
  this.wishlistSubject.next([]);
}

  private save(): void {
    localStorage.setItem('wishlist', JSON.stringify(this.wishlistItems));
    this.wishlistSubject.next([...this.wishlistItems]);
  }
}