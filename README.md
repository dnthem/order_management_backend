# Order-management-system

## Description

This is a simple order management system. It allows you to perform create, edit, delete and view operations on orders, products, and customer informations.
It also allows you to view the order history of a day.

## Installation

1. Clone the repository
2. Run `npm install` to install the dependencies
3. CD into the directory `backend` and run `npm install` to install the dependencies
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
