const bcrypt = require('bcrypt');
const crypto = require('crypto');
const {User, PasswordReset} = require('../models');

const registerUser = async (email, password, username, fullName) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
        email_id: email,
        password_hash: hashedPassword,
        username: username,
        full_name: fullName,
    });
    return newUser;
};

const findUserByEmail = async (email) => {
    const user = await User.findOne({where: {email_id: email}});
    return user;
}

const createPasswordResetToken = async (email) => {
    const user = await findUserByEmail(email);
    if(!user){
        return null;
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    const hashedToken = await bcrypt.hash(resetToken, 10);

    await PasswordReset.create({
        _id: user._id,
        reset_token: hashedToken,
        expires_at: Date.now() + 3600000,
    });

    return resetToken;
};

const resetUserPassword = async (token, newPassword) => {
    const hashedToken = await bcrypt.hash(token, 10);
    const resetRecord = await PasswordReset.findOne({where: {reset_token: hashedToken, used: false}});

    if(!resetRecord || resetRecord.expires_at < Date.now(){
        return false;
    });

    const user = await User.findByPk(resetRecord._id);
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await user.update({password_hash: hashedPassword});
    await resetRecord.update({used: true});

    return true;

}



module.exports = {
    registerUser,
    findUserByEmail,
    createPasswordResetToken,
    resetUserPassword,
};