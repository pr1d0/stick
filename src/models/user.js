import mongoose, { Schema } from 'mongoose';
import bcrypt from 'mongoose-bcrypt';
import URLSlug from 'mongoose-url-slugs';
import timestamps from 'mongoose-timestamp';
import findOrCreate from 'mongoose-findorcreate';

const userSchema = new Schema({
    email: {
        type: String,
        lowercase: true,
        trim: true,
        index: true,
        unique: true,
        // required: true,
    },
    password: {
        type: String,
        // required: true,
        bcrypt: true,
    },
    username: {
        type: String,
        lowercase: true,
        trim: true,
        index: true,
        // unique: true,
    },
    name: {
        type: String,
        trim: true,
    },
    twitter: {
        type: String,
        trim: true,
    },
    recoveryCode: {
        type: String,
        trim: true,
    },
    active: {
        type: Boolean,
        default: true,
    },
    avatar: {
        type: String,
        default: '/media/user/avatar-default.jpg'
    },
    news: [{
        type: Schema.Types.ObjectId,
        ref: 'News',
    }],
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment',
    }]
});

userSchema.plugin(bcrypt);
userSchema.plugin(timestamps);
userSchema.plugin(findOrCreate);
userSchema.plugin(URLSlug('username'));

const UserModel = mongoose.model('User', userSchema);

export default UserModel;