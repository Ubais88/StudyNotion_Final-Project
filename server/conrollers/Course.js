const Course = require("../models/Course");
const Tag = require("../models/Tags")
const User = require("../models/User")
const {uploadImageToCloudinary} = require("../utils/imageUploader")


// create course handler function
exports.createCourse = async (req , res) => {
    try{
        //  fetch all data
        const {courseName , courseDescription , whatYouWillLearn , price , tag} = req.body;

        // get thumbnail
        const thumbnail = req.files.thumbnailImage;
        // validation
        if(!courseName || !courseDescription || !whatYouWillLearn || !price || !tag || !thumbnail){
            return res.status(400).json({
                success: false,
                message:"All fields are required please try again"
            })
        }
        
        // check for instructor
        const userId = req.user.id;
        const instructorDetails = await User.findOne({userId});
        console.log("instructor details ",instructorDetails);
        if(!instructorDetails){
            return res.status(404).json({
                success:false,
                message: "Instructor Details not found"
            })
        }


        // check tag is valid or not
        const tagDetails = await Tag.findById({tag})
        if(!tagDetails){
            return res.status(404).json({
                success:false,
                message: "Tag Details not found"
            })
        }

        // upload image to cloudinary
        const thumbnailImage = await uploadImageToCloudinary(thumbnail , process.env.FOLDER_NAME)


        // create entry for new COURSE
        const newCourse = await Course.create({
            courseName,
            courseDescription,
            instructor:instructorDetails._id,
            whatYouWillLearn,
            price,
            tag:tagDetails._id,
            thumbnail:thumbnailImage.secure_url,
        })

        // add the new course to the users schema of instructor
        await User.findByIdAndUpdate({id:instructorDetails._id},{
            $push:{
                course: newCourse._id,
            },
        },
        {new:true},
        )

        // update the tag schema



        // return response

        return res.status(200).json({
            success:true,
            message: "Course Created Successfully",
            data:newCourse,
        })
    }
    catch(error){
        return res.status(404).json({
            success:false,
            message: "Something went wrong while creating the course",
        })
    }
}


// get all cources handler function

exports.getAllCourses = async (req , res ) => {
    try{
        const allCourses = await find({},
            {
                courseName:true,
                price:true,
                thumbnail:true,
                instructor:true,
                ratingAndReview:true,
                studentEnrolled:true,})
                .populate("instructor")
                .exec();

        return res.status(200).json({
            success:success,
            message: "Data for all courses fetch successfully",
            data:allCourses,
        })
    }
    catch(err){
        return res.status(404).json({
            success:false,
            message: "Problem in getting all Courses",
            error:error.message,
        })
    }
}
