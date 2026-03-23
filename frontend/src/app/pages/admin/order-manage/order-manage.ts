import { Component, OnInit } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HttpClient } from '@angular/common/http';
import { Order } from '../../../models/order';

@Component({
  selector: 'app-order-manage',
  standalone: true,
  imports: [
    CommonModule,
    DecimalPipe,
    FormsModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './order-manage.html',
  styleUrl: './order-manage.scss'
})
export class OrderManage implements OnInit {

  orders: Order[] = [];
  isLoading = true;

  statusOptions = ['PLACED', 'SHIPPED', 'DELIVERED', 'CANCELLED'];

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.http.get<Order[]>('http://localhost:8080/api/orders')
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

  updateStatus(orderId: number, status: string): void {
    this.http.put<Order>(
      `http://localhost:8080/api/orders/${orderId}/status?status=${status}`,
      {}
    ).subscribe({
      next: (updatedOrder: Order) => {
        const index = this.orders.findIndex(o => o.id === orderId);
        if (index !== -1) {
          this.orders[index] = updatedOrder;
        }
      },
      error: (err: any) => {
        console.error(err);
        alert('Failed to update status!');
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/admin']);
  }
}