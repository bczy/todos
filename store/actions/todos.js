import { StatusCodes } from "http-status-codes"
import { setServerError } from "./application"

export const REQUEST_TODOS = 'REQUEST_TODOS'
function requestTodos() {
  return {
    type: REQUEST_TODOS,
  }
}

export const RECEIVE_TODOS = 'RECEIVE_TODOS'
function receiveTodos(todos) {
  return {
    type: RECEIVE_TODOS,
    todos,
    receivedAt: Date.now()
  }
}

export function fetchTodos() {
  return function (dispatch) {
    dispatch(requestTodos())
    return fetch(`${process.env.NEXT_PUBLIC_API_URL}`)
      .then(async response => {
        if (response.status === StatusCodes.OK){
          const todos = await response.json()
          dispatch(receiveTodos(todos))
        } else {
          dispatch(setServerError(true))
        }
      })
  }
}

export const ADD_TODO = 'ADD_TODO'
function addTodo(todo, todos) {
  return {
    type: ADD_TODO,
    todo,
    todos,
  }
}


export function fetchAddTodo(todo, todos){
  return function (dispatch){
    return fetch(`${process.env.NEXT_PUBLIC_API_URL}`, {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(todo)
      })
      .then(async response => {
        if (response.status === StatusCodes.OK){
          const resJson = await response.json()
          dispatch(addTodo({...todo, _id: resJson.insertedId}, todos))
        } else {
          console.log("muf...",dispatch)
          dispatch(setServerError(true))
        }
      })
    }
}

export const DELETE_TODO = 'DELETE_TODO'
function deleteTodo(_id, todos) {
  return {
    type: DELETE_TODO,
    _id,
    todos,
  }
}

export function fetchDeleteTodo(_id, todos) {
  return function (dispatch) {
    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/${_id}`, { method: 'DELETE'})
      .then(response =>
        {
          if (response.status === StatusCodes.OK){
            dispatch(deleteTodo(_id, todos))
          } else {
            dispatch(setServerError(true))
          }
        }
      )
  }
}

export const COMPLETE_TODO = 'COMPLETE_TODO'
function todoCompletion(_id, completion, todos) {
  return {
    type: COMPLETE_TODO,
    _id,
    completion,
    todos,
  }
}

export function fetchTodoCompletion(_id, completion, todos){
  return function (dispatch) {
    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/${_id}`, {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ _id, done: completion})
      }).then(response => {
        if (response.status === StatusCodes.OK){
          dispatch(todoCompletion(_id, completion, todos))
        } else {
          dispatch(setServerError(true))
        }
      })
    }
}
