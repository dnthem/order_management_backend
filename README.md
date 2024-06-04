# Backend Logistics

This is the backend for Order Management System [here](https://github.com/dnthem/order-management)

## Table of Contents

- [Backend Logistics](#backend-logistics)
  - [Table of Contents](#table-of-contents)
  - [Getting Started](#getting-started)
  - [Routes Description](#routes-description)
- [1. Order Controller:](#1-order-controller)
  - [Routes:](#routes)
      - [Create an Order](#create-an-order)
    - [Update an Order](#update-an-order)
    - [Complete an Order](#complete-an-order)
    - [Delete an Order](#delete-an-order)
    - [Get All Orders](#get-all-orders)
    - [Get a Single Order](#get-a-single-order)
    - [Get Cart Items of an Order](#get-cart-items-of-an-order)
    - [Get a Specific Item in Cart](#get-a-specific-item-in-cart)
- [CustomerController API](#customercontroller-api)
  - [Routes](#routes-1)
    - [Create a Customer](#create-a-customer)
    - [Update a Customer](#update-a-customer)
    - [Delete a Customer](#delete-a-customer)
    - [Get All Customers](#get-all-customers)
    - [Get a Single Customer](#get-a-single-customer)
- [IncomeController API](#incomecontroller-api)
  - [Routes](#routes-2)
    - [Get a Specific Income](#get-a-specific-income)
    - [Get All Incomes](#get-all-incomes)
    - [Get Up-to-Date Income](#get-up-to-date-income)
- [MenuController API](#menucontroller-api)
  - [Routes](#routes-3)
    - [Create a Menu Item](#create-a-menu-item)
    - [Update a Menu Item](#update-a-menu-item)
    - [Delete a Menu Item](#delete-a-menu-item)
    - [Get All Menu Items](#get-all-menu-items)
    - [Get a Single Menu Item](#get-a-single-menu-item)
- [UserController API](#usercontroller-api)
  - [Routes](#routes-4)
    - [Preflight Request](#preflight-request)
    - [Login a User](#login-a-user)
    - [Create a User (Signup)](#create-a-user-signup)
    - [Update a User](#update-a-user)
    - [Delete a User](#delete-a-user)
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

# 1. Order Controller:
## Routes:
#### Create an Order

- **Method:** POST
- **URL:** `/api/orders`
- **Parameters:**
  - `cart`: Array of items in the cart
  - `customerId`: Customer ID (must be a valid Mongo ID)
  - `promotion`: Promotion amount
  - `deliverDate`: Delivery date
- **Returns:** An object representing the created order with populated item and customer details.

### Update an Order

- **Method:** PATCH
- **URL:** `/api/orders/:id`
- **Parameters:**
  - `id`: Order ID
- **Returns:** An object representing the updated order with recalculated total price.

### Complete an Order

- **Method:** POST
- **URL:** `/api/orders/:id/complete`
- **Parameters:**
  - `id`: Order ID
- **Returns:** A message indicating that the order has been completed, updates customer order count, total spent, and updates other related entities.

### Delete an Order

- **Method:** DELETE
- **URL:** `/api/orders/:id`
- **Parameters:**
  - `id`: Order ID
- **Returns:** A message indicating that the order has been deleted.

### Get All Orders

- **Method:** GET
- **URL:** `/api/orders`
- **Query Parameters:**
  - `status`: Boolean - `true` for completed orders, `false` for not completed.
  - `nopopulate`: Boolean - `true` to not populate cart and customer details, `false` to populate.
  - `orderDate`: String in format `YYYY-MM-DD` - Specific date to filter orders.
- **Returns:** An array of orders matching the query.

### Get a Single Order

- **Method:** GET
- **URL:** `/orders/:id`
- **Parameters:**
  - `id`: Order ID
- **Returns:** An object representing the specified order.

### Get Cart Items of an Order

- **Method:** GET
- **URL:** `/orders/:id/cart-items`
- **Parameters:**
  - `id`: Order ID
- **Returns:** An array of cart items from the specified order.

### Get a Specific Item in Cart

- **Method:** GET
- **URL:** `/orders/:id/cart-items/:itemId`
- **Parameters:**
  - `id`: Order ID
  - `itemId`: Item ID in the cart
- **Returns:** The specific cart item if found, or a 404 error message if not found.

---
# CustomerController API

## Routes

### Create a Customer

- **Method:** POST
- **URL:** `/customers`
- **Parameters:**
  - `customerName`: Customer name (must be at least 1 character long)
  - `phone`: Customer phone number (must be a valid phone number)
- **Returns:** An object representing the newly created customer.

### Update a Customer

- **Method:** PATCH
- **URL:** `/customers/:id`
- **URL Parameters:**
  - `id`: Customer ID
- **Body Parameters:**
  - `customerName`: Customer name (must be at least 1 character long)
  - `phone`: Customer phone number (must be a valid US phone number)
- **Returns:** An object representing the updated customer.

### Delete a Customer

- **Method:** DELETE
- **URL:** `/customers/:id`
- **URL Parameters:**
  - `id`: Customer ID
- **Returns:** No content, status 204 on successful deletion.

### Get All Customers

- **Method:** GET
- **URL:** `/customers`
- **Returns:** An array of all customer objects.

### Get a Single Customer

- **Method:** GET
- **URL:** `/customers/:id`
- **URL Parameters:**
  - `id`: Customer ID
- **Returns:** An object representing the specified customer.

---

# IncomeController API

## Routes

### Get a Specific Income

- **Method:** GET
- **URL:** `/incomes/:id`
- **URL Parameters:**
  - `id`: Income ID
- **Returns:** An object representing the specified income.

### Get All Incomes

- **Method:** GET
- **URL:** `/incomes`
- **Query Parameters:**
  - `limit`: Number to limit the number of incomes returned (optional)
- **Returns:** An array of income objects, optionally limited by number.

### Get Up-to-Date Income

- **Method:** GET
- **URL:** `/incomes/up-to-date`
- **Returns:** An object representing the up-to-date total income.

---

# MenuController API

## Routes

### Create a Menu Item

- **Method:** POST
- **URL:** `/menu`
- **Body Parameters:**
  - `title`: Menu item title (must be at least 1 character long)
  - `price`: Menu item price (must be a numeric value)
- **Returns:** An object representing the newly created menu item.

### Update a Menu Item

- **Method:** PATCH
- **URL:** `/menu/:id`
- **URL Parameters:**
  - `id`: Menu item ID
- **Body Parameters:**
  - `title`: Menu item title (must be at least 1 character long)
  - `price`: Menu item price (must be a numeric value)
- **Returns:** An object representing the updated menu item.

### Delete a Menu Item

- **Method:** DELETE
- **URL:** `/menu/:id`
- **URL Parameters:**
  - `id`: Menu item ID
- **Returns:** No content, status 204 on successful deletion.

### Get All Menu Items

- **Method:** GET
- **URL:** `/menu`
- **Returns:** An array of all menu items.

### Get a Single Menu Item

- **Method:** GET
- **URL:** `/menu/:id`
- **URL Parameters:**
  - `id`: Menu item ID
- **Returns:** An object representing the specified menu item.

---

# UserController API

## Routes

### Preflight Request

- **Method:** GET
- **URL:** `/users/preflight`
- **Description:** Used to check if the user is authenticated.
- **Returns:** Status 200 if authenticated.

### Login a User

- **Method:** POST
- **URL:** `/users/login`
- **Body Parameters:**
  - `username`: Username (must be at least 5 characters long)
  - `password`: Password (must be at least 5 characters long)
- **Returns:** An object containing an access token and user details upon successful authentication.
  ```javascript
  {
    accessToken: "token",
    user: {
      _id: "id",
      username: "username",
      email: "email",
      name: "name"
    }
  }
```
  

### Create a User (Signup)

- **Method:** POST
- **URL:** `/users/signup`
- **Body Parameters:**
  - `username`: Username (must be at least 5 characters long)
  - `password`: Password (must be at least 5 characters long)
  - `email`: Email (must be a valid email address)
  - `name`: Name (must be at least 5 characters long)
- **Returns:** An object containing an access token and the newly created user's details.

### Update a User

- **Method:** PATCH
- **URL:** `/users/:id`
- **URL Parameters:**
  - `id`: User ID
- **Body Parameters:**
  - `name`: User name (must be at least 5 characters long)
- **Returns:** An object representing the updated user details.

### Delete a User

- **Method:** DELETE
- **URL:** `/users/:id`
- **URL Parameters:**
  - `id`: User ID
- **Description:** Deletes the user along with associated documents (incomes, income up-to-date documents, orders, customers, menu items).
- **Returns:** Status 200 and a message indicating successful deletion.

---

## Error Handling

In cases where the client's request does not fit into the above categories, the API responds with a JSON object containing only one property named "error" and an appropriate error message or a list of errors.

Example error response:
```
{
  "error": "error message"
}

{
  "errors": [
  {
    "msg": "error message 1"
  },
  {
    "msg": "error message 2"
  }]
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