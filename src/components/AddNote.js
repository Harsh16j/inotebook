import React,{useContext,useState} from 'react'
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import NoteContext from "../context/notes/noteContext";
const AddNote = () => {
    const context = useContext(NoteContext);
  const { addNote } = context;
  const [note, setNote] = useState({title:"",description:"",tag:"default"})
  const handleClick=(e)=>{
    e.preventDefault();
    addNote(note.title,note.description,note.tag);
  }
  const onChange=(e)=>{
    setNote({...note, [e.target.name]:e.target.value} )
  }
  return (
        <div className="my-3">
        <h2>Add a Note</h2>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" placeholder="Enter title" onChange={onChange} name="title"/>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Description</Form.Label>
            <Form.Control type="text" placeholder="Enter description" onChange={onChange} name="description"/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>
          <Button variant="primary" type="submit" onClick={handleClick}>
            Add note
          </Button>
        </Form>
      </div>
  )
}

export default AddNote