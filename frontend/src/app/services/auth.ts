import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class Auth {

  private apiUrl = 'http://localhost:8080/api/auth';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/login`, { username, password });
  }

  saveUser(user: User): void {
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  getUser(): User | null {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  }

  isLoggedIn(): boolean {
    return this.getUser() !== null;
  }

  isAdmin(): boolean {
    return this.getUser()?.role === 'ADMIN';
  }

  isStaff(): boolean {
    return this.getUser()?.role === 'STAFF';
  }

  isAdminOrStaff(): boolean {
    return this.isAdmin() || this.isStaff();
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('wishlist');

  }
}