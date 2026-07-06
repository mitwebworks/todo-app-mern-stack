# PART 1: Backend APIs for To-do List app in Node.js, Express.js & MongoDB

    In this part of this project, I'll be building backend APIs for our To-do List app in Express.js & MongoDB.

## Commands

    mkdir backend
    cd backend
    npm init

    npm i express --> Install Express.Js
    npm i nodemon --> Install Nodemon
    npm i dotenv --> .env package
    npm i dotenv --> .env package
    npm i cors --> cors setup

    npm run dev --> Start the server

## APIs Endpoints

### GET /api/tasks

    Description: Get the list of all tasks in the system.
    Access: Public

### POST /api/tasks

    Description: To create a new task.
    Body: {
        "task": "string",
        "isCompleted": boolean
    }
    Access: Public

### PUT /api/tasks/:id

    Description: Update a task.
    Body: {
        "task": "string",
        "isCompleted": boolean
    }
    Access: Public

### PATCH /api/tasks/:id

    Description: Mark a task as complete or pending.
    Body: {
        "isCompleted": boolean
    }
    Access: Public

### DELETE /api/tasks/:id

    Description: Mark a task as complete or pending.
    Access: Public

# PART 2: Connect the backend with Frontend app

    I have a frontend app which i built in previous sessions, now I'm gonna connect it with my newly built backend using axios.

## Commands

    cd frontend
    npm install axios

    npm run dev --> Start the app

# How to Run

    Run the following commands in the terminal
    >> cd backend
    >> npm install
    >> npm run dev #Backend server started

    Run the following commands in another terminal
    >> cd frontend
    >> npm install
    >> npm run dev #Frontend server started

    Note: Make sure to setup .env variables

# Env variables

## Backend

    PORT=4001
    MONGO_URI=<db connection string>

## Frontend

    VITE_API_URL=http://localhost:4001/api
