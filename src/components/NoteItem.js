import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
const NoteItem = (props) => {
  const {note}=props;
    return ( 
        <Col md={3} className="my-3"> 
   
        <Card>
      <Card.Body>
        <Card.Title>{note.title}</Card.Title>
        <Card.Text>
        {note.description}
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
    </Col>
  )
}

export default NoteItem