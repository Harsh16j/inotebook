const express = require("express");
const fetchuser = require("../middleware/fetchuser");
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");
const router = express.Router();
// Route 1: Get all the notes using GET "/api/notes/fetchallnotes". Login required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server errror");
  }
});

// Route 2: Add a new note using POST "/api/notes/addnote". Login required
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter a valid title of minimum length of 3").isLength({
      min: 3,
    }),
    body("description", "Description must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { title, description, tag } = req.body;
      let note = new Notes({ title, description, tag, user: req.user.id });
      const savedNote = await note.save();//Saving the note in the database
      res.json(savedNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server errror");
    }
  }
);

// Route 3: Update an existing note using POST "/api/notes/updatenote/:id". Login required
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  try {
    const { title, description, tag } = req.body;
    const newNote={}
    if(title){
        newNote.title=title;
    }
    if(description){
        newNote.description=description;
    }
    if(tag){
        newNote.tag=tag;
    }

    //Checking if the note belongs to same user 
    let note=await Notes.findById(req.params.id);
    if(!note){
        return res.status(404).send("Not Found");
    }
    if(note.user.toString() !== req.user.id){
        return res.status(401).send("Not Allowed");
    }
    note=await Notes.findByIdAndUpdate(req.params.id,{$set:newNote});//,{new:true});
    res.json(note);
    // Find the note to be updated and update it
    // const note=Notes.findByIdAndUpdate
    // let note = new Notes({ title, description, tag, user: req.user.id });
    // const savedNote = await note.save();
    // res.json(savedNote);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server errror");
  }
});


module.exports = router;
