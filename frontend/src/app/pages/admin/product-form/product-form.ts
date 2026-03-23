import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ProductService } from '../../../services/product';
import { Product } from '../../../models/product';
import { Auth } from '../../../services/auth';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './product-form.html',
  styleUrl: './product-form.scss'
})
export class ProductForm implements OnInit {

  isEditMode = false;
  isLoading = false;
  productId: number | null = null;

  product: Product = {
    name: '',
    price: 0,
    quantity: 0,
    image: '',
    description: ''
  };

  adminUser: any = null;

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: Auth
  ) {}

  ngOnInit(): void {
  this.adminUser = this.authService.getUser();  // ✅ Always set
  const id = this.route.snapshot.queryParams['id'];
  if (id) {
    this.isEditMode = true;
    this.productId = +id;
    this.loadProduct(+id);
  }
}

  loadProduct(id: number): void {
    this.productService.getProductById(id).subscribe({
      next: (data: Product) => {
        this.product = data;
      },
      error: (err: any) => {
        console.error(err);
      }
    });
  }

  saveProduct(): void {

    console.log('Product:', this.product);
    console.log('AdminUser:', this.adminUser);

    if (!this.product.name || !this.product.price || !this.product.quantity) {
      alert('Please fill all required fields!');
      return;
    }

    this.isLoading = true;

    if (this.isEditMode && this.productId) {
      this.productService.updateProduct(
        this.productId,
        this.product,
        this.adminUser as any
      ).subscribe({
        next: () => {
          this.isLoading = false;
          alert('Product updated successfully!');
          this.router.navigate(['/admin/products']);
        },
        error: (err: any) => {
          this.isLoading = false;
          alert('Failed to update product!');
        }
      });
    } else {
      this.productService.createProduct(
        this.product,
        this.adminUser as any
      ).subscribe({
        next: () => {
          this.isLoading = false;
          alert('Product created successfully!');
          this.router.navigate(['/admin/products']);
        },
        error: (err: any) => {
          this.isLoading = false;
          alert('Failed to create product!');
        }
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/admin/products']);
  }
}