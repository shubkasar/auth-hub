const { registerUser, findUserByEmail, createPasswordResetToken, resetUserPassword }=require('../services/authService');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

const register = async (req, res) => {
    const { email, password, username, fullName } = req.body;
    try {
        const newUser = await registerUser(email, password, username, fullName);
        res.status(201).json({success: true, user: newUser});
    } catch (error) {
        res.status(500).json({success: false, message: error.message});
    }
};

const login = async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await findUserByEmail(email);
        if(user && await bcrypt.compare(password, user.password_hash)){
            res.status(200).json({success: true, user});
        } else {
            res.status(401).json({success: false, message: 'Invalid credentials'});
        }
    } catch (error) {
        res.status(500).json({success: false, message: error.message});
    }
};

const resetPasswordRequest = async (req, res) => {
    const {email} = req.body;
    try {
        const token = await createPasswordResetToken(email);
        if(token){
            res.status(200).json({success: true, message: 'Password reset token sent to email'});
        } else {
            res.status(404).json({success: false, message: 'User not found'});
        }
    } catch (error) {
        res.status(500).json({success: false, message: error.message});
    }
};

const resetPassword = async (req, res) => {
    const {token, newPassword} = req.body;
    try {
        const reset = await resetUserPassword(token, newPassword);
        if(reset){
            res.status(200).json({success: true, message: 'Password reset successful!'});
        } else {
            res.status(400).json({success: false, message: 'Invalid or expired token.'});
        }
    } catch (error) {
        res.status(500).json({success: false, message: error.message});
    }
};

module.exports = {
    register,
    login,
    resetPasswordRequest,
    resetPassword,
};