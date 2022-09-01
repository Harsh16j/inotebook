import NoteContext from "./noteContext";
import { useState } from "react";
const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);

  // Get all notes
  const getNotes = async () => {
    //Fetching notes from the the backend
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJmYzhjMjBlNDQyMzA5N2Y4MWJhYzAxIn0sImlhdCI6MTY2MDcxODE2N30.lW1bBEQ6p6A0w24P_I5W3IlGoxe40JXedu-Hj9Oqzrw",
      },
    });
    const json = await response.json(); // response from the backend
    setNotes(json);
  };

  //Add a Note
  const addNote = async (title, description, tag) => {
    //Adding data to the backend
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJmYzhjMjBlNDQyMzA5N2Y4MWJhYzAxIn0sImlhdCI6MTY2MDcxODE2N30.lW1bBEQ6p6A0w24P_I5W3IlGoxe40JXedu-Hj9Oqzrw",
      },
      body: JSON.stringify({ title, description, tag }), // body data type must match "Content-Type" header
    });
    const json =await response.json(); // response from the backend
    setNotes(notes.concat(json));
  };
  //Delete a Note
  const deleteNote = (_id) => {
    // TODO API CALL
    const newNotes = notes.filter((note) => {
      return note._id !== _id;
    });
    setNotes(newNotes);
    console.log("Note deleted of id:" + _id);
  };
  //Edit a Note
  const editNote = async (id, title, description, tag) => {
    //Fetching data from the backend
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJmYzhjMjBlNDQyMzA5N2Y4MWJhYzAxIn0sImlhdCI6MTY2MDcxODE2N30.lW1bBEQ6p6A0w24P_I5W3IlGoxe40JXedu-Hj9Oqzrw",
      },
      body: JSON.stringify({ title, description, tag }), // body data type must match "Content-Type" header
    });
    const json = response.json(); // response from the backend
    // Logic to edit in client
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
        break;
      }
    }
  };
  return (
    <NoteContext.Provider
      value={{ notes, setNotes, addNote, deleteNote, editNote, getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
