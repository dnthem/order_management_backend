# Report

## Date: 06/22/2023

### Summary:
- Completed login, signup, and logout pages
- updated dashboard by removing ItemCount store from indexedDB which could be calculated from orders and thus minized the collection in mongoDB
- Fixed customer's orderCount and totalSpent get reseted when a new order is added

### Next:
- When user logs in, load all data from database to local indexedDB
- When user logs out, save all data from local indexedDB to database
- Handle offline mode