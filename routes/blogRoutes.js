// Importing required libraries and modules
const express = require('express'); // Express for routing
const Blog = require('../models/Blog'); // Blog model to interact with the database
const router = express.Router(); // Creating a new router instance for blog routes

// Route to display all blog posts (GET request)
router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 }); // Fetching all blogs and sorting by latest created
    res.render('pages/blogs', { blogs }); // Rendering the 'blogs' page with the fetched blogs
  } catch (err) {
    res.status(500).send('Error fetching blogs'); // Sending error response if fetching blogs fails
  }
});

// Route to display the form to create a new blog post (GET request)
router.get('/new', (req, res) => {
  res.render('pages/newBlog'); // Rendering the 'newBlog' page, which contains a form for creating blogs
});

// Route to create a new blog post (POST request)
router.post('/', async (req, res) => {
  const { title, content } = req.body; // Extracting title and content from the request body
  try {
    const blog = new Blog({ title, content }); // Creating a new Blog instance with the provided data
    await blog.save(); // Saving the new blog to the database
    res.redirect('/blogs'); // Redirecting to the blogs page after successful creation
  } catch (err) {
    res.status(500).send('Error creating blog'); // Sending error response if blog creation fails
  }
});

// Route to display the form for editing an existing blog post (GET request)
router.get('/edit/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id); // Finding the blog by its ID from the route parameter
    res.render('pages/editBlog', { blog }); // Rendering 'editBlog' page with the blog data
  } catch (err) {
    res.status(500).send('Error fetching blog'); // Sending error response if fetching blog fails
  }
});

// Route to update an existing blog post (POST request)
router.post('/edit/:id', async (req, res) => {
  try {
    await Blog.findByIdAndUpdate(req.params.id, req.body); // Finding the blog by ID and updating with new data
    res.redirect('/blogs'); // Redirecting to blogs page after successful update
  } catch (err) {
    res.status(500).send('Error updating blog'); // Sending error response if update fails
  }
});

// Route to delete a blog post (GET request)
router.get('/delete/:id', async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id); // Finding the blog by ID and deleting it from the database
    res.redirect('/blogs'); // Redirecting to blogs page after successful deletion
  } catch (err) {
    res.status(500).send('Error deleting blog'); // Sending error response if deletion fails
  }
});

// Exporting the router to make these blog routes available in the main application file
module.exports = router;
