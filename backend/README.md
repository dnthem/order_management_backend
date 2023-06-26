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


