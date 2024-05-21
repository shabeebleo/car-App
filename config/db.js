const mongoose = require("mongoose");
require("dotenv").config();

const uri = process.env.MONGODB_URI;
const connectDb = async () => {
  try {
    await mongoose.connect(uri);
    console.log("connect to Mongo db database");
  } catch (error) {
    console.error;
  }
};

module.exports=connectDb