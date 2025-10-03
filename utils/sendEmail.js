const    const transporter = nodemailer.createTransporter({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    },
}); er = require('nodemailer');

// Nodemailer
const sendEmail = async (options) => {
    // 1) Create transporter ( service that will send email like "gmail","Mailgun", "mialtrap", sendGrid)
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT, // if secure false port = 587, if true port= 465
        secure: true,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
        },
    });

    // 2) Define email options (like from, to, subject, email content)
    const mailOpts = {
        from: `E-shop App <${process.env.EMAIL_USER}>`,
        to: options.email,
        subject: options.subject,
        text: options.message,
    };

    // 3) Send email
    const result = await transporter.sendMail(mailOpts);
    console.log('Email sent successfully:', result.messageId);
    return result;
};

module.exports = sendEmail;