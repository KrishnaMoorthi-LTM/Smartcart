import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ProductService } from '../../services/product';
import { Product } from '../../models/product';
import { WishlistService } from '../../services/wishlist';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './product-list.html',
  styleUrl: './product-list.scss'
})
export class ProductList implements OnInit {

  products: Product[] = [];
  filteredProducts: Product[] = [];
  isLoading = true;

  // Search & Sort
  searchQuery = '';
  sortOption = 'default';

  // Price Filter
  minPrice = 0;
  maxPrice = 100000;
  selectedMaxPrice = 100000;

  sortOptions = [
    { value: 'default', label: 'Relevance' },
    { value: 'price_asc', label: 'Price: Low to High' },
    { value: 'price_desc', label: 'Price: High to Low' },
    { value: 'name_asc', label: 'Name: A to Z' },
    { value: 'name_desc', label: 'Name: Z to A' },
  ];

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
      private wishlistService: WishlistService
  ) {}

  ngOnInit(): void {
    // Get search query from URL if any
    this.route.queryParams.subscribe(params => {
      if (params['search']) {
        this.searchQuery = params['search'];
      }
      this.loadProducts();
    });
  }

  loadProducts(): void {
    this.productService.getAllProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.filteredProducts = data;
        this.isLoading = false;
        this.applyFilters();
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
      }
    });
  }

  applyFilters(): void {
    let result = [...this.products];

    // Search filter
    if (this.searchQuery) {
      result = result.filter(p =>
        p.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }

    // Price filter
    result = result.filter(p => p.price <= this.selectedMaxPrice);

    // Sort
    switch (this.sortOption) {
      case 'price_asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'name_asc':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name_desc':
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
    }

    this.filteredProducts = result;
  }

  onSearchChange(): void {
    this.applyFilters();
  }

  onSortChange(): void {
    this.applyFilters();
  }

  onPriceChange(): void {
    this.applyFilters();
  }

  clearFilters(): void {
    this.searchQuery = '';
    this.sortOption = 'default';
    this.selectedMaxPrice = this.maxPrice;
    this.applyFilters();
  }

  goToProductDetail(id: number): void {
    this.router.navigate(['/products', id]);
  }

  onImageError(event: any): void {
    event.target.src = 'https://via.placeholder.com/200x200?text=No+Image';
  }

toggleWishlist(event: Event, product: Product): void {
  event.stopPropagation();
  if (this.wishlistService.isInWishlist(product.id!)) {
    this.wishlistService.removeFromWishlist(product.id!);
  } else {
    this.wishlistService.addToWishlist(product);
  }
}

isInWishlist(productId: number): boolean {
  return this.wishlistService.isInWishlist(productId);
}

}