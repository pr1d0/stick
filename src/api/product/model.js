import mongoose, { Schema } from 'mongoose';
import urlSlug from 'mongoose-url-slugs';
import { isAlphanumeric } from 'validator'

const productImageFields = {
	area: {
		type: String, 
		enum: ['thumbnail', 'card', 'detail', 'zoom', 'default'],
		required: true,
		default: 'default'
	},
	url: {
		type: String,
		trim: true,
	},
	file: {
		type: Buffer,
		required: function() { return this.url === null },
	},
	order: {
		type: Number,
		default: 0,
		min: 0,
		max: 10
	}
};

const option = {
	name: String,  // color
	label: String, // Color
	value: String, // XS, 44, Large
};

const optionSizeFields = {
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
	price: Price,
};

const productFields = {
	name: {
		type: String,
		required: true,
		trim: true
	},
	shortDescription: {
		type: String,
		required: true,
		trim: true
	},
	sku: {
		type: String,
		required: true,
		trim: true,
		validate: [isAlphanumeric, 'Product sku should only have letters and numbers']
	},
	weight: {
		type: Number,
		required: true
	},
	price: {
		type: Number,
		required: true,
		min: 0
	},
	status: {
		type: String,
		enum: ['enabled', 'disabled', 'preorder', 'archive'],
		required: true,
		default: 'disabled',
		validate: [function(){ this.stock === 0 && this.status !== 'disabled' }, 'Only disabled allowed if stock 0']
	},
	categories: [{
		type: Number,
		required: true,
		default: 0 // 0 is ID for category "unassigned products",
		// validate: function(){ this.categories.one}
	}],

	// Additional
	description: {
		type: String,
		trim: true
	},
	salePrice: {
		type: Number,
		min: 0
	},
	stock: {
		type: Number,
		min: 0,
		max: 999,
		default: 0
	},
	keywords: [String],
	preorderReleaseDate: String,
	preorderMessage: String,
	images: [productImageFields],
};

const childProductFields = {

};

const productOptions = { timestamps: true };

const productSchema = new Schema(productFields, productOptions);

productSchema.plugin(urlSlug('name'));

const ProductModel = mongoose.model('Product', productSchema);

export default ProductModel