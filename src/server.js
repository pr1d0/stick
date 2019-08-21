import morgan from 'morgan';
import express from 'express';
import mongoose from 'mongoose';
import passport from 'passport';
import session from 'express-session';
import connectMongo from 'connect-mongo';
import flash from 'express-flash';
import compression from 'compression';
import ejsLocals from 'ejs-locals';

import './db';

import ProductApiRouter from './api/product/router';

import NewsRouter from './routes/news';
import UserRouter from './routes/user';
import RatingRouter from './routes/rating';
import CommentRouter from './routes/comment';
import ProductRouter from './routes/product';
import CatalogRouter from './routes/catalog';

const MongoStore = connectMongo(session);

const app = express();

const port = 3005;

const logger = morgan('dev');

// Dev
if ( app.get('env') === 'development' ) {
    app.use(logger);
}

// App
app.engine('ejs', ejsLocals);
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// Moddleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(flash());
app.use(session({
    secret : 'last Man Standing',
    store  : new MongoStore({ mongooseConnection: mongoose.connection })
}));
app.use(compression());

app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/news', NewsRouter);
app.use('/user', UserRouter);
app.use('/vote', RatingRouter);
app.use('/comment', CommentRouter);

/**
 * API
 */
app.use('/api/product', ProductApiRouter);

/**
 * Catalog
 */
 app.use('/catalog', CatalogRouter);

/**
 * Product
 */
app.use('/product', ProductRouter);

const page = {
	title: 'Page title',
	desc: 'Page description',
	screen: 'homepage'
}

const prod = {
	name: 'Product name'
}

const minicart = {
	amount: 2
}

app.get('/', ( req, res ) => {
    res.render('layout/index', { page, prod, minicart })
});

// Server
app.listen(port, () => console.log('SERVER INIT'));

export default app