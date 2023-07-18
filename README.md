<<<<<<< HEAD
# Backend logistic: 

1. When the client makes a request to a specific route that represents a store or collection, the API returns all the data associated with that store or collection in an array format.
   [ __data here__ ]

2. If the client specifies both a store/collection and an ID in their request, the API retrieves and returns a single JSON object representing the document that matches the specified ID.

3. In any other case, where the client's request does not fall into the above categories, the API responds with a JSON object containing only one property named "error".
   { error: error message here }

# The backend logistics for the two routes, 

## Authentication Route:
  The authentication route handles user signup and login procedures.
  
  The API uses JWT for authentication. Upon signup/login, a token is generated and stored by the client. The token is included in subsequent requests for authentication. This ensures secure access to the backend without relying on sessions or exposing sensitive data.

## Index Route:

The index route is the main route responsible for managing all the stores/collections.

GET: /:store - Retrieves all the data from the specified store, and the data is returned in an array format.

GET: /:store/:id - Retrieves a single document from the specified store based on the provided ID, and the data is returned in JSON format.

POST: /:store - Creates a new document in the specified store.

PUT: /:store/:id - Updates the entire document identified by the provided ID in the specified store.

DELETE: /:store/:id - Deletes a single document from the specified store based on the provided ID.


=======
# Order-management-system

## Current status
- Main: Contains the latest stable release
- Development: Contains the latest development changes
- Backend: Contains the backend code and APIs which have been integrated with the frontend

Preview Development: https://order-management-app.netlify.app/
## Description

This is a simple order management system. It allows you to perform create, edit, delete and view operations on orders, products, and customer informations.
It also allows you to view the order history of a day.

## Installation

1. Clone the repository
2. Run `npm install` to install the dependencies
3. CD into the directory `backend` and run `npm install` to install the dependencies (for the backend Branch)
4. Make sure you have MongoDB installed and running. In the `backend` directory, run `npm run dev` to start the server (port 3000). 
5. cd back to the root directory and run `npm run build` to build the app
6. Run `npm run preview` to start the app 
7. Some environment variables might need to be set up

## Usage

1. To create a new item or product, click on the `Add` button on the top right corner of the **menu page**. Then, click `edit` to edit the item or product. Click `remove` to delete the item or product.
2. You can even hide the item or product by clicking on the `hide` button. This will hide the item or product from the order page.
3. To create a new order, click on the `Add` button on the top right corner of the **Order page**. Then, a customer infomation form will pop up. Fill in the form and click 'submit' to continue to order section. Here, you can add item to card, edit item quantity, remove item from card, and submit the order.
4. In the main **Order page**, you can view the current acctive orders. You can choose to edit, complete, or delete the order. You can also view the completed orders and the total sales of the day.
5. In **Order history page**, you can view the order history of a day. You can also view the total sales of the day.
6. In **Customer page**, you can view the customer information. You can also edit or delete the customer information.
7. In **Settings page**, you can delete, download, or upload the database
8. In **Dashboard page**, you can view the total sales of the day, the total number of orders, the total number of customers, number of items sold, revenue chart, and the top items sold.
>>>>>>> ff1263606f1a3698a4cc423cf587a879545cbf4e
