# 🛒 Smartcart - Full Stack Ecommerce Website

A full-featured ecommerce web application built with **Spring Boot** (Backend) and **Angular 21** (Frontend), inspired by Flipkart.

---

## 🖥️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Angular 21 (Standalone) |
| Backend | Spring Boot 3 |
| Database | MySQL |
| ORM | Spring Data JPA |
| Styling | Angular Material + SCSS |
| Version Control | Git & GitHub |

---

## ✨ Features

### 👤 Customer
- Register & Login (Role based)
- Browse Products with Filter & Sort
- Search with Autocomplete
- Add to Cart & Wishlist
- Checkout & Place Orders
- View Order History
- Cancel Orders

### 👑 Admin
- Admin Dashboard (Total Products, Stock, Low Stock)
- Add / Edit / Delete Products
- View & Update Order Status
- Manage All Users (Admin, Staff, Customer)

### 🧑‍💼 Staff
- Add / Edit Products
- View & Update Order Status
- Cannot Delete Products or Manage Users

---

## 📁 Project Structure

```
Smartcart/
├── frontend/          # Angular 21 project
│   └── src/
│       ├── app/
│       │   ├── components/    # Navbar, Footer
│       │   ├── pages/         # All pages
│       │   ├── services/      # Auth, Product, Cart, Wishlist
│       │   ├── models/        # Interfaces
│       │   └── guards/        # Auth, Admin, SuperAdmin
│       └── assets/
│           └── images/        # Product images
│
└── backend/           # Spring Boot project
    └── src/main/java/com/smartcart/
        ├── controller/    # REST Controllers
        ├── service/       # Business Logic
        ├── repository/    # JPA Repositories
        ├── model/         # Entity Classes
        ├── dto/           # Data Transfer Objects
        └── exception/     # Custom Exceptions
```

---

## 🚀 How to Run

### Prerequisites
- Java 21
- Node.js 18+
- Angular CLI 21
- MySQL 8+
- Maven

---

### 🔧 Backend Setup

**1. Clone the repository:**
```bash
git clone https://github.com/KrishnaMoorthi-LTM/Smartcart.git
cd Smartcart/backend
```

**2. Configure Database:**

Open `src/main/resources/application.properties` and update:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/smartcart
spring.datasource.username=your_mysql_username
spring.datasource.password=your_mysql_password
spring.jpa.hibernate.ddl-auto=update
```

**3. Run the backend:**
```bash
./mvnw spring-boot:run
```

Backend runs on: `http://localhost:8080`

---

### 🎨 Frontend Setup

**1. Navigate to frontend:**
```bash
cd Smartcart/frontend
```

**2. Install dependencies:**
```bash
npm install
```

**3. Run the frontend:**
```bash
ng serve
```

Frontend runs on: `http://localhost:4200`

---

## 🔑 Default Login Credentials

| Role | Username | Password |
|---|---|---|
| Admin | admin | (your password) |
| Staff | staff1 | (your password) |
| Customer | Register new account | - |

---

## 📡 API Endpoints

### Auth
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/login` | Login |
| POST | `/api/auth/register` | Register |
| GET | `/api/auth/users` | Get all users (Admin) |

### Products
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/products` | Get all products |
| GET | `/api/products/{id}` | Get product by ID |
| POST | `/api/products` | Create product (Admin/Staff) |
| PUT | `/api/products/{id}` | Update product (Admin/Staff) |
| DELETE | `/api/products/{id}` | Delete product (Admin only) |

### Orders
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/orders` | Place order |
| GET | `/api/orders` | Get all orders (Admin) |
| GET | `/api/orders/user/{userId}` | Get user orders |
| PUT | `/api/orders/{id}/cancel` | Cancel order |
| PUT | `/api/orders/{id}/status` | Update order status (Admin) |

---

## 📸 Pages

| Page | Route | Access |
|---|---|---|
| Home | `/` | Everyone |
| Products | `/products` | Everyone |
| Product Detail | `/products/:id` | Everyone |
| Cart | `/cart` | Customer |
| Checkout | `/checkout` | Customer |
| Orders | `/orders` | Customer |
| Wishlist | `/wishlist` | Customer |
| Login | `/login` | Guest |
| Register | `/register` | Guest |
| Admin Dashboard | `/admin` | Admin/Staff |
| Manage Products | `/admin/products` | Admin/Staff |
| Manage Orders | `/admin/orders` | Admin/Staff |
| Manage Users | `/admin/users` | Admin only |

---

## 👨‍💻 Developer

**KrishnaMoorthi-LTM**
- GitHub: [KrishnaMoorthi-LTM](https://github.com/KrishnaMoorthi-LTM)

---

## 📄 License

This project is for educational purposes.
