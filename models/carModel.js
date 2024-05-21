const mongoose = require("mongoose");
const {Schema}=mongoose


const carSchema=new Schema({
    arabic_name:{
        type:String,
        required:true
    },
    english_name:{
        type:String,
        required:true
    },
    company:{
        type:String,
        required:true
    },
    model:{
        type:String,
        required:true
    },

    launch_date:{
        type:Date,
        required:true,
        default: new Date()
    },

    year:{
        type:Date, 
        require:true,
        default:new Date().getFullYear()
    },
    color: { type: String, ref: 'Color' },
})

module.exports=mongoose.model("Cars",carSchema)