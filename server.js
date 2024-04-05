require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const postRoutes = require('./routes/posts')
const userRoutes = require('./routes/user')
const commentRoutes = require('./routes/comments')
const cors = require('cors');

// Express app
const app = express()

// Middleware
app.use(cors())
app.use(express.json())
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// Routes
app.use('/api/posts', postRoutes)
app.use('/api/user', userRoutes)
app.use('/api/comments', commentRoutes)

// Connect to DB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {

        // Listen for requests
        app.listen(process.env.PORT, () => {
            console.log('Listening on port 4000')
        })

    })
    .catch((error) => {
        console.log(error)
    })

