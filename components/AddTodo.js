import React, { useState } from 'react'
import { Button, Card, Col, Container, Form } from 'react-bootstrap'
import { connect, useDispatch } from 'react-redux';
import { fetchAddTodo } from '../store/actions';

const AddTodo = ({items}) => {
    const dispatch = useDispatch();
    const [ title, setTitle ] = useState('');
    const [ description, setDescription ] = useState('');

    function handleAddTodo(e){
        e.preventDefault();
        const newTodo = {title, description};
        dispatch(fetchAddTodo(newTodo, items)) 
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


function mapStateToProps(state) {
    const { todos } = state;
    const { items } = todos || {
      isFetching: true,
      todos: []
    }
  
    return {
       items 
    }
  }
  
  
  export default connect(mapStateToProps)(AddTodo)
  