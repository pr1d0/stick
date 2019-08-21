import express from 'express';
import News from '../controllers/news';

const NewsRouter = express.Router();

NewsRouter.get('/', News.list);
NewsRouter.get('/:newsId', News.item);

NewsRouter.post('/create', News.create);

NewsRouter.put('/update:newsId', News.update);
NewsRouter.delete('/:newsId', News.delete);

export default NewsRouter