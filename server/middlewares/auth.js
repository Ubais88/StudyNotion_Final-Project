const jwt = reuire("jsonwebtoken")
require("dotenv").config();
const User = require("../models/User")


// auth
exports.auth = async (req, res, next ) => {
    try{
        // extract token
        const value = req.cookies.token || req.body.token || req.header("Authorization").replace("Bearer" , "");
        // if token missing then return
        if(!token){
            return res.status(401).json({
                success:false,
                message:"token is missing"
            })
        }
        // verify token by verify method
        try{
            const decode = jwt.verify(token , process.env.JWT_SECRET)
            console.log(decode);
            req.user = decode;
        }
        catch(e){
            return res.status(401).json({
                success:false,
                message:"token is invalid"
            });
        }
        next();
    }
    catch(error){
        return res.status(401).json({
            success:false,
            message:"something went wrong while validating the token"
        })
    }
}

// isStudent
exports.isStudent = async (req , res, next) => {
    try{
        if(req.user.accountType !== "Student"){
            return res.status(401).json({
                success:false,
                message:"this is the protected route for student only"
            })
        }
        next();
    }
    catch(error){
        return res.status(401).json({
            success:false,
            message:"user role cannot be verified"
        })
    }
}

// isInstructor
exports.isInstructor = async (req , res, next) => {
    try{
        if(req.user.accountType !== "instructor"){
            return res.status(401).json({
                success:false,
                message:"this is the protected route for instructor only"
            })
        }
        next();
    }
    catch(error){
        return res.status(401).json({
            success:false,
            message:"user role cannot be verified"
        })
    }
}

// isAdmin
exports.isAdmin = async (req , res, next) => {
    try{
        if(req.user.accountType !== "Admin"){
            return res.status(401).json({
                success:false,
                message:"this is the protected route for Admin only"
            })
        }
        next();
    }
    catch(error){
        return res.status(401).json({
            success:false,
            message:"user role cannot be verified"
        })
    }
}