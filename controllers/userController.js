const mongoose = require('mongoose');
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' })
}

// Login a User
const loginUser = async (req, res) => {
    const {username, password} = req.body
    
    try {
        const user = await User.login(username, password)

        // Create a Token
        const token = createToken(user._id)

        res.status(200).json({username, token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// Signup a User
const signupUser = async (req, res) => {
    const {username, password} = req.body
    
    try {
        const user = await User.signup(username, password)

        // Create a Token
        const token = createToken(user._id)

        res.status(200).json({username, token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// Update User Profile
const updateUserProfile = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'User does not exist' });
    }

    try {
        const user = await User.findByIdAndUpdate(id, req.body, { new: true });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error('Error updating user profile:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


module.exports = { signupUser, loginUser, updateUserProfile }