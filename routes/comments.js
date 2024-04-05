const express = require('express');
const {
    getComments,
    getComment,
    createComment,
    deleteComment,
    updateComment
} = require('../controllers/commentController');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

// GET all comments for a specific post
router.get('/post/:postId/comments', getComments);

// GET a single comment
router.get('/comments/:commentId', getComment);

// Require auth for all comment routes
router.use(requireAuth);

// POST a comment to a specific post
router.post('/post/:postId/comments', createComment);

// DELETE a comment
router.delete('/comments/:commentId', deleteComment);

// UPDATE a comment
router.patch('/comments/:commentId', updateComment);

module.exports = router;
