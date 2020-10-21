import { Button } from "react-bootstrap";
import { connect, useDispatch } from "react-redux";
import { fetchDeleteTodo, fetchTodoCompletion } from '../store/actions/todos';

const Todo = ({_id, title, description, done, items}) => {
    const dispatch = useDispatch();
    async function handleDelete(){
        dispatch(fetchDeleteTodo(_id, items)) 
    }
    const handleCompletion = () => {
        dispatch(fetchTodoCompletion(_id, !done, items)) 
    }
    return (
        <tr style={ { textDecoration: done ? "line-through" : "none"}}>
            <td >{title}</td>
            <td >{description}</td>
            <td>
                <Button onClick={handleCompletion}>{done ? "Reopen" : "Close"}</Button>
                <Button variant="danger" onClick={handleDelete}>Delete</Button>
            </td>
        </tr>)
}



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
  
  
  export default connect(mapStateToProps)(Todo)