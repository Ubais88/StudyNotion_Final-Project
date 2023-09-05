const nodemailer = require('nodemailer');
require('dotenv').config();


const mailSender = async(email , title , body) => {
    try{
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST ,
            auth: {
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS,
            },
        })

        let info = await transporter.sendMail({
            from:"StudyNotion || Created By Ubais",
            to:`${email}`,
            subject:`${title}`,
            html:`${body}`
        });
        console.log(info);
        return info;
    }
    catch(e){
        console.log("Error While Sending Email")
        console.log(e);
    }
}

module.exports = mailSender;