import { fetchTodos } from "./todos"

export const SET_SERVER_ERROR = 'SET_SERVER_ERROR'

function updateServerStatus(serverError){
  return {
    type: SET_SERVER_ERROR,
    serverError
  }
}

export function setServerError(serverError) {
  return function (dispatch){
    if (!serverError){
      dispatch(fetchTodos())
    }
    dispatch(updateServerStatus(serverError))
  }
}