const SubSection = require("../models/SubSection")
const Section = require("../models/Section");
const { uploadImageToCloudinary } = require("../utils/imageUploader");


// create a new SubSection
exports.createSubSection = async(req , res ) => {
    try{
        // fetch data from req.body
        const { title, description , timeDuration , sectionId} = req.body;

        // extract file/video
        const video = req.files.videoFile

        // validation on fetch data
        if(!title || !description || !timeDuration || !video){
            return res.status(401).json({
                success:false,
                message:"All Fields are required",
            });
        }

        // upload video to cloudinary and fetch secure url
        const uploadDetails = await uploadImageToCloudinary(video , process.env.FOLDER_NAME);

        // create subsection
        const SubSectionDetails = await SubSection.create({
            title: title,
            timeDuration: timeDuration,
            description: description,
            videoUrl:uploadDetails.secure_url,
        })
        // push id of subsetion in section
         const updateSection = await Section.findByIdAndUpdate({_id:sectionId},
                                {
                                    $push:SubSectionDetails._id,
                                },
                                {new:true})
        // log updated setion here, after adding populate query

        // return response 
        return res.status(200).json({
            success:true,
            message:"SubSection created successfully",
            updateSection,
        });

    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Something went wrong while creating subsection",
        });
    }
}

// update subsection
exports.updateSubSection = async (req,res) => {

	try {
		// Extract necessary information from the request body
		const { SubsectionId, title , description,courseId } = req.body;
		const video = req?.files?.videoFile;

		
		let uploadDetails = null;
		// Upload the video file to Cloudinary
		if(video){
		 uploadDetails = await uploadImageToCloudinary(
			video,
			process.env.FOLDER_VIDEO
		);
		}

		// Create a new sub-section with the necessary information
		const SubSectionDetails = await SubSection.findByIdAndUpdate({_id:SubsectionId},{
			title: title || SubSection.title,
			// timeDuration: timeDuration,
			description: description || SubSection.description,
			videoUrl: uploadDetails?.secure_url || SubSection.videoUrl,
		},{ new: true });

		
		const updatedCourse = await Course.findById(courseId).populate({ path: "courseContent", populate: { path: "subSection" } }).exec();
		// Return the updated section in the response
		return res.status(200).json({ 
            success: true, 
            data: updatedCourse 
        });
	} 
    catch (error) {
		// Handle any errors that may occur during the process
		console.error("Error creating new sub-section:", error);
		return res.status(500).json({
			success: false,
			message: "Internal server error",
			error: error.message,
		});
	}

}

// delete subsection
exports.deleteSubSection = async(req, res) => {

	try {
		const {subSectionId,courseId} = req.body;
		const sectionId = req.body.sectionId;
	if(!subSectionId || !sectionId){
		return res.status(404).json({
            success: false,
            message: "all fields are required",
        });
	}
	const ifsubSection = await SubSection.findById({_id:subSectionId});
	const ifsection= await Section.findById({_id:sectionId});
	if(!ifsubSection){
		return res.status(404).json({
            success: false,
            message: "Sub-section not found",
        });
	}
	if(!ifsection){
		return res.status(404).json({
            success: false,
            message: "Section not found",
        });
    }
	await SubSection.findByIdAndDelete(subSectionId);
	await Section.findByIdAndUpdate({_id:sectionId},{$pull:{subSection:subSectionId}},{new:true});
	const updatedCourse = await Course.findById(courseId).populate({ path: "courseContent", populate: { path: "subSection" } }).exec();
	return res.status(200).json({ 
        success: true, 
        message: "Sub-section deleted", 
        data: updatedCourse 
    });
		
	} 
    catch (error) {
		// Handle any errors that may occur during the process
        console.error("Error deleting sub-section:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
		
	}
};