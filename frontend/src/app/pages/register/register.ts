import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class Register {

  private http = inject(HttpClient);
  private router = inject(Router);

  username = '';
  password = '';
  confirmPassword = '';
  isLoading = false;
  errorMessage = '';
  showPassword = false;

  register(): void {
    if (!this.username || !this.password || !this.confirmPassword) {
      this.errorMessage = 'Please fill all fields!';
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match!';
      return;
    }

    if (this.password.length < 4) {
      this.errorMessage = 'Password must be at least 4 characters!';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this.http.post<any>('http://localhost:8080/api/auth/register', {
      username: this.username,
      password: this.password
    }).subscribe({
      next: (user: any) => {
        this.isLoading = false;
        alert('Registration successful! Please login.');
        this.router.navigate(['/login']);
      },
      error: (err: any) => {
        this.isLoading = false;
        this.errorMessage = err.error?.message || 'Registration failed!';
      }
    });
  }
}