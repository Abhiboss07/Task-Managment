# TaskFlow - Premium Task Management System

A full-stack Task Management Web Application built with the **MERN** stack (MongoDB, Express, React-style Vanilla JS, Node.js).
This project features a premium, responsive UI with glassmorphism aesthetics and a clean REST API backend.

## 🚀 Tech Stack

- **Frontend**: HTML5, CSS3 (Vanilla), JavaScript (Vanilla, ES6+)
- **Backend**: Node.js, Express.js
- **Database**: MongoDB, Mongoose
- **Architecture**: MVC (Model-View-Controller)

## 📂 Project Structure

```
Task Management/
├── backend/            # Express Server & API
│   ├── config/         # Database configuration
│   ├── controllers/    # Route controllers (Logic)
│   ├── middleware/     # Error handling middleware
│   ├── models/         # Mongoose models
│   ├── routes/         # API routes
│   ├── server.js       # Entry point
│   └── .env            # Environment variables
├── frontend/           # Static Frontend Assets
│   ├── css/            # Stylesheets
│   ├── js/             # Application Logic
│   └── index.html      # Main HTML file
└── README.md           # Documentation
```

## 🛠️ Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (Running locally or MongoDB Atlas)

### Installation

1.  **Navigate to the backend directory:**
    ```bash
    cd backend
    ```

2.  **Install Dependencies:**
    ```bash
    npm install
    ```

3.  **Environment Setup:**
    - A `.env` file is already created in `backend/` with default configuration:
      ```env
      PORT=5000
      MONGO_URI=mongodb://localhost:27017/taskmanager
      ```
    - Modify `MONGO_URI` if you are using MongoDB Atlas.

### Running the Application

1.  **Start the Server:**
    ```bash
    npm start
    # OR for development (using nodemon if installed)
    npm run dev
    ```
    *The server will start on port 5000.*

2.  **Access the Application:**
    - Open your browser and navigate to: [http://localhost:5000](http://localhost:5000)
    - The backend accepts API requests at `http://localhost:5000/tasks`
    - The frontend is served statically by the backend server.

## 📡 API Endpoints

| Method | Endpoint      | Description           |
| :----- | :------------ | :-------------------- |
| GET    | `/tasks`      | Get all tasks         |
| POST   | `/tasks`      | Create a new task     |
| GET    | `/tasks/:id`  | Get a single task     |
| PUT    | `/tasks/:id`  | Update a task         |
| DELETE | `/tasks/:id`  | Delete a task         |

**Query Parameters:**
- `GET /tasks?status=Pending` (Filter by status)

## ✨ Features
- **CRUD Operations**: Complete management of tasks.
- **Responsive Design**: Works on Desktop and Mobile.
- **Glassmorphism UI**: Modern aesthetic.
- **Status Filtering**: Filter tasks by Pending, In Progress, Completed.
- **Error Handling**: Graceful error messages and toasts.

## 🔮 Future Improvements
- **Authentication**: User accounts with JWT.
- **Drag & Drop**: Kanban board style status changes.
- **Due Dates**: Add deadline and calendar integration.
