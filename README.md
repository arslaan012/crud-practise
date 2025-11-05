```md
# 🔐 File-Based CRUD API with JWT Authentication & Swagger

A Node.js + Express backend that performs **CRUD operations on a JSON file** and includes **JWT authentication**, **modular routes/controllers**, **middleware**, and **Swagger API documentation**.

This is a beginner-friendly backend starter demonstrating **auth + protected routes + file storage** before switching to a real DB.

---

## 🚀 Features
| Feature | Description |
|--------|------------|
✅ File-based CRUD (JSON storage)  
✅ JWT Authentication (Register & Login)  
✅ Protected Routes (middleware)  
✅ Swagger API Docs  
✅ MVC folder structure  
✅ Migration setup (for auth table)  

---

## 📦 Tech Stack
| Technology | Purpose |
|-----------|--------|
Node.js | Runtime  
Express.js | Server Framework  
FS Module | File database  
bcrypt | Hash passwords  
jsonwebtoken | Token auth  
Swagger UI | API docs  

---

## 📂 Project Structure

```
src/
 ├─ api/
 │   ├─ createFile.js
 │   ├─ readFile.js
 │   ├─ updateFile.js
 │   └─ deleteFile.js
 ├─ controllers/
 │   ├─ authController.js
 │   └─ crudController.js
 ├─ routes/
 │   ├─ authRoutes.js
 │   └─ crudRoutes.js
 ├─ middleware/
 │   └─ verify.js
 ├─ schema/
 │   └─ users.sql
 ├─ migrations/
 │   └─ migrate.js
 ├─ constants/
 │   └─ httpStatusCodes.json
 ├─ text.json
 └─ server.js
```

---

## 🛠 Installation

### 1️⃣ Clone repo
```bash
git clone <repo-url>
cd project-folder
```

### 2️⃣ Install packages
```bash
npm install
```

### 3️⃣ Create `.env`
```
JWT_SECRET=yourSecretKey
```

### 4️⃣ Run server
```bash
npm start
```

Server URL

```
http://localhost:3000
```

Swagger Docs

```
http://localhost:3000/api-docs
```

---

## 👤 Authentication Endpoints

### ✅ Register  
**POST** `/auth/register`

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "123456"
}
```

### ✅ Login  
**POST** `/auth/login`

```json
{
  "email": "john@example.com",
  "password": "123456"
}
```

**Response**

```json
{
  "token": "JWT_TOKEN_HERE"
}
```

---

## 🔑 Using the JWT Token

Copy token from login and paste in Swagger:

**Authorize → `Bearer <token>`**

Or send in header manually:

```
Authorization: Bearer <token>
```

---

## 📘 Protected CRUD Routes

| Method | Endpoint | Description |
|-------|----------|------------|
GET | `/users/read?obj=<key>` | Read entry  
POST | `/users/create` | Create entry  
PUT | `/users/update` | Update entry  
DELETE | `/users/delete?obj=<key>` | Delete entry  

### Example Body (Create)
```json
{
  "obj": "user1",
  "name": "Alice",
  "age": 22
}
```

---

## 🔧 Migration (All Tables)
To create DB all tables:

```bash
npm run migrate
```

---
