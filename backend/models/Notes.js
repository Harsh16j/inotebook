const mongoose=require("mongoose");
const { Schema } = mongoose;

// Defining schema for Notes
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
        default:Date.now //Don't write the funcion i.e. don't write Date.now(), only the name of the function is needed
    }
  });

  module.exports=mongoose.model("Notes",NotesSchema);