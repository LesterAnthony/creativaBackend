const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    postedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    postId: {
        type: Schema.Types.ObjectId,
        ref: 'Post',
        required: true
    },
    parentComment: {
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    },
    childrenComments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }]
}, { timestamps: true });

module.exports = mongoose.model('Comment', commentSchema);
