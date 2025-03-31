# Task Management API

This is a RESTful API for managing tasks, built using Node.js, Express, and MySQL. The API supports operations such as creating, retrieving, updating, and deleting tasks. It follows a clean architecture and includes input validation, error handling, and rate limiting.

---

## Features

- **CRUD Operations**: Create, Read, Update, and Delete tasks.
- **Task Data Structure**:
  - `task_id`: Auto-generated unique identifier.
  - `title`: String.
  - `description`: String.
  - `due_date`: Date/Time.
  - `status`: Enum (`pending`, `in-progress`, `completed`).
- **Validation**: Input validation using `Joi`.
- **Database**: MySQL for data persistence.
- **Rate Limiting**: Prevent abuse of API endpoints.
- **Clean Architecture**: Separation of concerns with controllers, services, repositories, and middlewares.

---

## Project Structure

```
task-management-api
├── src
│   ├── config
│   │   └── dbConfig.js          # MySQL database connection
│   ├── controllers
│   │   └── taskController.js    # Handles API requests
│   ├── middlewares
│   │   ├── errorMiddleware.js    # Handles validation errors
│   ├── models
│   │   └── taskModel.js         # Task schema 
│   ├── routes
│   │   └── taskRoutes.js        # API routes
│   └── index.js                   # Main application entry point
├── .env                         # Environment variables
├── package.json                 # Project dependencies
└── README.md                    # Project documentation
```


## API Documentation

You can find the complete API documentation on Postman at the following URL:

[Task Management API Documentation](https://documenter.getpostman.com/view/19622729/2sB2cPiQA9)

---

## Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/your-repo/task-management-api.git
cd task-management-api
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the root directory and add the following:
```env
DB_HOST=localhost
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_NAME=task_management
PORT=3000
```

### 4. Set Up the Database
1. Log in to your MySQL server:
   ```bash
   mysql -u your_mysql_username -p
   ```
2. Create the database:
   ```sql
   CREATE DATABASE task_management;
   ```
3. Use the database:
   ```sql
   USE task_management;
   ```
4. Create the `tasks` table:
   ```sql
   CREATE TABLE tasks (
       task_id INT AUTO_INCREMENT PRIMARY KEY,
       title VARCHAR(255) NOT NULL,
       description TEXT,
       due_date DATETIME,
       status ENUM('pending', 'in-progress', 'completed') DEFAULT 'pending'
   );
   ```
5. Import the Database
    Open your MySQL client or terminal.
    Log in to your MySQL server:
    Create the database:
    Import the task.sql file into the database:


### 5. Start the Server
```bash
npm run start
```

The server will start on the port specified in the `.env` file (default: `3000`).

---

## License
This project is licensed under the MIT License.
```

### Changes Made:
- Added the Postman documentation URL under the **API Documentation** section.
- Kept the rest of the README.md structure intact.

Let me know if you need further modifications!
