import mongoose from 'mongoose';
import MasterProductModel from '../api/product/model';

const Catalog = {
	create ( req, res )
	{
		console.log('body', req.body)
		MasterProductModel
			.create(req.body)
			.then(product => {
				return res.json(product)
			})
			.catch(err => {
				if ( err instanceof mongoose.Error.ValidationError ) {
					return res.status(422).send(err);
				}

				return res.status(500).send(err);
			});
	},
	read ( req, res )
	{
		MasterProductModel
			.findById(req.params.id)
			.exec((err, product) => {
				if ( err ) return res.status(500).send(err);

				res.render('catalog/product/detail', { product: product })
			});
	},
	update ( req, res )
	{
		MasterProductModel
			.findByIdAndUpdate(req.params.id, req.body, { new: true })
			.then(product => res.json(product))
			.catch(err => {
				if ( err instanceof mongoose.Error.ValidationError ) {
					return res.status(422).send(err);
				}

				return res.status(500).send(err);
			});
	},
};

export default Catalog