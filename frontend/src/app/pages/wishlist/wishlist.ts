import { Component, OnInit } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { WishlistService } from '../../services/wishlist';
import { CartService } from '../../services/cart';
import { Product } from '../../models/product';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [
    CommonModule,
    DecimalPipe,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './wishlist.html',
  styleUrl: './wishlist.scss'
})
export class Wishlist implements OnInit {

  wishlistItems: Product[] = [];

  constructor(
    private wishlistService: WishlistService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.wishlistService.wishlist$.subscribe(items => {
      this.wishlistItems = items;
    });
  }

  removeFromWishlist(productId: number): void {
    this.wishlistService.removeFromWishlist(productId);
  }

  moveToCart(product: Product): void {
    this.cartService.addToCart(product);
    this.wishlistService.removeFromWishlist(product.id!);
  }

  goToProducts(): void {
    this.router.navigate(['/products']);
  }

  goToProductDetail(id: number): void {
    this.router.navigate(['/products', id]);
  }

  onImageError(event: any): void {
    event.target.src = 'https://via.placeholder.com/200x200?text=No+Image';
  }
}