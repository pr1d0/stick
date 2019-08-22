import mongoose, { Schema } from 'mongoose';
import bcrypt from 'mongoose-bcrypt';
import URLSlug from 'mongoose-url-slugs';
import findOrCreate from 'mongoose-findorcreate';
import { isEmail, isMobilePhone } from 'validator';

const userSchemaFields = {
    email: {
        type: String,
        lowercase: true,
        trim: true,
        index: true,
        unique: true,
        required: true,
        validate: [isEmail, 'invalid email']
    },
    password: {
        type: String,
        required: true,
        bcrypt: true,
    },
    firstName: {
        type: String,
        trim: true,
    },
    lastName: {
        type: String,
        trim: true,
    },
    username: {
        type: String,
        lowercase: true,
        trim: true,
        index: true,
        unique: true,
    },
    phone: {
        type: String,
        validate: [isMobilePhone, 'invalid phone']
    }
};

const userSchemaOptions = { timestamps: true };

const userSchema = new Schema(userSchemaFields, userSchemaOptions);

userSchema.plugin(bcrypt);
userSchema.plugin(findOrCreate);

const UserModel = mongoose.model('User', userSchema);

export default UserModel