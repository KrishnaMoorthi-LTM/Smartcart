import { Component, OnInit } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HttpClient } from '@angular/common/http';
import { Auth } from '../../services/auth';
import { Order } from '../../models/order';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [
    CommonModule,
    DecimalPipe,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './orders.html',
  styleUrl: './orders.scss'
})
export class Orders implements OnInit {

  orders: Order[] = [];
  isLoading = true;

  constructor(
    private http: HttpClient,
    private authService: Auth,
    private router: Router
  ) {}

  ngOnInit(): void {
    const user = this.authService.getUser();
    if (user) {
      this.loadOrders(user.id);
    }
  }

  loadOrders(userId: number): void {
    this.http.get<Order[]>(`http://localhost:8080/api/orders/user/${userId}`)
      .subscribe({
        next: (data: Order[]) => {
          this.orders = data;
          this.isLoading = false;
        },
        error: (err: any) => {
          console.error(err);
          this.isLoading = false;
        }
      });
  }

  cancelOrder(orderId: number): void {
    const user = this.authService.getUser();
    if (!user) return;

    if (confirm('Are you sure you want to cancel this order?')) {
      this.http.put<Order>(
        `http://localhost:8080/api/orders/${orderId}/cancel?userId=${user.id}`,
        {}
      ).subscribe({
        next: (updatedOrder: Order) => {
          const index = this.orders.findIndex(o => o.id === orderId);
          if (index !== -1) {
            this.orders[index] = updatedOrder;
          }
          alert('Order cancelled successfully!');
        },
        error: (err: any) => {
          console.error(err);
          alert('Failed to cancel order!');
        }
      });
    }
  }

  goToProducts(): void {
    this.router.navigate(['/products']);
  }

  onImageError(event: any): void {
    event.target.src = 'https://via.placeholder.com/60x60?text=No+Image';
  }
}