const User = require("../models/User")
const OTP = require("../models/OTP")
const otpGenerator = require("otp-generator")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config();

// send otp
exports.sendOTP = async(req , res) => {
    try{
        // fetch email from req. body
        const {email} = req.body;

        // check user is regestered or not
        const checkUserPresent = await User.findOne({email: email});

        // if user exits means regestered
        if(checkUserPresent){
            return res.status(401).json({
                success:false,
                message:"This Email is Already Registered",
            })
        }
        // generate otp
        var otp = otpGenerator.generate(6, {
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false,
        });
        console.log("otp gernerate", otp)

        // chekc uniqueotp or not
        const result = await OTP.findOne({otp:otp});

        if(result){
            otp = otpGenerator.generate(6, {
                upperCaseAlphabets:false,
                lowerCaseAlphabets:false,
                specialChars:false,
            });
            const result = await OTP.findOne({otp:otp});
        }

        const otpPayload = {email , otp };

        // create an entry in db for otp
        const otpBody = await otp.create(otpPayload);
        console.log(otpBody);

        // return 
        res.status(200).json({
            success: true,
            message:"OTP send Successfully"
        })

    }

    catch(e){
        console.log("Error while generating otp mail to send")
        console.error(e);
    }

};


// signup

exports.SignUp = async (req, res) => {
    try{
            // data fetch from req body
        const {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            accountType,
            contactNumber,
            otp,
        } =  req.body;

        // data validate
        if(!firstName || !lastName || !email || !password || !confirmPassword || otp) {
            return res.status(403).json({
                success:false,
                meassage:"All Field are required",

            })
        }
        // 2 password match (pass == conform )
        if(password !== confirmPassword){
            return res.status(400).json({
                success:false,
                meassage:"Password and ConfirmPassword are not match",
            })
        }

        // check user registered or not
        const existingUser = await User.findOne({email:email});
        if(existingUser){
            return res.status(400).json({
                success:false,
                message:"Email is already registered"
            })
        }
        // fetch most recent otp 
        const recentOtp = await OTP.findOne({email}).sort({createdAt:-1}).limit(1);
        console.log("recentotp from Db: ",recentOtp)

        // validate otp 
        if(recentOtp.length < 6){
            return res.status(400).json({
                success:false,
                message:"length of OTP is short"
            })
        } 
        else if(otp !== recentOtp){
            // invalid otp
            return res.status(400).json({
                success:false,
                message:"Invalid otp/not matched otp"
            })
        }
        // hashed password
        const hashedPassword = await bcrypt.hash(password , 10);

        // create entry in db
        const profileDetails = await Profile.create({
            gender:null,
            dateOfBirth:null,
            about:null,
            contactNumber:null,

        });

        const user = await User.create({
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            contactNumber,
            accountType,
            additionalDetails:profileDetails._id,
            image:`https://api.dicebear.com/5.x/initials/svg?seed=${firstname} ${lastname}`,
        })
        
        // return res
        return res.status(200).json({
            success: true,
            message:"signup successfully",
            user,
        })
        
    }   
    
    catch(error){
        console.log("error while signup");
        console.error(error);
        return res.status(500).json({
            success: false,
            message:"signup failed try again"
        })
    }
}


// login
exports.login = async (req , res) => {
    try{
        //  get data from req body
        const {email , password} = req.body
        // validation of data        
        if(!email || !password){
            return res.status(403).json({
                success: false,
                message: 'fill all field carefully try again'
            })
        }
        // user is registered or not
        const user = await User.findOne({email:email}).populate("additionalDetails");
        if(!user){
            return res.status(401).json({
                success:false,
                message: "user is not registered please signup first"
            })
        }
        // genrate JWT token ,after matched password
        if(await bcrypt.compare(password , user.password)){
            const payload = {
                email : user.email,
                id: user._id,
                accountType:user.accountType,
            }
            const token = jwt.sign(payload , process.env.JWT_SECRET , {
                expiresIn:"2hr",
            });
            user.token = token;
            user.password = undefined;

            // create cookie and send res
            const options = {
                expires:new Date(Date.now() + 3*24*60*60*1000),
                httpOnly:true,
            }
            res.cookie("token" , token , options).status(200).json({
                success: true,
                token,
                user,
                message:"logged in successfully"
            })

        }
        else{
            return res.status(401).json({
                success:false,
                message:"password is incorrect"
            })
        }
    }

    catch(error){
        console.log("error while login")
        conslo.error(error)
        return res.status(500).json({
            success:false,
            message:"login failure try again"
        })
    }
}

// change password
exports.changePassword = async (req , res ) => {
    try{ 
        // fetch data from req body
        const userDetails = await User.findById(req.user.id);

        // get old password , new password , conform new password
        const { oldPassword, newPassword  , confirmPassword} = req.body;

        // validation 
        const isPasswordMatch = await bcrypt.compare(
            oldPassword,
            userDetails.password,
        );

        if(!isPasswordMatch){
            // If old password does not match, return a 401 (Unauthorized) error
            return res.status(401).json({
                success:false,
                message: "The password is incorrect"
            })
        }

        if(newPassword !== confirmPassword){
            return res.status(401).json({
                success:false,
                message: "Password not match"
            })
        }

        // update password wtih new password
        const encryptedPassword = await bcrypt.hash(newPassword , 10);
        const updateUserDetails = await User.findByIdAndUpdate(
            req.user.id,
            { password: encryptedPassword},
            {new:true},
        );

        // sendmail password updated mail

            // left tod



        // return response
        return res.status(200).json(
            { 
                success: true, 
                message: "Password updated successfully" 
            });
	}

    catch(error){
        // If there's an error updating the password, log the error and return a 500 (Internal Server Error) error
		console.error("Error occurred while updating password:", error);
		return res.status(500).json({
			success: false,
			message: "Error occurred while updating password",
			error: error.message,
		});
    }
}