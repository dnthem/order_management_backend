# Backend Logistics

This is the backend for Order Management System [here](https://github.com/dnthem/order-management)

## Table of Contents

- [Backend Logistics](#backend-logistics)
  - [Table of Contents](#table-of-contents)
  - [Getting Started](#getting-started)
  - [Routes Description](#routes-description)
    - [Routes:](#routes)
    - [Authentication Route](#authentication-route)
  - [Error Handling](#error-handling)
  - [License](#license)


## Getting Started
Before running the server, make sure you have the following installed: 

- [Node.js](https://nodejs.org/en/download/)
- [MongoDB](https://www.mongodb.com/try/download/community)

Instalation: 
- Clone the repo
- Run `npm install` to install all the dependencies
- Run `npm start` to start the server
- You can either use mongodb locally like mongodb community server or use a cloud service like [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- Set up the environment variables in `.env` file
  
  ```
   NODE_ENV='development'
   MONGODB_URI='mongodb://127.0.0.1:27017/ordersManagement'
   PORT=3000
   JWT_SECRET_TOKEN='secret'
   CORS_ORIGIN=http://localhost:51730
  ```

## Routes Description

### Routes:

### Authentication Route

The authentication route manages user signup and login procedures using JSON Web Tokens (JWT) for secure backend access. Upon signup or login, a token is generated and stored by the client, and subsequent requests include this token for authentication.


## Error Handling

In cases where the client's request does not fit into the above categories, the API responds with a JSON object containing only one property named "error" and an appropriate error message.

Example error response:
```
{
  "error": "error message"
}
```
Otherwise, the API responds with a message in JSON format.
```
{
  "message": "message"
}
```

## License

This project is licensed under the [MIT License](LICENSE).

For any questions or further information about the backend logistics or API, feel free to reach out via GitHub or email.

Happy coding! 🚀