import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ProductService } from '../../../services/product';
import { Auth } from '../../../services/auth';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard implements OnInit {

  totalProducts = 0;
  totalStock = 0;
  lowStockProducts: any[] = [];
  isLoading = true;

  constructor(
    private productService: ProductService,
    private router: Router,
    private authService: Auth

  ) {}

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe({
      next: (products: any[]) => {
        this.totalProducts = products.length;
        this.totalStock = products.reduce((sum: number, p: any) => sum + p.quantity, 0);
        this.lowStockProducts = products.filter((p: any) => p.quantity < 10);
        this.isLoading = false;
      },
      error: (err: any) => {
        console.error(err);
        this.isLoading = false;
      }
    });
  }

  goToManageProducts(): void {
    this.router.navigate(['/admin/products']);
  }

  goToAddProduct(): void {
    this.router.navigate(['/admin/products/form']);
  }
  goToOrders(): void {
  this.router.navigate(['/admin/orders']);
}
goToLowStock(): void {
  this.router.navigate(['/admin/products'], {
    queryParams: { filter: 'lowstock' }
  });
}
goToUsers(): void {
  this.router.navigate(['/admin/users']);
}
isAdmin(): boolean {
  const user = this.authService.getUser();
  return user?.role === 'ADMIN';
}
}