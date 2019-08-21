import express from 'express';
import Catalog from '../controllers/catalog';

const CatalogRouter = express.Router();

CatalogRouter.get('/:filter', Catalog.read);

export default CatalogRouter