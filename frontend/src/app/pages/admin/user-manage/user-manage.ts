import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-manage',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './user-manage.html',
  styleUrl: './user-manage.scss'
})
export class UserManage implements OnInit {

  users: any[] = [];
  filteredUsers: any[] = [];
  isLoading = true;
  selectedRole = 'ALL';

  roles = ['ALL', 'ADMIN', 'STAFF', 'CUSTOMER'];

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.http.get<any[]>('http://localhost:8080/api/auth/users')
      .subscribe({
        next: (data: any[]) => {
          this.users = data;
          this.filteredUsers = data;
          this.isLoading = false;
        },
        error: (err: any) => {
          console.error(err);
          this.isLoading = false;
        }
      });
  }

  filterByRole(role: string): void {
    this.selectedRole = role;
    if (role === 'ALL') {
      this.filteredUsers = this.users;
    } else {
      this.filteredUsers = this.users.filter(u => u.role === role);
    }
  }

  getRoleBadgeClass(role: string): string {
    switch(role) {
      case 'ADMIN': return 'badge-admin';
      case 'STAFF': return 'badge-staff';
      case 'CUSTOMER': return 'badge-customer';
      default: return '';
    }
  }

  getRoleIcon(role: string): string {
    switch(role) {
      case 'ADMIN': return '👑';
      case 'STAFF': return '🧑‍💼';
      case 'CUSTOMER': return '👤';
      default: return '';
    }
  }

  goBack(): void {
    this.router.navigate(['/admin']);
  }
}