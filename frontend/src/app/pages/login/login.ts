import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {

  private authService = inject(Auth);
  private router = inject(Router);

  username = '';
  password = '';
  isLoading = false;
  errorMessage = '';
  showPassword = false;
  selectedRole = 'CUSTOMER';

  login(): void {
    if (!this.username || !this.password) {
      this.errorMessage = 'Please enter username and password!';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this.authService.login(this.username, this.password).subscribe({
      next: (user: any) => {
        // Check if role matches selected role
        if (user.role !== this.selectedRole) {
          this.isLoading = false;
          this.errorMessage = `Invalid credentials for ${this.selectedRole} login!`;
          return;
        }

        this.authService.saveUser(user);
        this.isLoading = false;

        // Redirect based on role
        if (user.role === 'ADMIN' || user.role === 'STAFF') {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/']);
        }
      },
      error: (err: any) => {
        this.isLoading = false;
        this.errorMessage = 'Invalid username or password!';
      }
    });
  }
}