import mongoose, { Schema } from 'mongoose';
import timestamps from 'mongoose-timestamp';
import URLSlug from 'mongoose-url-slugs';

const BrandSchema = new Schema({
	id: {
		type: Number,
		required: true,
		unique: true
	},
	name: {
		type: String,
		required: true
	},
	description: String
});

BrandSchema.plugin(timestamps);
BrandSchema.plugin(URLSlug('name'));

const BrandModel = mongoose.model('Brand', BrandSchema);

export default BrandModel