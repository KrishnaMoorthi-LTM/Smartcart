import { Routes } from '@angular/router';
import { authGuard } from './guards/auth-guard';
import { adminGuard } from './guards/admin-guard';
import { superAdminGuard } from './guards/super-admin-guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home').then(m => m.Home)
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login').then(m => m.Login)
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/register/register').then(m => m.Register)
  },
  {
    path: 'products',
    loadComponent: () => import('./pages/product-list/product-list').then(m => m.ProductList)
  },
  {
    path: 'products/:id',
    loadComponent: () => import('./pages/product-detail/product-detail').then(m => m.ProductDetail)
  },
  {
    path: 'cart',
    loadComponent: () => import('./pages/cart/cart').then(m => m.Cart),
    canActivate: [authGuard]
  },
  {
  path: 'orders',
  loadComponent: () => import('./pages/orders/orders').then(m => m.Orders),
  canActivate: [authGuard]
},
{
  path: 'wishlist',
  loadComponent: () => import('./pages/wishlist/wishlist').then(m => m.Wishlist),
  canActivate: [authGuard]
},
  {
    path: 'checkout',
    loadComponent: () => import('./pages/checkout/checkout').then(m => m.Checkout),
    canActivate: [authGuard]
  },
  {
    path: 'admin',
    loadComponent: () => import('./pages/admin/dashboard/dashboard').then(m => m.Dashboard),
    canActivate: [adminGuard]
  },
  {
    path: 'admin/products',
    loadComponent: () => import('./pages/admin/product-manage/product-manage').then(m => m.ProductManage),
    canActivate: [adminGuard]
  },
  {
    path: 'admin/products/form',
    loadComponent: () => import('./pages/admin/product-form/product-form').then(m => m.ProductForm),
    canActivate: [adminGuard]
  },
  {
  path: 'admin/orders',
  loadComponent: () => import('./pages/admin/order-manage/order-manage').then(m => m.OrderManage),
  canActivate: [adminGuard]
},
{
  path: 'admin/users',
  loadComponent: () => import('./pages/admin/user-manage/user-manage').then(m => m.UserManage),
  canActivate: [superAdminGuard]
},
  {
    path: '**',
    redirectTo: ''
  }
];