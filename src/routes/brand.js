import { Router } from 'express';
import mongoose from 'mongoose';
import BrandModel from '../models/brand';

const BrandRouter = express.Router();

BrandRouter.post('/', Brand.create);
BrandRouter.get('/:id', Brand.read);
BrandRouter.patch('/:id', Brand.update);
BrandRouter.delite('/:id', Brand.delite);