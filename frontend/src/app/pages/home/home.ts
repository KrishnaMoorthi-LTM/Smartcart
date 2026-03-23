import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ProductService } from '../../services/product';
import { Product } from '../../models/product';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home implements OnInit {

  products: Product[] = [];
  featuredProducts: Product[] = [];
  isLoading = true;

  categories = [
    { name: 'Electronics', icon: '📱', filter: 'Mobile' },
    { name: 'Laptops', icon: '💻', filter: 'Laptop' },
    { name: 'Appliances', icon: '🏠', filter: 'Oven' },
    { name: 'Fashion', icon: '👗', filter: 'Shirt' },
    { name: 'Footwear', icon: '👟', filter: 'Sandal' },
    { name: 'Kitchen', icon: '🍳', filter: 'Cooker' },
  ];

  bannerSlides = [
    { title: 'Big Billion Days!', subtitle: 'Up to 80% off on Electronics', bg: '#2874f0', color: 'white' },
    { title: 'Fashion Sale!', subtitle: 'Flat 50% off on Clothing', bg: '#ff6161', color: 'white' },
    { title: 'Home Appliances', subtitle: 'Best deals on Kitchen & Home', bg: '#ff9f00', color: 'white' },
  ];

  currentSlide = 0;

  constructor(
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.startBannerSlider();
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getAllProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.featuredProducts = data.slice(0, 8);
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
      }
    });
  }

  startBannerSlider(): void {
    setInterval(() => {
      this.currentSlide = (this.currentSlide + 1) % this.bannerSlides.length;
    }, 3000);
  }

  goToProducts(filter?: string): void {
    if (filter) {
      this.router.navigate(['/products'], { queryParams: { search: filter } });
    } else {
      this.router.navigate(['/products']);
    }
  }

  goToProductDetail(id: number): void {
    this.router.navigate(['/products', id]);
  }

  onImageError(event: any): void {
    event.target.src = 'https://via.placeholder.com/200x200?text=No+Image';
  }
}