import mongoose, { Schema } from 'mongoose';
import timestamps from 'mongoose-timestamp';
import URLSlug from 'mongoose-url-slugs';

const Image = new Schema({
	area: { 
		type: String, 
		enum: ['thumbnail', 'card', 'detail', 'zoom'],
		required: true
	},
	url: {
		type: String,
		required: true,
		unique: true
	},
	order: {
		type: Number,
		default: 0,
		min: 0
	}
});

const Price = {
	original: {
		type: Number,
		required: true,
		min: 0
	},
	special: {
		type: Number,
		min: 0
	}
};

const Size = new Schema({
	size: {
		type: String,
		required: true
	},
	stock: {
		type: Number,
		required: true,
		min: 0,
		max: 1000
	},
	sku: { 
		type: String, 
		required: true, 
		validate: [/[a-zA-Z0-9]/, 'Product sku should only have letters and numbers']
	},
	price: Price
});

const SimpleProduct = new Schema({
	color: {
		type: String,
		required: true,
		default: 'Default'
	},
	images: {
		type: [Image],
		default: undefined,
		required: true,
	},
	sizes: {
		type: [Size],
		default: undefined,
		required: true,
	},
	price: Price,
});

const MasterProduct = new Schema({
	brandName: String,
	brandId: Number,
	name: {
		type: String,
		required: true,
		trim: true
	},
	description: {
		type: String,
		required: true,
		trim: true
	},
	sku: {
		type: String,
		required: true
	},
	weight: Number,
	keywords: String,
	availability: {
		type: String,
		enum: ['available', 'disabled', 'preorder'],
		required: true,
		default: 'disabled'
	},
	preorderReleaseDate: String,
	preorderMessage: String,
	price: Price,
	images: {
		type: [Image],
		default: undefined,
		required: true,
	},
	sizes: {
		type: [Size],
		default: undefined,
		required: true,
	},
	color: {
		type: String,
		required: true,
		default: 'Default'
	},
	stock: {
		type: Number,
		min: 0,
	},
	simples: {
		type: [SimpleProduct],
		default: undefined
	}
});

MasterProduct.plugin(timestamps);

SimpleProduct.plugin(URLSlug('brandName name'));

const MasterProductModel = mongoose.model('MasterProduct', MasterProduct);

export default MasterProductModel