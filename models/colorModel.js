const mongoose = require("mongoose");
const {Schema}=mongoose

const colorSchema=new Schema({
    color:{
        type:String,
        required :true
    }
})

module.exports=mongoose.model("Color",colorSchema)