import { Button } from "react-bootstrap";
const Todo = ({_id, title, description, done}) => {
    const handleDelete = () => {
        fetch(`http://localhost:3000/api/todo/${_id}`, {
            method: 'DELETE',
        }).then((res) => console.log(res))
    }
    const handleCompletion = () => {
        fetch(`http://localhost:3000/api/todo/${_id}`, {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ _id, title, description, done: !done})
        }).then((res) => console.log(res))
    }
    return <tr>
        <td style={done ? { textDecoration: "line-through"} : {}}>{title}</td>
        <td style={done ? { textDecoration: "line-through"} : {}}>{description}</td>
        <td>
            <Button onClick={handleCompletion}>{done ? "Reopen" : "Close"}</Button>
            <Button variant="danger" onClick={handleDelete}>Delete</Button>
        </td>
    </tr>}

export default Todo;