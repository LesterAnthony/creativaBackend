const express = require('express')
const {
    getPosts,
    getPost,
    createPost,
    deletePost,
    updatePost,
    upvotePost,
    downvotePost
} = require('../controllers/postController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()
// const Post = require('../models/postModel')


// GET all posts
router.get('/', getPosts)

// GET a single post
router.get('/:id', getPost)

// Require auth for all post routes
router.use(requireAuth)

// POST a post
router.post('/', createPost)

// DELETE a post
router.delete('/:id', deletePost)

// UPDATE a post
router.patch('/:id', updatePost)

// POST an upvote to a post
router.patch('/:id/upvote', upvotePost);

// POST a downvote to a post
router.patch('/:id/downvote', downvotePost);

module.exports = router