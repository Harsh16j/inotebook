import React, { useContext } from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import noteContext from "../context/notes/noteContext";

const NoteItem = (props) => {
  const { note } = props;
  const context=useContext(noteContext);
  const {deleteNote}=context;
  return (
    <Col md={3} className="my-3">
      <Card>
        <Card.Body>
          <Card.Title className="d-flex align-items-center justify-content-between">
            <div className="titleOfTheCard">
            {note.title}
            </div>
            <div className="d-flex EditAndDeleteButton">
            <i className="fa-solid fa-trash-can mx-2" onClick={()=>{deleteNote(note._id)}}></i>
            <i className="fa-solid fa-pen-to-square mx-2 "></i>
            </div>
          </Card.Title>
          <Card.Text>{note.description}</Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default NoteItem;
