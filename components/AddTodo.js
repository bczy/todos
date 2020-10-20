import React, { useState } from 'react'
import { Button, Card, Col, Container, Form } from 'react-bootstrap'

const AddTodo = () => {
    const [ title, setTitle ] = useState('');
    const [ description, setDescription ] = useState('');

    const handleAddTodo = (e) =>{
        e.preventDefault();
        fetch('http://localhost:3000/api/todos', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, description})
        }).then((res) => res.json())
        .then(data => {console.log("post done", e);})
    }

    return <Container>
        <Card border="light">
          <Card.Body>
            <Card.Title>Add todo</Card.Title>
            <Form method="POST">
                <Form.Row>
                        <Form.Group as={Col} controlId="todo-title">
                            <Form.Label>Title</Form.Label>
                            <Form.Control 
                                required
                                onChange={e => setTitle(e.target.value)} 
                                placeholder="Enter title" />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridPassword">
                            <Form.Label>Description</Form.Label>
                            <Form.Control 
                                onChange={e => setDescription(e.target.value)} 
                                placeholder="Enter description" />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridPassword">
                            <Button variant="primary" type="submit" onClick={handleAddTodo}>
                                Submit
                            </Button>
                        </Form.Group>
                    </Form.Row>
                </Form>
            </Card.Body>
        </Card>
    </Container>
}
export default AddTodo