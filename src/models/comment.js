import mongoose, { Schema } from 'mongoose';
import timestamps from 'mongoose-timestamp';

import commentController from '../controllers/comment';

const commentSchema = new Schema({
    content: {
        type: String,
        required: true,
        trim: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    postId: {
        type: Schema.Types.ObjectId,
        ref: 'News',
    },
    rating: {
        type: Number,
        default: 0
    },
    voted: [{
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        value: Number,
    }]
});

commentSchema.post('save', ( comment, next ) => {
    commentController.afterCreate(comment, next);
});

commentSchema.plugin(timestamps);

const CommentModel = mongoose.model('Comment', commentSchema);

export default CommentModel
