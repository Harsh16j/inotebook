const mongoose=require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        // unique:true //We will manually check it
    },
    password:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now,
    }
  });
const User=mongoose.model("user",userSchema);
// User.createIndexes(); //We will manually check indexes
module.exports=User;