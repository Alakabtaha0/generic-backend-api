const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../config.env') });


const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        // TODO: replace `user` and `pass` values from <https://forwardemail.net>
        user: process.env.EMAIL,
        pass: process.env.PASS
    },
});

exports.sendMail = async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({
            status: 'Failed',
            message: 'Please provide your name, email and message.'
        })
    }

    try {
        // send mail with defined transport object
        const info = await transporter.sendMail({
            from: '"Taha Al-Asadi 👻" <hello@taha.engineer>', // sender address
            to: email, // list of receivers
            subject: "Thanks for your email!", // Subject line
            text: `Hi ${name.split(' ')[0]},\n\n\nYou asked: ${message} \n\n\nI'll be sure to get back to you the moment I can! \n\n\nKind Regards, \nTaha Al-Asadi` // plain text body
        });

        console.log("Message sent: %s", info.messageId);

        return res.status(200).json({
            status: 'success',
            message: 'Mail sent successfully'
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 'Failed',
            message: 'Mail not sent'
        })
    } 
    
};