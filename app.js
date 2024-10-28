// Loading environment variables from a .env file
require('dotenv').config();

// Importing necessary modules
const express = require('express'); // Express framework for building the app
const mongoose = require('mongoose'); // Mongoose library for MongoDB interactions
const session = require('express-session'); // Session management middleware
const MongoStore = require('connect-mongo'); // MongoDB session storage for persistence
const path = require('path'); // Path module to handle directory paths

// Initializing the Express app
const app = express();

// Middleware setup
app.use(express.json()); // Parses incoming JSON requests
app.use(express.urlencoded({ extended: true })); // Parses URL-encoded form data
app.use(express.static(path.join(__dirname, 'public'))); // Serves static files from the 'public' folder

// Connecting to MongoDB using credentials from .env file
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true, // Enables new URL parser for MongoDB connection
  useUnifiedTopology: true, // Enables unified topology engine for MongoDB connection
});

// Session configuration with MongoDB storage
app.use(
  session({
    secret: process.env.SESSION_SECRET, // Secret key from .env for encrypting session data
    resave: false, // Prevents resaving session data on each request if unmodified
    saveUninitialized: false, // Saves session only if it’s modified
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }), // Storing sessions in MongoDB
  })
);

// Setting up the view engine to use EJS templates
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // Setting the 'views' directory for EJS templates

// Root route, renders the home page
app.get('/', (req, res) => {
  res.render('pages/home'); // Renders the 'home' page inside the 'pages' folder in views
});

// Defining additional routes
app.use('/', require('./routes/authRoutes')); // Routes for authentication (login, register, etc.)
app.use('/blogs', require('./routes/blogRoutes')); // Routes for blog-related actions

// Starting the server and listening on specified port
const PORT = process.env.PORT || 3000; // Port is set by environment variable or defaults to 3000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); // Logs the server status
