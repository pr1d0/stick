import express from 'express';
import CommentController from '../controllers/comment';

const CommentRouter = express.Router();

CommentRouter.post('/', CommentController.create);

export default CommentRouter