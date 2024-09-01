const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
    },
});

const sendPasswordResetEmail = (email, token) => {
    const resetUrl = `https://yourfrontend.com/reset-password?token=${token}`;

    const mailOptions =  {
        from: 'shubtesting45@gmail.com',
        to: email,
        subject: 'Password Reset Request',
        text: `You have requested to reset your password.\nPlease click the link below: ${resetUrl}`,
    };

    return transporter.sendMail(mailOptions);
};

module.exports = sendPasswordResetEmail;