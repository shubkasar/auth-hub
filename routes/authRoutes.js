const express = require('express');
const {register, login, resetPasswordRequest, resetPassword } = require('../controllers/authController');
const passport = require('passport');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

router.post('/password-reset-request', resetPasswordRequest);
router.post('/password-reset', resetPassword);

router.get('/google', passport.authenticate('google', {scope: ['profile', 'email']}));

router.get('/google/callback',
    passport.authenticate('google', {failureRedirect: '/auth/login'}),
    (req, res) => {
        req.login(req.user, function(err){
            if(err){
                return res.redirect('/auth/login');
            }
        });
        res.redirect('/');
    }
);

router.get('/facebook', passport.authenticate('facebook', {scope: ['email']}));

router.get('/facebook/callback',
    passport.authenticate('facebook', {failureRedirect: '/auth/login'}),
    (req, res) => {
        req.login(req.user, function(err){
            return res.redirect('/auth/login');
        });
        res.redirect('/');
    }
);

module.exports = router;