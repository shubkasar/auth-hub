const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const bcrypt = require('bcrypt');
// const pool = require('./db');
// const { callbackify } = require('util');
const {User, AuthProvider} = require('../models');

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "auth/google/callback"
},
async (accessToken, refreshToken, profile, done) => {
    try{
        const googleId = profile.id;
        const email = profile.emails[0].value;
        const fullName = profile.displayName;
        const username = profile.name.givenName;

        let user = await AuthProvider.findOne({where: {provider_name: 'google', provider_uid: googleId}});

        if(!user){
            const hashedPassword = await bcrypt.hash(Math.random().toString(36).slice(-8), 10);
            user = await User.create({ email_id: email, pasword_hash: hashedPassword, username: username, full_name: fullName});
            await AuthProvider.create({_id: user._id, provider_name: 'google', provider_uid: googleId});
        } else {
            user = await User.findByPk(user._id);
        }

        return done(null, user);

    } catch(err) {
        return done(null, user);
    }
}
));

passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: "/auth/facebook/callback",
    profileFields: ['id', 'emails', 'name']
},
async (accessToken, refreshToken, profile, done) => {
    
    try{   
        const facebookId = profile.id;
        const email = profile.emails[0].value;
        const fullName = `${profile.name.givenName} ${profile.name.familyName}`;
        const username = profile.name.givenName;

        let user = await AuthProvider.findOne({where: {provider_name: 'facebook', provider_uid: facebookId}});

        if(!user){
            const hashedPassword = await bcrypt.hash(Math.random().toString(36).slice(-8), 10);
            user = await User.create({email_id: email, pasword_hash: hashedPassword, username: username, full_name: fullName});
            await AuthProvider.create({_id: user._id, provider_name: 'facebook', provider_uid: facebookId});
        } else {
            user = await User.findByPk(user._id);
        }

        return done(null, user);
    } catch(err) {
        return done(err, null);
    }
}
));

module.exports = passport;
