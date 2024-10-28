// Importing necessary libraries and modules
const express = require('express'); // Express framework for routing
const bcrypt = require('bcryptjs'); // bcryptjs library for password hashing
const User = require('../models/User'); // User model for database interactions
const router = express.Router(); // Creating a new router instance

// Route to display the register page (GET request)
router.get('/register', (req, res) => {
  res.render('pages/register'); // Renders the 'register' view
});

// Route to handle user registration (POST request)
router.post('/register', async (req, res) => {
  const { username, password } = req.body; // Extracting username and password from the request body
  try {
    const user = new User({ username, password }); // Creating a new user with the provided data
    await user.save(); // Saving the user to the database
    res.redirect('/login'); // Redirecting to login page after successful registration
  } catch (err) {
    res.status(400).send('Error registering user'); // Sending error response if registration fails
  }
});

// Route to display the login page (GET request)
router.get('/login', (req, res) => {
  res.render('pages/login'); // Renders the 'login' view
});

// Route to handle user login (POST request)
router.post('/login', async (req, res) => {
  const { username, password } = req.body; // Extracting username and password from the request body
  try {
    const user = await User.findOne({ username }); // Finding a user by username in the database
    if (!user) return res.status(400).send('Invalid credentials'); // If user doesn't exist, send error response
    const isMatch = await bcrypt.compare(password, user.password); // Comparing entered password with hashed password
    if (!isMatch) return res.status(400).send('Invalid credentials'); // If passwords don't match, send error response
    req.session.user = user; // Storing user info in session upon successful login
    res.redirect('/welcome'); // Redirecting to welcome page after login
  } catch (err) {
    res.status(500).send('Server error'); // Sending error response if login fails
  }
});

// Route to display the welcome page (GET request)
router.get('/welcome', (req, res) => {
  if (!req.session.user) return res.redirect('/login'); // Redirect to login if user is not logged in
  res.render('pages/welcome', { username: req.session.user.username }); // Renders 'welcome' view with user's username
});

// Route to handle user logout (GET request)
router.get('/logout', (req, res) => {
  req.session.destroy(() => { // Destroys session data on logout
    res.redirect('/login'); // Redirects to login page after logout
  });
});

// Route to display a list of registered users (GET request)
router.get('/users', async (req, res) => {
  try {
    const users = await User.find({}, 'username'); // Fetches all users with only 'username' field
    res.render('pages/users', { users }); // Renders 'users' view with the fetched user data
  } catch (err) {
    res.status(500).send('Error fetching users'); // Sending error response if fetching users fails
  }
});

// Exporting the router to make routes accessible in other parts of the application
module.exports = router;
