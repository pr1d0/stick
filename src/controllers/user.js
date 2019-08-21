import '../config/passport';

import passport from 'passport';
import UserModel from '../models/user.js';

const userController = {
    signupPage ( req, res )
    {
        if ( req.isAuthenticated() ) {
            res.redirect('/user/profile/' + req.user.id);
        } else {
            res.render('user/signup');
        }
    },

    loginPage ( req, res )
    {
        if ( req.isAuthenticated() ) {
            res.redirect('/user/profile/' + req.user.id);
        } else {
            res.render('user/login');
        }
    },

    logout ( req, res )
    {
        req.logout();
        res.redirect('/user/login');
    },

    profile ( req, res )
    {
        // Did req.user has comments? 
        if ( req.isAuthenticated() ) {
            UserModel
                .findById(req.user.id)
                .populate('comments')
                .exec((err, user) => {
                    if ( err ) console.log(err);
                    res.render('user/profile', { user });
                });

        } else {
            res.redirect('/user/login');
        }
    },

    steamEnter ( req, res )
    {
        res.redirect('/user/login');
    },

    steamReturn ( req, res, next )
    {
        if ( req.isAuthenticated() ) {
            res.redirect('/user/profile/' + req.user.id);
        } else {
            next();
        }
    }
};

export default userController