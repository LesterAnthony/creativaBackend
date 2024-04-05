const Post = require('../models/postModel')
const mongoose = require('mongoose')


// Get all posts
const getPosts = async (req, res) => {
    const posts = await Post.find({}).populate('postedBy').sort({createdAt: -1})
    // const posts = await Post.find({}).sort({createdAt: -1})
    
    res.status(200).json(posts)
}

// Get a single post
const getPost = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Post does not exist'})
    }

    const post = await Post.findById(id)

    if (!post) {
        return res.status(404).json({error: 'Post does not exist'})
    }

    res.status(200).json(post)
}

// Create a new post
const createPost = async(req, res) => {
    const {title, image, caption, tags} = req.body

    let emptyFields = []

    if (!title) {
        emptyFields.push('title')
    }
    if (!image) {
        emptyFields.push('image')
    }
    if (!caption) {
        emptyFields.push('caption')
    }
    if(emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in empty fields', emptyFields})
    }

    // Image

    if (!image) {
        return res.status(400).json({mssg: 'Please enter an icon url'})
    }

    // Add document to database
    try {
        const postedBy = req.user._id
        const post = await Post.create({title, image, caption, postedBy, tags})
        res.status(200).json(post)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// Delete a post
const deletePost = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Post does not exist'})
    }

    const post = await Post.findOneAndDelete({_id: id})

    if (!post) {
        return res.status(404).json({error: 'Post does not exist'})
    }

    res.status(200).json(post)
}

// Update a post
const updatePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Post does not exist' });
    }

    const { upvotes, downvotes } = req.body;

    const updatedFields = {};
    if (upvotes !== undefined) {
        updatedFields.upvotes = upvotes;
    }
    if (downvotes !== undefined) {
        updatedFields.downvotes = downvotes;
    }

    try {
        const updatedPost = await Post.findByIdAndUpdate(id, updatedFields, { new: true });

        if (!updatedPost) {
            return res.status(404).json({ error: 'Post does not exist' });
        }

        res.status(200).json(updatedPost);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const upvotePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Post does not exist' });
    }

    try {
        const updatedPost = await Post.findByIdAndUpdate(id, { $inc: { upvotes: 1 } }, { new: true });

        if (!updatedPost) {
            return res.status(404).json({ error: 'Post does not exist' });
        }

        res.status(200).json(updatedPost);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Downvote a post
const downvotePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Post does not exist' });
    }

    try {
        const updatedPost = await Post.findByIdAndUpdate(id, { $set: { downvotes: +1 } }, { new: true });

        if (!updatedPost) {
            return res.status(404).json({ error: 'Post does not exist' });
        }

        res.status(200).json(updatedPost);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    getPosts,
    getPost,
    createPost,
    deletePost,
    updatePost,
    upvotePost,
    downvotePost
}