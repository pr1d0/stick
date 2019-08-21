import NewsModel from '../models/news';

const NewsController = {
    create ( req, res )
    {
        NewsModel
            .create(req.body)
            .then( news => res.json(news) )
            .catch( err => res.status(500).send(err) );
    },

    update ( req, res )
    {
        const data = req.query;

        NewsModel
            .findByIdAndUpdate(data.id, data, { new: true })
            .then( news => res.json(news) )
            .catch( err => res.status(500).send(err) );
    },

    delete ( req, res )
    {
        NewsModel
            .findByIdAndUpdate(req.query.id, { hidden: true }, { new: true })
            .then( news => res.json(news) )
            .catch( err => res.status(500).send(err) );
    },

    list ( req, res )
    {
        NewsModel
            .find()
            .sort({ 'date': -1 })
            .limit(10)
            .then(newsList => res.render('news/list', { newsList: newsList }))
            .catch(err => res.status(500).send(err) );
    },

    item ( req, res )
    {
        NewsModel
            .findOne({ slug: req.params.newsId })
            .populate('comments')
            .exec((err, news) => {
                if ( err ) return res.status(500).send(err);

                res.render('news/detail', { news: news, user: req.user })
            });
    }
};

export default NewsController;