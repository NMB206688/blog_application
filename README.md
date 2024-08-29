# Blog Application

A simple blog application built with Node.js, Express, MongoDB, and EJS. This application allows users to register, log in, and perform CRUD (Create, Read, Update, Delete) operations on blog posts.

## Features

- User Registration and Login
- Create, Read, Update, and Delete Blog Posts
- View a List of Registered Users
- Responsive Design with Bootstrap

## Technologies Used

- Node.js
- Express.js
- MongoDB with Mongoose
- EJS (Embedded JavaScript) for Templating
- Bootstrap for Styling

## Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/yourusername/blog-application.git
    cd blog-application
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Create a `.env` file:**

   In the root directory of the project, create a `.env` file and add the following environment variables:

    ```env
    PORT=3000
    MONGODB_URI=mongodb://localhost:27017/blogDB
    SESSION_SECRET=your_secret_key
    ```

    Replace `your_secret_key` with a secure string.

4. **Compile SASS to CSS (if using SASS):**

    If you have any SASS files, compile them to CSS using the following command:

    ```bash
    npx sass public/css/style.scss public/css/style.css
    ```

## Running the Application

1. **Start the MongoDB server:**

    Make sure your MongoDB server is running. If you are using
