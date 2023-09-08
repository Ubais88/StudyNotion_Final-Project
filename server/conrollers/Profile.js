const Profile = require("../models/Profile")
const User = require("../models/User");

exports.updateProfile = async (req , res) => {
    try{
        // get data
        const { dateOfBirth="", about="" ,contactNumber , gender } = req.body;

        // get userid
        const id = req.user.id;

        // validate data
        if(!contactNumber || !gender || !id){
            return res.status(400).json({
                success: false,
                message:"All field are required"
            })
        }

        // find profile
        const userDetails = await User.findById(id);
        const prfileId = userDetails.additionalDetails;
        const profileDetails = await Profile.findById(prfileId);

        // update profile
        profileDetails.dateOfBirth = dateOfBirth;
        profileDetails.about = about;
        profileDetails.gender = gender;
        profileDetails.contactNumber = contactNumber;
        await profileDetails.save();

        // return res
        return res.status(200).json({
            success: true,
            message:"profile updated succefully",
            profileDetails,
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Something went wrong",
            error:error.message,
        });
    }
}

// delete account function
exports.deleteAccount = async (req, res) => {
    try{
        // get id
        const id = req.user.id;

        // validation
        const userDetails = await User.findById(id)
            if(!userDetails){
                return res.status(404).json({
                    success:false,
                    message:"User not found"
                })
            }

        // user profile delete
        await Profile.findByIdAndDelete({_id:userDetails.additionalDetails});

        // delete enrolled user from all enrolled user
        
        // delete user
        await User.findByIdAndDelete({_id:id})


        // return
        return res.status(200).jason({
            success:true,
            message:"User deleted successfully"
        })
    }
    catch(error){
        return res.status(500).jason({
            success:false,
            message:"Error while deleting user please try again"
        })
    }
}

// fetch all users details
exports.getAllUserDetails = async (req ,res ) => {
    try{
        // get id
        const id = req.user.id;

        // validation and get user details
        const userDetails = await User.findById(id).populate("additionalDetails").exec();

        // return response
        return res.status(200).jason({
            success:true,
            message:"user data fetched successfully"
        })
    }
    catch(error){
        return res.status(500).jason({
            success:false,
            message:"Error while fetch user details please try again",
            error:error.message,
        })
    }
}

