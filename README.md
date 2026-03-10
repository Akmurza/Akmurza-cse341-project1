# CSE 341 - Contacts API (Part 1)

Node.js + Express API for storing and retrieving contacts from MongoDB.

## Part 1 Scope

- Project setup with Express
- MongoDB connection
- `GET /contacts` (get all contacts)
- `GET /contacts/single?id=<id>` (get one contact by query parameter)
- Deployment-ready for Render

## Contact Fields

Each contact document should include:

- `firstName`
- `lastName`
- `email`
- `favoriteColor`
- `birthday`

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create `.env` from `.env.example` and set your MongoDB URI:

   ```env
   MONGODB_URI=your_mongodb_connection_string
   PORT=8080
   ```

3. Run the server:

   ```bash
   npm start
   ```

## Test Endpoints

Use the included `contacts.rest` file.

## Render Notes

In Render, add environment variable:

- `MONGODB_URI`

Then deploy and test the same endpoints using your Render URL.
