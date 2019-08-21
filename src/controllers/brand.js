import BrandModel from '../models/brand';

const Brand = {
	create ( req, res )
	{
		BrandModel
			.create(req.body)
			.then(brand => res.json(product))
			.catch(err => {
				let httpStatus;

				if ( err instanceof mongoose.Error.ValidationError ) {
					httpStatus = 422;
				} else {

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

				res.json(product)
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