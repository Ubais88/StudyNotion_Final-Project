const Tag = require("../models/Tags")


// create tag ka handler function

exports.createTag = async (req , res ) => {
    try{
        const {name , description} = req.body;
        // validation
        if(!name || !description){
            return res.status(401).json({
                success:false,
                message:"all fields are required",
            })
        }
        // create enty in db
        const tagDetails = await Tag.create({
            name: name,
            description: description,
        })

        console.log(tagDetails)

        // return res
        return res.status(200).json({
            success:true,
            message:"Tag created successfully",
        })

    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}

// getAllTags

exports.showAlltags = async (req, res) => {
    try{
        const allTags = await Tag.find({},{
            name:true,
            description:true,
        })
        return res.status(200).json({
            success:true,
            message:"All tags returned successfully",
            allTags, 
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}