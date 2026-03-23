import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterModule, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatMenuModule } from '@angular/material/menu';
import { Auth } from '../../services/auth';
import { CartService } from '../../services/cart';
import { ProductService } from '../../services/product';
import { User } from '../../models/user';
import { Product } from '../../models/product';
import { filter } from 'rxjs/operators';
import { WishlistService } from '../../services/wishlist';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatBadgeModule,
    MatMenuModule
  ],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class Navbar implements OnInit {

  currentUser: User | null = null;
  cartCount = 0;
  wishlistCount = 0;
  searchQuery = '';
  suggestions: Product[] = [];
  allProducts: Product[] = [];
  showSuggestions = false;

  constructor(
    private authService: Auth,
    private cartService: CartService,
    private productService: ProductService,
    private router: Router,
    private wishlistService: WishlistService,

  ) {}

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.currentUser = this.authService.getUser();
      this.searchQuery = '';
      this.showSuggestions = false;
    });

    this.currentUser = this.authService.getUser();

    this.cartService.cart$.subscribe(() => {
      this.cartCount = this.cartService.getCartCount();
    });

    // Load all products for suggestions
    this.productService.getAllProducts().subscribe({
      next: (products: Product[]) => {
        this.allProducts = products;
      },
      error: (err: any) => {
        console.error(err);
      }
    });

    this.wishlistService.wishlist$.subscribe(() => {
  this.wishlistCount = this.wishlistService.getWishlistCount();
});
  }

  onSearchInput(): void {
    if (this.searchQuery.trim().length > 0) {
      this.suggestions = this.allProducts.filter(p =>
        p.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      ).slice(0, 5); // Max 5 suggestions
      this.showSuggestions = this.suggestions.length > 0;
    } else {
      this.suggestions = [];
      this.showSuggestions = false;
    }
  }

  selectSuggestion(product: Product): void {
    this.searchQuery = product.name;
    this.showSuggestions = false;
    this.router.navigate(['/products'], {
      queryParams: { search: product.name }
    });
  }

  search(): void {
    if (this.searchQuery.trim()) {
      this.showSuggestions = false;
      this.router.navigate(['/products'], {
        queryParams: { search: this.searchQuery }
      });
    }
  }

  onSearchKeyPress(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.search();
    }
  }

  hideSuggestions(): void {
    setTimeout(() => {
      this.showSuggestions = false;
    }, 200);
  }

  logout(): void {
  this.authService.logout();
  this.wishlistService.clearWishlist();
  this.currentUser = null;
  this.cartService.clearCart();
  this.router.navigate(['/login']);
}

  isLoggedIn(): boolean {
    return this.currentUser !== null;
  }

  isAdminOrStaff(): boolean {
    return this.currentUser?.role === 'ADMIN' || this.currentUser?.role === 'STAFF';
  }
}