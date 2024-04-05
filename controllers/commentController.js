const Comment = require('../models/commentModel');
const mongoose = require('mongoose');

// Get all comments
const getComments = async (req, res) => {
    try {
        const comments = await Comment.find({});
        res.status(200).json(comments);
    } catch (error) {
        console.error('Error fetching comments:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get a single comment
const getComment = async (req, res) => {
    const { id } = req.params;

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: 'Comment does not exist' });
        }

        const comment = await Comment.findById(id);

        if (!comment) {
            return res.status(404).json({ error: 'Comment does not exist' });
        }

        res.status(200).json(comment);
    } catch (error) {
        console.error('Error fetching comment:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Create a new comment
const createComment = async (req, res) => {
    const { content, postedBy, postId } = req.body;

    try {
        if (!content || !postId || !postedBy) {
            return res.status(400).json({ error: 'Please provide text, postId, and postedBy for the comment' });
        }

        const comment = await Comment.create({ content, postedBy, postId });
        res.status(200).json(comment);
    } catch (error) {
        console.error('Error creating comment:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Update a comment
const updateComment = async (req, res) => {
    const { id } = req.params;

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: 'Comment does not exist' });
        }

        const updatedComment = await Comment.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedComment) {
            return res.status(404).json({ error: 'Comment does not exist' });
        }

        res.status(200).json(updatedComment);
    } catch (error) {
        console.error('Error updating comment:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Delete a comment
const deleteComment = async (req, res) => {
    const { id } = req.params;

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: 'Comment does not exist' });
        }

        const deletedComment = await Comment.findByIdAndDelete(id);

        if (!deletedComment) {
            return res.status(404).json({ error: 'Comment does not exist' });
        }

        res.status(200).json(deletedComment);
    } catch (error) {
        console.error('Error deleting comment:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    getComments,
    getComment,
    createComment,
    updateComment,
    deleteComment
};
