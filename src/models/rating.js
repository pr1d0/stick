import mongoose, { Schema } from 'mongoose';
import timestamps from 'mongoose-timestamp';

import RatingController from '../controllers/rating';

const vote = {
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    value: Number,
};

const ratingSchema = new Schema({
    total: {
        type: Number,
        default: 0
    },
    postId: {
        type: Schema.Types.ObjectId,
        ref: 'Comment',
    },
    voted: [vote],
});

ratingSchema.pre('save', function ( next ) { RatingController.beforeCreate(this, next) });

ratingSchema.plugin(timestamps);

const RatingModel = mongoose.model('Rating', ratingSchema);

export default RatingModel
