import passport from 'passport';
import passportLocal from 'passport-local';
import passportSteam from 'passport-steam';

import UserModel from '../models/user';

const LocalStrategy = passportLocal.Strategy;

const SteamStrategy = passportSteam.Strategy;

passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser((id, done) => UserModel.findById(id, (err, user) => done(err, user)));

passport.urlFix = ( req, res, next ) => {
    req.url = req.originalUrl;
    next();
};

const steamCfg = {
    returnURL: 'http://localhost:3000/user/steam/return',
    realm: 'http://localhost:3000/',
    apiKey: '971AB4831977D5091C8A402D0937593D',
};

const localCfg = {
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true
};

function localController ( req, email, password, done ) {
    process.nextTick(() => {
        UserModel.findOne({ email:  email }, ( err, user ) => {
            console.log(0)
            // If error in mode
            if ( err ) return done(err);
            console.log(1)

            // If trying to login just return user document
            if ( user && req.tryToLogin ) {
                console.log(2)

                if ( user.verifyPasswordSync(password) ) {
                    console.log(3)
                    return done(null, user)
                } else {
                    console.log(4)
                    return done(null, false, req.flash('loginMessage', 'Invalid password'));
                }
            }

            // If trying to register return message or create a user
            if ( user ) {
                return done(null, false, req.flash('signupMessage', 'That email is already taken'));
            } else {
                const userData = {
                    email: email,
                    password: password
                }

                UserModel
                    .create(userData)
                    .then(user => done(null, user))
                    .catch(err => done(err, null));
            }
        });
    });
};

function steamController ( identifier, profile, done )
{
    const userData = {
        username: profile.displayName,
        avatar: profile._json.avatarfull,
        email: profile.id
    }

    UserModel.findOrCreate({ email: userData.email }, userData, (err, user) => {
        done(err, user)
    });
};

const steamStrategy = new SteamStrategy(steamCfg, steamController);

const localStrategy = new LocalStrategy(localCfg, localController)

passport.use(steamStrategy);
passport.use(localStrategy);

export { localStrategy, steamStrategy }