# 🛒 Smartcart - How to Run

Simple step-by-step guide to run the Smartcart project on your local machine.

---

## ✅ Prerequisites — Install these first

| Tool | Download Link |
|---|---|
| Java 21 | https://www.oracle.com/java/technologies/downloads/ |
| Node.js | https://nodejs.org/ |
| Angular CLI | Run: `npm install -g @angular/cli` |
| MySQL | https://dev.mysql.com/downloads/ |
| Eclipse IDE | https://www.eclipse.org/downloads/ |
| VS Code | https://code.visualstudio.com/ |

---

## 🗄️ Step 1 — Setup Database

1. Open **MySQL Workbench**
2. Create a new database:
```sql
CREATE DATABASE smartcart;
```
> ✅ No need to create tables — Spring Boot creates them automatically!

---

## 🔧 Step 2 — Run Backend (Spring Boot)

1. Open **Eclipse IDE**
2. Click **File** → **Import** → **Existing Maven Project**
3. Browse to `Smartcart/backend` folder
4. Click **Finish**
5. Open this file:
```
src/main/resources/application.properties
```
6. Update these lines with your MySQL details:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/smartcart
spring.datasource.username=root
spring.datasource.password=your_mysql_password
```
7. Right click project → **Run As** → **Spring Boot App**
8. Wait for console to show:
```
Started SmartcartApplication on port 8080
```
> ✅ Backend is running on http://localhost:8080

---

## 🎨 Step 3 — Run Frontend (Angular)

1. Open **VS Code**
2. Open folder `Smartcart/frontend`
3. Open terminal using `Ctrl + `` ` ``
4. Install dependencies:
```bash
npm install
```
5. Start the app:
```bash
ng serve
```
6. Open browser and go to:
```
http://localhost:4200
```
> ✅ Website is running on http://localhost:4200

---

## 👤 Step 4 — Create Admin User

Since database is empty, manually insert admin user in MySQL Workbench:

```sql
USE smartcart;
INSERT INTO users (username, password, role) 
VALUES ('admin', 'admin123', 'ADMIN');
```

Then login at `http://localhost:4200/login` with:

| Field | Value |
|---|---|
| Role Tab | Admin |
| Username | admin |
| Password | admin123 |

---

## 🛒 Step 5 — Add Products

1. Login as **Admin**
2. Go to **Admin Dashboard**
3. Click **Add New Product**
4. Fill in product details:
   - Name
   - Price
   - Quantity
   - Image path (e.g. `assets/images/mobile.jpg`)
   - Description
5. Click **Add Product** ✅

---

## 📱 Step 6 — Add Product Images

1. Go to `frontend/src/assets/images/`
2. Add your product images with exact filenames
3. Use the same filename when adding products

---

## 👥 Step 7 — Register as Customer

1. Go to `http://localhost:4200/register`
2. Enter username and password
3. Click **Register**
4. Login with Customer role tab

---

## 🔑 Login Credentials

| Role | How to get |
|---|---|
| Admin | Insert manually in MySQL (Step 4) |
| Staff | Insert manually in MySQL |
| Customer | Register from website |

### To create Staff user in MySQL:
```sql
INSERT INTO users (username, password, role) 
VALUES ('staff1', 'staff123', 'STAFF');
```

---

## ⚠️ Common Issues

| Issue | Solution |
|---|---|
| Backend not starting | Check MySQL is running and credentials are correct |
| Frontend not loading | Run `npm install` first |
| Images not showing | Add images to `frontend/src/assets/images/` folder |
| CORS error | Make sure backend is running on port 8080 |
| Port 4200 in use | Run `ng serve --port 4201` |

---

## 📞 Need Help?

Raise an issue on GitHub:
```
https://github.com/KrishnaMoorthi-LTM/Smartcart/issues
```
