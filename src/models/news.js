import mongoose, { Schema } from 'mongoose';
import URLSlug from 'mongoose-url-slugs';

const NewsSchema = new Schema({
    title:  {
        type: String,
        required: true,
        trim: true
    },
    body:   {
        type: String,
        required: true,
        trim: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    hidden: {
        type: Boolean,
        default: false
    },
    category: {
        type: String,
        default: 'News'
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }]
});

NewsSchema.plugin(URLSlug('title'));

const NewsModel = mongoose.model('News', NewsSchema);

export default NewsModel