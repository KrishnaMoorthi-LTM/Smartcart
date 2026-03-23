import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HttpClient } from '@angular/common/http';
import { CartService, CartItem } from '../../services/cart';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './checkout.html',
  styleUrl: './checkout.scss'
})
export class Checkout implements OnInit {

  cartItems: CartItem[] = [];
  totalPrice = 0;
  orderPlaced = false;
  isLoading = false;

  // Delivery form
  name = '';
  phone = '';
  address = '';
  city = '';
  pincode = '';

  constructor(
    private cartService: CartService,
    private router: Router,
    private http: HttpClient,
    private authService: Auth
  ) {}

  ngOnInit(): void {
    this.cartService.cart$.subscribe(items => {
      this.cartItems = items;
      this.totalPrice = this.cartService.getTotalPrice();
    });
    this.cartItems = this.cartService['cartItems'];
    this.totalPrice = this.cartService.getTotalPrice();
  }

  placeOrder(): void {
    if (!this.name || !this.phone || !this.address || !this.city || !this.pincode) {
      alert('Please fill all delivery details!');
      return;
    }

    const user = this.authService.getUser();
    if (!user) {
      this.router.navigate(['/login']);
      return;
    }

    this.isLoading = true;

    const orderRequest = {
      userId: user.id,
      name: this.name,
      phone: this.phone,
      address: this.address,
      city: this.city,
      pincode: this.pincode,
      items: this.cartItems.map(item => ({
        productId: item.product.id,
        quantity: item.quantity,
        price: item.product.price
      }))
    };

    this.http.post('http://localhost:8080/api/orders', orderRequest).subscribe({
      next: () => {
        this.isLoading = false;
        this.orderPlaced = true;
        this.cartService.clearCart();
      },
      error: (err: any) => {
        this.isLoading = false;
        console.error(err);
        alert('Failed to place order!');
      }
    });
  }

  continueShopping(): void {
    this.router.navigate(['/']);
  }

  viewOrders(): void {
    this.router.navigate(['/orders']);
  }
}