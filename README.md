# 📝 Task Manager API

A simple Task Manager built using **Node.js**, **Express**, **MongoDB**, and **JWT Authentication**, with input validation using **Joi** and a scheduled job for automatic overdue task detection.

---

## 🚀 Features

- User Authentication (Register/Login)
- Create, Read, Update, Delete (CRUD) Tasks
- Task filtering (by status, priority, due date)
- Pagination & Sorting
- Input validation using Joi
- Auto-mark overdue tasks using `node-cron`
- JWT-based route protection

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/task-manager-api.git
cd task-manager-api
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory with the following values:

```
PORT=3000
MONGO_URI=mongodb://localhost:27017/taskmanager
JWT_SECRET=your_jwt_secret_key
```

### 4. Start the Server

```bash
npm start
```

The server will run at `http://localhost:3000`.

---

## 🔐 API Authentication

All task-related routes are protected. You need to pass the JWT token in the header:

```
Authorization: Bearer <your_token>
```

---

## 📮 API Endpoints

### 👤 Auth Routes

| Method | Endpoint             | Description           |
|--------|----------------------|-----------------------|
| POST   | `/api/user/register` | Register a new user   |
| POST   | `/api/user/login`    | Login and get token   |

### 📋 Task Routes (Protected)

| Method | Endpoint                | Description                  |
|--------|-------------------------|------------------------------|
| POST   | `/api/tasks`            | Create a new task            |
| GET    | `/api/tasks`            | Get all tasks (with filters) |
| PUT    | `/api/tasks/:id`        | Update a task                |
| DELETE | `/api/tasks/:id`        | Delete a task                |
| GET    | `/api/tasks/analytics`  | Get task analytics           |

#### Query Parameters for `/api/tasks`

- `status=pending|completed|overdue`
- `priority=low|medium|high`
- `due_date=overdue|today|upcoming`
- `page=1` (default)
- `limit=10` (default)

---

## 📆 Scheduled Cron Job

- Runs every midnight using `node-cron`
- Automatically marks `pending` tasks with `due_date < now` as `overdue`

---

## ✅ Example Request (Postman)

### 1. Register

POST `http://localhost:3000/api/user/register`

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

### 2. Login

POST `http://localhost:3000/api/user/login`

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

### 3. Create Task (with token)

POST `http://localhost:3000/api/tasks`

```json
{
  "title": "Finish project",
  "description": "Complete backend module",
  "priority": "high",
  "due_date": "2025-04-12",
  "labels": ["work", "urgent"]
}
```

---

## 🛠 Tech Stack

- Node.js
- Express.js
- MongoDB & Mongoose
- Joi (validation)
- JWT (auth)
- Node-Cron

---

## 📬 Contact

For questions or suggestions, feel free to reach out!
