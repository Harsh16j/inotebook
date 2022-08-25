import React,{useContext} from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import noteContext from "../context/notes/noteContext";
import NoteContext from "../context/notes/noteContext";
const Home = () => {
  const context=useContext(NoteContext);
  const {notes,setNotes}=context;
  return (
    <div>
      <div className="my-3">
        <h2>Add a Note</h2>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
      <div className="my-3">
        <h2>Your Notes</h2>
        {notes.map((note)=>{
          return note.title;
        })}
      </div>
    </div>
  );
};

export default Home;
