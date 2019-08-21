import express from 'express';
import passport from 'passport';

import userController from '../controllers/user';

const UserRouter = express.Router();

UserRouter.get('/profile/:id/', userController.profile);

UserRouter.get('/signup', userController.signupPage);

UserRouter.get('/login', userController.loginPage);

UserRouter.get('/logout', userController.logout);

UserRouter.post(
    '/signup',
    passport.urlFix,
    passport.authenticate('local'),
    ( req, res ) => {
        res.redirect('/user/profile/' + req.user.id)
    }
);

UserRouter.post(
    '/login',
    passport.urlFix,
    ( req, res, next ) => {
        req.tryToLogin = true;
        next()
    },
    passport.authenticate('local'),
    ( req, res ) => {
        res.redirect('/user/profile/' + req.user.id)
    }
);

UserRouter.get(
    '/login/steam',
    userController.steamReturn,
    passport.authenticate('steam', { failureRedirect: '/' }),
    userController.steamEnter
);

UserRouter.get(
    // Route
    '/steam/return',
    // Middleware passport fix
    passport.urlFix,
    // Middleware passport authenticate
    passport.authenticate('steam', { failureRedirect: '/' }),
    // Controller of all ok
    userController.steamReturn
);

export default UserRouter