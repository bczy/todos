import { combineReducers } from 'redux'

import {
  REQUEST_TODOS,
  RECEIVE_TODOS,
  DELETE_TODO,
  COMPLETE_TODO,
  ADD_TODO
} from './actions'

function todos(
  state = {
    isFetching: false,
    didInvalidate: false,
    items: []
  },
  action
) {
  switch (action.type) {
    case REQUEST_TODOS:
      return  {...state, 
        isFetching: true,
        didInvalidate: false
      }
      case RECEIVE_TODOS:
        return {...state,
          isFetching: false,
          didInvalidate: false,
          items: action.todos,
          lastUpdated: action.receivedAt
        }
      case DELETE_TODO:
        return {...state,
          isFetching: false,
          didInvalidate: false,
          items: action.todos.filter(todo => todo._id !== action._id),
          lastUpdated: action.receivedAt
        }
      case COMPLETE_TODO:
        const { _id, completion, todos} = action
        return { ...state, items: 
          todos.map(item => item._id === _id ? 
            {...item,done: completion} : item)
        }
      case ADD_TODO:
        return { ...state, items: [...action.todos,action.todo]}
    default:
      return state
  }
}

const rootReducer = combineReducers({
    todos
})

export default rootReducer