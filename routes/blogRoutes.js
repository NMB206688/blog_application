// routes/blogRoutes.js
const express = require('express');
const Blog = require('../models/Blog');
const router = express.Router();

// Display all blogs
router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.render('pages/blogs', { blogs });
  } catch (err) {
    res.status(500).send('Error fetching blogs');
  }
});

// New blog form
router.get('/new', (req, res) => {
  res.render('pages/newBlog');
});

// Create new blog
router.post('/', async (req, res) => {
  const { title, content } = req.body;
  try {
    const blog = new Blog({ title, content });
    await blog.save();
    res.redirect('/blogs');
  } catch (err) {
    res.status(500).send('Error creating blog');
  }
});

// Edit blog form
router.get('/edit/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    res.render('pages/editBlog', { blog });
  } catch (err) {
    res.status(500).send('Error fetching blog');
  }
});

// Update blog
router.post('/edit/:id', async (req, res) => {
  try {
    await Blog.findByIdAndUpdate(req.params.id, req.body);
    res.redirect('/blogs');
  } catch (err) {
    res.status(500).send('Error updating blog');
  }
});

// Delete blog
router.get('/delete/:id', async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.redirect('/blogs');
  } catch (err) {
    res.status(500).send('Error deleting blog');
  }
});

module.exports = router;
