import express from 'express';
import Product from './controller';

const ProductRouter = express.Router();

ProductRouter.post('/', Product.create);
ProductRouter.get('/:id', Product.read);
ProductRouter.patch('/:id', Product.update);
// ProductRouter.put('/', Product.update);
// ProductRouter.delete('/', Product.delete);

export default ProductRouter