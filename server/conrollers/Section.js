const Section = require("../models/Section")
const Course = require("../models/Course")


exports.createSection = async (req, res) => {
    try{
        // data fetch
        const {sectionName , courseId} = req.body;

        // do validation on data
        if(!sectionName || !courseId){
            return res.status(401).json({
                success: false,
                message:"enter valid section"
            })
        }

        // create section
        const newSection = await Section.create({sectionName})

        // update course and add new section
        const updatedCourseDetails = await Course.findByIdAndUpdate(courseId,
                                {
                                    $push:{
                                        courseContent: newSection._id
                                    },           
                                },
                                {new:true})
        // use populate to replace section subsetion in the updatedCourseDetails





        // return response
        return res.status(200).json({
            success:true,
            message: 'Course section created successfully',
            updatedCourseDetails,
        })

    }
    catch(error){
        return res.status(403).json({
            success:false,
            message: 'Error while creating course section',
        })
    }
}

// update section
exports.updateSection = async (req, res) => {
    try{
        // data to update
        const { sectionName, sectionId} = req.body;

        // data validation
        if(!sectionName || !sectionId){
            return res.status(403).json({
                success:false,
                message: 'missing properties',
            })
        }

        // update data
        const section = await Section.findByIdAndUpdate({sectionId},
            {sectionName},{new:true},)

        // return response
        return res.status(200).json({
            success:true,
            message: 'Section updated successfully',
        })
    }
    catch(error){
        return res.status(403).json({
            success:false,
            message: 'Error while updating course section',
        })
    }
}

// delete section
exports.deleteSection = async (req, res) => {
    try{
        // get section id - assuming id we are sending in params
        const sectionId = req.params

        // delete section by finding by id
        await Section.findByIdAndDelete({sectionId: sectionId})
        // -----Todo-----need to delete entry from course schema ?

        // return response
        return res.status(200).json({
            success:success,
            message: 'Section deleted successfully',
        })
    }
    catch(error){
        return res.status(403).json({
            success:false,
            message: 'unable to delete section please try again',
            error: error.message,
        })
    }
}