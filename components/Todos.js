import {useEffect, useState} from 'react'
import { Container, Table } from 'react-bootstrap';
import Todo from './Todo';

const Todos = () => {
  const [ todos, setTodos ] = useState([])
    useEffect( () => {
      fetch('http://localhost:3000/api/todos', {
        method: 'get',
      }).then((res) => res.json())
      .then(data => setTodos(data))
    },[]);
  
    return (
      <Container>
        <Table striped bordered hover>
          <thead>
            <tr>
              <td>Title</td>
              <td>Description</td>
              <td>Actions</td>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo,i) => <Todo key={i} {...todo}/>)}
          </tbody>
        </Table>
      </Container>
  )}

export default Todos;