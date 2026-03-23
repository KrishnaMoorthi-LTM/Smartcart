import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ProductService } from '../../../services/product';
import { Auth } from '../../../services/auth';
import { Product } from '../../../models/product';

@Component({
  selector: 'app-product-manage',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './product-manage.html',
  styleUrl: './product-manage.scss'
})
export class ProductManage implements OnInit {

  products: Product[] = [];
  isLoading = true;
  showLowStock = false;
  lowStockLimit = 10;

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: Auth
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['filter'] === 'lowstock') {
        this.showLowStock = true;
      }
    });
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getAllProducts().subscribe({
      next: (data: Product[]) => {
        this.products = data;
        this.isLoading = false;
      },
      error: (err: any) => {
        console.error(err);
        this.isLoading = false;
      }
    });
  }

  isLowStock(quantity: number): boolean {
    return quantity < this.lowStockLimit;
  }

  trackById(index: number, product: any): number {
    return product.id;
  }

  addProduct(): void {
    this.router.navigate(['/admin/products/form']);
  }

  editProduct(product: Product): void {
    this.router.navigate(['/admin/products/form'], {
      queryParams: { id: product.id }
    });
  }

  deleteProduct(product: Product): void {
    if (confirm(`Are you sure you want to delete "${product.name}"?`)) {
      const adminUser = this.authService.getUser();
      this.productService.deleteProduct(product.id!, adminUser as any).subscribe({
        next: () => {
          this.products = this.products.filter(p => p.id !== product.id);
        },
        error: (err: any) => {
          console.error(err);
          alert('Failed to delete product!');
        }
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/admin']);
  }

  isAdmin(): boolean {
  return this.authService.getUser()?.role === 'ADMIN';
}
}