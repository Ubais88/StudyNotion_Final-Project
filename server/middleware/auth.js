const jwt = require("jsonwebtoken")
require("dotenv").config();


exports.auth = (req, res, next) => {
    try {

        // console.log("Body", req.body.token);
        console.log("Cookies", req.cookies.token);
        // console.log("Header", req.header("Authorization").replace("Bearer", " "));

        const token = req.body.token || req.cookies.token || req.header("Authorization").replace("Bearer ", "");

        if(!token || token === undefined) {
            return res.status(401).json({
                success:false,
                message:'Token Missing',
            });
        }
        // verify the token 
        try {
            const payload = jwt.verify(token, process.env.JWT_SECRET);
            // console.log(payload)
            req.user = payload;
        }
        catch (e) {
            return res.status(401).json({
                success: false,
                message: "token is invalid"
            })
        }

        next();
    }
    catch (err) {
        console.log(err)
        return res.status(401).json({
            success: false,
            message: "Something went wrong while verifying token"
        })
    }
}

exports.isStudent = (req, res, next) => {
    try {
        if (req.user.role !== "Student") {
            return res.status(401).json({
                success: false,
                message: "This is a protect route for students you can not access it"
            })
        }
        next();
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: "User Role is not Matching"
        })
    }
}

exports.isAdmin = (req, res, next) => {
    try {
        if (req.user.role !== "Admin") {
            return res.status(401).json({
                success: false,
                message: "This is a protect route for Admins,you can not access it"
            })
        }
        next();
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: "User Role is not Matching"
        })
    }
}