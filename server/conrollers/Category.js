const Category = require("../models/Tags")


// create tag ka handler function

exports.createCategory = async (req , res ) => {
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
        const CategorysDetails = await Category.create({
            name: name,
            description: description,
        })

        console.log(CategorysDetails)

        // return res
        return res.status(200).json({
            success:true,
            message:"Category created successfully",
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

exports.showAllCategories = async (req, res) => {
    try{
        const allCategorys = await Category.find({},{
            name:true,
            description:true,
        })
        return res.status(200).json({
            success:true,
            message:"All tags returned successfully",
            allCategorys, 
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}