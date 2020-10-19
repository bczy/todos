import {useEffect, useState} from 'react'

const Todos = () => {
    const [ todos, setTodos ] = useState([])
    useEffect( () => {
      fetch('http://localhost:3000/api/todos', {
        method: 'get',
      }).then((res) => res.json())
      .then(data => {console.log(data);setTodos(data)})
    },[]);
  
    return (
        <div className="flex text-center">
          {todos.map((todo)=> <div><span>{todo.title}</span><span>{todo.description}</span></div>)}
        </div>
  )}

export default Todos;