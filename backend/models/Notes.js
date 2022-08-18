const mongoose=require("mongoose");
const { Schema } = mongoose;

const NotesSchema = new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId, // Foreign key 
        ref:'user' // Name of the model that was exported from User.js
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    tag:{
        type:String,
        default:"General"
    },
    date:{
        type:Date,
        default:Date.now
    }
  });

  module.exports=mongoose.model("Notes",NotesSchema);