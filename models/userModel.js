const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profilePicture: {
        type: String,
        default: 'http://res.cloudinary.com/dwuve60k3/image/upload/v1712300204/images/uduyjtu0ucjonjrslw1t.webp'
    },
    profileBanner: {
        type: String,
        default: 'http://res.cloudinary.com/dwuve60k3/image/upload/v1712256659/images/ozjb4ibtrybc3cjtmtxy.png'
    },
    bio: {
        type: String,
        default: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    }
})


// Static Login Method
userSchema.statics.login = async function(username, password) {

    // Validation
    if (!username || !password) {
        throw Error('All fields must be filled')
    }

    const user = await this.findOne({ username })
    
    if (!user) {
        throw Error('Incorrect username')
    }

    const match = await bcrypt.compare(password, user.password)
    if (!match) {
        throw Error('Incorrect password')
    }

    return user
}



// Static Signup Method
userSchema.statics.signup = async function(username, password) {

    // Validation
    if (!username || !password) {
        throw Error('All fields must be filled')
    }
    if (!validator.isStrongPassword(password)) {
        throw Error('Password not strong enough')
    }

    const exists = await this.findOne({ username })
    if (exists) {
        throw Error('Username already in use')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({ username, password: hash })

    return user
}

module.exports = mongoose.model('User', userSchema)