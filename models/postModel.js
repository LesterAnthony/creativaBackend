const mongoose = require('mongoose')

const Schema = mongoose.Schema

const postSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    image: {
        type: String,
    },
    caption: {
        type: String,
        required: true
    },
    postedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    tags: {
        type: [String]
    },
    comments: {
        type: [Schema.Types.ObjectId],
        ref: 'Comment'
    },
    upvotes: {
        type: Number,
        default: 0
    },
    downvotes: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema)
