
export const REQUEST_TODOS = 'REQUEST_TODOS'
function requestTodos(user) {
  return {
    type: REQUEST_TODOS,
    user
  }
}

export const RECEIVE_TODOS = 'RECEIVE_TODOS'
function receiveTodos(user, todos) {
  return {
    type: RECEIVE_TODOS,
    todos,
    user,
    receivedAt: Date.now()
  }
}
// TODO: implement user authentication
export const INVALIDATE_USER = 'INVALIDATE_USER'
export function invalidateUser(user) {
  return {
    type: INVALIDATE_USER,
    user
  }
}

export const DELETE_TODO = 'DELETE_TODO'
export function deleteTodo(_id, todos) {
  return {
    type: DELETE_TODO,
    _id,
    todos,
  }
}

export const ADD_TODO = 'ADD_TODO'
export function addTodo(todo, todos) {
  return {
    type: ADD_TODO,
    todo,
    todos,
  }
}

export const COMPLETE_TODO = 'COMPLETE_TODO'
export function todoCompletion(_id, completion, todos) {
  return {
    type: COMPLETE_TODO,
    _id,
    completion,
    todos,
  }
}

export function fetchAddTodo(todo, todos){
  return function (dispatch){
    return fetch('http://localhost:3000/api/todos', {
      method: 'post',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(todo)
      })
      .then(res => res.json())
      .then(json => dispatch(addTodo({...todo, _id: json.insertedId}, todos)))
    }
}

export function fetchTodoCompletion(_id, completion, todos){
  return function (dispatch) {
    return fetch(`http://localhost:3000/api/todo/${_id}`, {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ _id, done: completion})
        }).then(_ => dispatch(todoCompletion(_id, completion, todos)))
      }
}

export function fetchDeleteTodo(_id, todos) {
  return function (dispatch) {
    return fetch(`http://localhost:3000/api/todo/${_id}`, { method: 'DELETE'})
      .then(_ =>
        dispatch(deleteTodo(_id, todos))
      )
  }
}

export function fetchTodos(user) {
  return function (dispatch) {
    dispatch(requestTodos(user))
    return fetch(`http://localhost:3000/api/todos/`)
      .then(
        response => response.json()
        // Do not use catch, because errors occured during rendering
        // should be handled by React Error Boundaries
        // https://reactjs.org/docs/error-boundaries.html
      )
      .then(todos =>
        dispatch(receiveTodos(user, todos))
      )
  }
}