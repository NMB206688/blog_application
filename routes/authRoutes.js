// routes/authRoutes.js
const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const router = express.Router();

// Register Page
router.get('/register', (req, res) => {
  res.render('pages/register');
});

// Register User
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = new User({ username, password });
    await user.save();
    res.redirect('/login');
  } catch (err) {
    res.status(400).send('Error registering user');
  }
});

// Login Page
router.get('/login', (req, res) => {
  res.render('pages/login');
});

// Login User
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).send('Invalid credentials');
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).send('Invalid credentials');
    req.session.user = user;
    res.redirect('/welcome');
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Welcome Page
router.get('/welcome', (req, res) => {
  if (!req.session.user) return res.redirect('/login');
  res.render('pages/welcome', { username: req.session.user.username });
});

// Logout
router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
});

// Route to Display Registered Users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find({}, 'username'); // Fetch users with only 'username' field
    res.render('pages/users', { users }); // Render the 'users' page with user data
  } catch (err) {
    res.status(500).send('Error fetching users');
  }
});

module.exports = router;
