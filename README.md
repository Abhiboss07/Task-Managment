# Task Management System

A production-quality Task Management Web Application demonstrating full-stack development skills with clean architecture and industry best practices.

## 🚀 Tech Stack

- **Frontend**: HTML5, CSS3 (Vanilla), JavaScript (ES6+)
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Architecture**: REST API → MVC Pattern
- **Styling**: Modern CSS with glassmorphism effects
- **Validation**: Express-validator for input validation

## 📂 Project Structure

```
Task Management/
├── backend/                    # Express Server & API
│   ├── src/
│   │   ├── config/           # Database configuration
│   │   ├── controllers/      # Route controllers (Business Logic)
│   │   ├── middleware/       # Validation & error handling
│   │   ├── models/           # Mongoose schemas
│   │   ├── routes/           # API route definitions
│   │   ├── utils/            # Utility functions
│   │   └── server.js         # Application entry point
│   ├── tests/                # Unit tests
│   ├── package.json          # Dependencies & scripts
│   └── .env.example          # Environment template
├── frontend/                 # Static Frontend Assets
│   ├── css/
│   │   └── style.css         # Application styles
│   ├── js/
│   │   └── app.js            # Frontend application logic
│   ├── assets/               # Static assets
│   └── index.html            # Main HTML file
└── README.md                 # Project documentation
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
    - Copy the environment template:
      ```bash
      cp .env.example .env
      ```
    - Configure your `.env` file:
      ```env
      PORT=5000
      MONGODB_URI=mongodb://localhost:27017/task-management
      NODE_ENV=development
      ```
    - Modify `MONGODB_URI` if you are using MongoDB Atlas.

### Running the Application

1.  **Start the Server:**
    ```bash
    npm start
    # OR for development (using nodemon if installed)
    npm run dev
    ```
    *The server will start on port 5000.*

2.  **Access the Application:**
    - Open the frontend directly: `frontend/index.html`
    - API endpoints are available at: `http://localhost:5000/api/tasks`
    - Health check endpoint: `http://localhost:5000/api/health`

## 📡 API Endpoints

| Method | Endpoint           | Description                    |
| :----- | :----------------- | :----------------------------- |
| GET    | `/api/tasks`       | Get all tasks                  |
| POST   | `/api/tasks`       | Create a new task              |
| GET    | `/api/tasks/:id`   | Get a single task              |
| PUT    | `/api/tasks/:id`   | Update a task                  |
| DELETE | `/api/tasks/:id`   | Delete a task                  |
| GET    | `/api/health`      | Health check endpoint          |

**Query Parameters:**
- `GET /api/tasks?status=Pending` (Filter by status: Pending, In Progress, Completed)

**Request/Response Format:**
```json
// POST /api/tasks
{
  "title": "Complete project",
  "description": "Finish the task management app",
  "status": "In Progress"
}

// Response
{
  "success": true,
  "data": {
    "_id": "64f1a2b3c4d5e6f7g8h9i0j1",
    "title": "Complete project",
    "description": "Finish the task management app",
    "status": "In Progress",
    "createdAt": "2023-09-01T12:00:00.000Z",
    "updatedAt": "2023-09-01T12:00:00.000Z"
  }
}
```

## ✨ Features

### Core Functionality
- **Full CRUD Operations**: Create, Read, Update, and Delete tasks
- **Task Fields**: Title (required), Description (optional), Status (Pending/In Progress/Completed)
- **Status Filtering**: Filter tasks by their current status
- **Real-time Updates**: Immediate UI updates after CRUD operations

### Technical Features
- **Responsive Design**: Optimized for desktop and mobile devices
- **Modern UI**: Glassmorphism effects with smooth animations
- **Input Validation**: Both frontend and backend validation
- **Error Handling**: Comprehensive error handling with user-friendly messages
- **Loading States**: Visual feedback during API operations
- **Toast Notifications**: Non-intrusive success/error messages

### Code Quality
- **Clean Architecture**: MVC pattern with separation of concerns
- **RESTful API**: Proper HTTP methods and status codes
- **Environment Configuration**: Environment-based settings
- **Security**: Helmet.js for security headers, CORS enabled
- **Logging**: Morgan for request logging

## 🔮 Future Improvements

### Authentication & Authorization
- JWT-based user authentication
- User-specific task management
- Role-based permissions

### Enhanced Features
- Drag & Drop Kanban board
- Task due dates and reminders
- Task categories and tags
- Search functionality
- Bulk operations (select multiple tasks)

### Performance & Scalability
- Database indexing optimization
- API rate limiting
- Caching implementation
- Pagination for large datasets

### Testing & Deployment
- Comprehensive unit and integration tests
- API documentation with Swagger/OpenAPI
- Docker containerization
- CI/CD pipeline setup
- Production deployment configuration
