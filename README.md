# Backend Logistics

This is the backend for Order Management System [here](https://github.com/dnthem/order-management)

## Table of Contents

- [Backend Logistics](#backend-logistics)
  - [Table of Contents](#table-of-contents)
  - [Getting Started](#getting-started)
  - [Routes Description](#routes-description)
    - [Routes:](#routes)
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

- `/users`
  - `POST /users/login` - Login user
  - `POST /users/logout` - Logout user

- `/orders`
  - `GET /orders` - Get all orders
  - `GET /orders/:id` - Get order by id
  - `POST /orders` - Create a new order
  - `PATCH /orders/:id` - Update order by id
  - `DELETE /orders/:id` - Delete order by id
  - `POST /orders/:id/complete` - Complete order by id

- `/menu`
  - `GET /menu` - Get all menu items
  - `GET /menu/:id` - Get menu item by id
  - `POST /menu` - Create a new menu item
  - `PATCH /menu/:id` - Update menu item by id
  - `DELETE /menu/:id` - Delete menu item by id

- `/customers`
  - `GET /customers` - Get all customers
  - `GET /customers/:id` - Get customer by id
  - `POST /customers` - Create a new customer
  - `PATCH /customers/:id` - Update customer by id
  - `DELETE /customers/:id` - Delete customer by id

- `/incomes`
  - `GET /incomes` - Get all incomes
  - `GET /incomes/:id` - Get income by id


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