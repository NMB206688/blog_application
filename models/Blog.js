// Importing the mongoose library to interact with MongoDB
const mongoose = require('mongoose');

// Defining a schema (blueprint) for a blog post, specifying the structure of the data
const blogSchema = new mongoose.Schema({
  
  // 'title' field of type String, required means it must be provided for each blog post
  title: {
    type: String,
    required: true,
  },

  // 'content' field of type String, required as well
  content: {
    type: String,
    required: true,
  },

  // 'createdAt' field of type Date, default value is set to the current date and time
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Exporting the model created from the schema, naming it 'Blog'
// This allows us to use this model elsewhere in our code to interact with blog posts in the database
module.exports = mongoose.model('Blog', blogSchema);

