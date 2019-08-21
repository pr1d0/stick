import express from 'express';
import MasterProductModel from '../api/product/model';

const ProductRouter = express.Router();

const product = {
	detail ( req, res )
	{
		console.log(req.params)
		MasterProductModel
			.findOne({ 'simples.slug':  req.params.simple })
			.exec((err, product) => {
				if ( err ) return res.status(500).send(err);

				res.render('product/detail', { product: product })
			});
	},
};

ProductRouter.get('/:master/:simple', product.detail);

export default ProductRouter