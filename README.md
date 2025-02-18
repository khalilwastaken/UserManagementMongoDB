## MongoDB User Management Project

# Overview

The MongoDB User Management Project is a web application designed to efficiently manage users. It allows administrators to add, view, update, and delete users. The user's data is stored in a MongoDB database, enabling centralized access and management.
Features
1. User Management

    Add a user: Allows administrators to add new users by providing details such as the username and other relevant information.
    Update a user: Administrators can modify existing user details, such as the username or email.
    Delete a user: Administrators can remove users who are no longer needed.

2. Search and Filtering

    Implemented a search and filtering functionality to help administrators quickly find users based on keywords or other relevant criteria.

3. User Profiles

    Each user has their own profile page where they can view personal information and manage account settings.

# Technologies Used
Frontend

    HTML: Used to structure the content of web pages.
    CSS: Used to style the HTML content.
    JavaScript: Used for dynamic content manipulation.
    EJS (Embedded JavaScript): A templating engine that allows generating HTML dynamically using JavaScript.

Backend

    Node.js: JavaScript runtime for executing server-side code.
    Express.js: A minimal web framework for Node.js to handle routes and middleware.
    MongoDB: A NoSQL database used for storing user information.
    Mongoose: ODM (Object Data Modeling) library for MongoDB, simplifying database interactions.
    dotenv: A module for loading environment variables from a .env file.
    express-session: Middleware to handle sessions in Express.js.

# Utilities

    Path: A built-in Node.js module for working with file and directory paths.
    express.static: Middleware in Express.js for serving static files such as images, CSS, and JavaScript files.
