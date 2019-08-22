import mongoose, { Schema } from 'mongoose';
import urlSlug from 'mongoose-url-slugs';

const productImageFields = {
	area: { 
		type: String, 
		enum: ['thumbnail', 'card', 'detail', 'zoom'],
		required: true
	},
	url: {
		type: String,
		unique: true
	},
	file: {
		type: Buffer,
		required: function() { return this.url === null },
	},
	order: {
		type: Number,
		default: 0,
		min: 0
	}
};

const optionFields = {
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
	price: Price
};

const productFields = {
	name: {
		type: String,
		required: true,
		trim: true
	},
	sku: {
		type: String,
		required: true,
		trim: true
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
	salePrice: {
		type: Number,
		required: true,
		min: 0
	},
	shortDescription: {
		type: String,
		required: true,
		trim: true
	},
	status: {
		type: String,
		enum: ['enabled', 'disabled', 'preorder', 'archive'],
		required: true,
		default: 'disabled'
	},
	categories: [{
		type: Number,
		required: true
	}],
	description: {
		type: String,
		trim: true
	},
	brandName: String,
	brandId: Number,
	keywords: [String],
	preorderReleaseDate: String,
	preorderMessage: String,
	options: [
		{
			name: String,
			value: String,
		}
	],
	images: {
		type: [Image],
		default: undefined,
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
		max: 999
	},
	simples: {
		type: [SimpleProduct],
		default: undefined
	}
};

const productOptions = { timestamps: true };

const productSchema = new Schema(productFields, productOptions);

productSchema.plugin(urlSlug('name'));

const ProductModel = mongoose.model('Product', productSchema);

export default ProductModel