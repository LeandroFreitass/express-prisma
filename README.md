## My Authentication and User Management API

This is an API built using Express, Prisma, and JWT for user authentication and account management.

### Technologies Used
- Express.js
- Prisma
- JSON Web Tokens (JWT)

### Usage Instructions
1. Clone this repository.
2. Configure the environment variables.
3. Install the dependencies using npm install.
4. Start the server with npm start.

### Request Examples
#### User Registration, Login, and Logout
```http

 Register a User

POST /auth/register

{
  "name": "John Doe",
  "email": "johndoe@example.com",
  "password": "mypassword"
  "address": "John 131"
}

Test User Login
POST /auth/login

{
  "email": "johndoe@example.com",
  "password": "mypassword"
}

User Logout
POST /auth/logout
Content-Type: application/json


