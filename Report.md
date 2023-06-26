# Report

## Date: 06/25/2023

### Summary:
- Completed login, signup, and logout pages
- Each user when logs in, will load all data from database to local indexedDB
- All data in local indexedDB will be removed when user logs in and replaced with data from database

### Next:
- When user logs out, save all data from local indexedDB to database
- Also remove all data from local indexedDB when user logs out
- Handle offline mode
- Allow user to choose between online and offline mode
  - Online mode: data will be saved to database on every user's action
  - Offline mode: 
    - data will be saved to local indexedDB on every user's action.
    - data will be saved to database when user wants to switch to online mode

## Date: 06/22/2023

### Summary:
- Completed login, signup, and logout pages
- updated dashboard by removing ItemCount store from indexedDB which could be calculated from orders and thus minized the collection in mongoDB
- Fixed customer's orderCount and totalSpent get reseted when a new order is added

### Next:
- When user logs in, load all data from database to local indexedDB
- When user logs out, save all data from local indexedDB to database
- Handle offline mode