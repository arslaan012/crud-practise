# CRUD File-Based API

This project is a simple Node.js Express server that performs CRUD (Create, Read, Update, Delete) operations on a JSON file (`text.json`). Every change made through the API directly updates the file.

## 🚀 Features
- File-based storage using `fs` module
- CRUD operations through REST API endpoints
- Swagger documentation for easy testing
- JSON-based data format
- Simple and easy to extend

---

## 📦 Tech Stack
| Technology | Purpose |
|-----------|--------|
| Node.js | Runtime environment |
| Express.js | Backend framework |
| FS (File System) | File read/write operations |
| Swagger UI | API documentation |

---

## 📂 Project Structure
```
├── api
│   ├── readFile.js
│   ├── createFile.js
│   ├── updateFile.js
│   └── deleteFile.js
├── text.json
└── server.js
```

---

## 🔧 Installation
### 1️⃣ Clone the repository
```bash
git clone <repo-url>
cd project-folder
```
### 2️⃣ Install dependencies
```bash
npm install
```

---

## ▶️ Run the Server
```bash
node server.js
```
Server will start at:
```
http://localhost:3000
```
Swagger Docs:
```
http://localhost:3000/api-docs
```

---

## 📘 API Endpoints

### **1. Read Data**
**GET** `/read?obj=<key>`

Example:
```
/read?obj=user1
```
Response:
```json
{
  "message": "File read",
  "data": {
    "name": "John",
    "age": 22
  }
}
```

---
### **2. Create Data**
**POST** `/create`

Body:
```json
{
  "obj": "user1",
  "name": "John",
  "age": "22"
}
```
Response:
```json
{
  "message": "Object created"
}
```

---
### **3. Update Data**
**PUT** `/update`

Body:
```json
{
  "obj": "user1",
  "name": "John Doe",
  "age": "23"
}
```
Response:
```json
{
  "message": "File updated"
}
```

---
### **4. Delete Data**
**DELETE** `/delete?obj=<key>`

Example:
```
/delete?obj=user1
```
Response:
```json
{
  "message": "Object deleted"
}
```

---

## 📝 Notes
- All operations directly modify `text.json`
- API validates required fields
- If object key exists, create will return error

---

## 📖 Swagger Usage
Visit:
```
http://localhost:3000/api-docs
```
Use UI to test requests easily.

---

## 🔐 Error Handling
| Case | Status | Message |
|------|--------|--------|
| Missing field | 400 | "Some data is not found" |
| Object doesn't exist | 404 | "Object not found" |
| Duplicate object | 400 | "Object already exists" |

---

## ✅ Future Enhancements
- Add validation schema
- Support nested objects
- File backup system
- Switch to database (MongoDB / SQLite)

---