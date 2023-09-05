const mongoose = require("mongoose");

const sectionSchema = new mongoose.Schema({
    sectioName:{
        type:String,
    },
    subSection:[
        {
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:"subSection",
        },
    ]
})

module.exports = mongoose.model("Section" , sectionSchema)