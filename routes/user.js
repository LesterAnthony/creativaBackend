const express = require('express');
const { loginUser, signupUser, updateUserProfile } = require('../controllers/userController');

const router = express.Router();

// Login Route
router.post('/login', loginUser);

// Signup Route
router.post('/signup', signupUser);

// Update Profile Route (PATCH)
router.patch('/:id', updateUserProfile);

module.exports = router;
