import RatingController from '../controllers/rating';

import { Router } from 'express';
import { MSG_ERROR_NOT_LOGED_IN } from '../config/messages';

const RatingRouter = Router();

RatingRouter.post('/', ( req, res, next ) => {
    // if ( !req.isAuthenticated() ) return res.json({ success: false, message: MSG_ERROR_NOT_LOGED_IN });
    next();
}, RatingController.vote);

export default RatingRouter