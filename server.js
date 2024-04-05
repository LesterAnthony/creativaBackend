require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const postRoutes = require('./routes/posts')
const userRoutes = require('./routes/user')
const commentRoutes = require('./routes/comments')

const allowedOrigins = ['http://yourfrontenddomain.com', 'https://yourfrontenddomain.com'];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true);

    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified origin.';
      return callback(new Error(msg), false);
    }

    return callback(null, true);
  }
}));

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
        app.listen('https://creativabackend.onrender.com/', () => {
            console.log('Listening on port 4000')
        })

    })
    .catch((error) => {
        console.log(error)
    })

