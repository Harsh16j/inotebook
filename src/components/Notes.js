import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";
import NoteContext from "../context/notes/noteContext";
import NoteItem from "./NoteItem";
import Row from 'react-bootstrap/Row';
const Notes = () => {
  const context = useContext(NoteContext);
  const { notes, setNotes } = context;
  return (
    <Row className="my-3">
      <h2>Your Notes</h2>
      {notes.map((note) => {
        return <NoteItem note={note}/>;
      })}
    </Row>
  );
};

export default Notes;