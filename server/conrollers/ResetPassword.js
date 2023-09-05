const User = require("../models/User")
const bcrypt = require("bcrypt")
const mailSender = require("../utils/mailSender")

// resetpassword token
exports.resetPasswordToken = async (req , res ) => {
    try{
        // get email from req body
        const {email } = req.body
        // check user is regestered or not , email validatin
        const user = await User.findOne({email})
        if(!user){
            return res.status(401).json({
                success:false,
                message:"user not registered please signup first"
            })
        }
        // generate token
        const token = crypto.randomUUID();
        // update user by adding token and expiration time
        const updatedDetails = await User.findOneAndUpdate({email:email},
            {
                token:token,
                resetPasswordExpires:Date.now() + 5*60*1000,
            },
            {new:true},)
        // create url 
        const url = `https://localhost:3000/update-password/${token}`;
        // send mail containing the url
        await mailSender(email , "Password reset link" ,`Password reset link ${url}`)
        // return response
        return res.status(200).json({
            success: true,
            message:" reset mail sent successfully"
        })
    }
    catch(error){
        console.log(error)
        return res.status(401).json({
            success: false,
            message:"error while sending mail"
        })
    }
}

// reset password
exports.resetPassword = async (req , res ) => {
    try{
        // fetch data
        const {password , confirmPassword , token } = req.body
        // validate data
        if(!password || !confirmPassword){
            return res.status(401).json({
                success: false,
                message:"Password fiels are empty please write valid password"
            })
        }
        if(password !== confirmPassword){
            return res.status(401).json({
                success: false,
                message:"password and confirm password are not the same"
            })
        }
        // get user details from db by token
        const userDetails = await User.findOne({token:token})
        // if token not found in db then invalid token or token expires
        if(!userDetails){
            return res.status(401).json({
                success: false,
                message:"token is invalid"
            })
        }
        // token time check 
        if(userDetails.resetPasswordExpires < Date.now()){
            return res.status(401).json({
                success: false,
                message:"Token has expired please regenerate reset link"
            })
        }
        // hashed password
        const hashedPassword = await bcrypt.hash(password , 10);
        // update password in db
        await User.findOneAndUpdate({token},
            {
                password: hashedPassword,
            },
            {new:true},)
        // return response
        return res.status(200).json({
            success: true,
            message:"Password reset successfully",
        })
    }
    catch(error){
        return res.status(400).json({
            success: false,
            message:""
        })
    }
}