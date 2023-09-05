const mongoose = require("mongoose");
const mailSender = require("../utils/MailSender");

const OTPSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
    otp:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        expires:5*60,
    },
})


// function to send email

async function sendVerificationEmail(email , otp){
    try{
        const mailResponse = await mailSender(email , "Verification Email from StudyNotion" , otp)
        console.log("mail send ", mailResponse);
    }
    catch(error){
        console.log("error while sending verification email")
        console.error(error);
    }
}

// pre middleware

OTPSchema.pre("save" , async function(next) {
    await sendVerificationEmail(this.email , this.otp )
    next();
})



module.exports = mongoose.model("OTP" , OTPSchema) 