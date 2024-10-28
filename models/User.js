// Importing the mongoose library for MongoDB interactions
const mongoose = require('mongoose');

// Importing bcryptjs for hashing passwords securely
const bcrypt = require('bcryptjs');

// Defining a schema (structure) for the User model with fields for username and password
const userSchema = new mongoose.Schema({

  // 'username' field of type String, required to be unique for each user (no duplicate usernames allowed)
  username: {
    type: String,
    required: true,
    unique: true,
  },

  // 'password' field of type String, required to store the user's password
  password: {
    type: String,
    required: true,
  },
});

// Middleware that runs before saving a user to the database to hash the password
userSchema.pre('save', async function (next) {
  
  // If the password hasn't been modified (e.g., on update), skip hashing
  if (!this.isModified('password')) return next();

  // Generating a salt for hashing, which adds extra randomness to the password hash
  const salt = await bcrypt.genSalt(10);

  // Hashing the user's password with the salt, then replacing the plain text password with the hash
  this.password = await bcrypt.hash(this.password, salt);

  // Calling next() to proceed with the save operation
  next();
});

// Exporting the User model based on the userSchema to use it in other parts of the app
module.exports = mongoose.model('User', userSchema);
