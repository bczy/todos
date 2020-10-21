import { Card, Container, Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import Todo from './Todo';

const Todos = (todos) => {
  return (
    <Container>
      <Card border="light">
        <Card.Body>
          <Card.Title>Todo list</Card.Title>
          <Table striped bordered hover>
            <thead>
              <tr>
                <td>Title</td>
                <td>Description</td>
                <td>Actions</td>
              </tr>
            </thead>
            <tbody>
              {todos.isFetching ?
                <tr><td colSpan={3}>Loading</td></tr> 
                : todos.items.length > 0 ? 
                  todos.items.map((todo,i) => <Todo key={i} {...todo}/>)
                  : <tr><td colSpan={3}>Nothing to do :O</td></tr> 
              }
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
)}

function mapStateToProps(state) {
  const { todos } = state;
  const { isFetching, lastUpdated, items } = todos || {
    isFetching: true,
    todos: []
  }

  return {
      isFetching, lastUpdated, items 
  }
}


export default connect(mapStateToProps)(Todos)