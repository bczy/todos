
import {
  REQUEST_TODOS,
  RECEIVE_TODOS,
  DELETE_TODO,
  COMPLETE_TODO,
  REQUEST_ADD_TODO,
  RECEIVE_TODO
} from '../actions/todos'

function todos(
  state = {
    isFetching: false,
    didInvalidate: false,
    isSubmitting: false,
    items: [],
  },
  action
) {
  switch (action.type) {
    case REQUEST_TODOS:
      return  {...state, 
        isFetching: true,
      }
      case RECEIVE_TODOS:
        return {...state,
          isFetching: false,
          items: action.todos,
        }
      case DELETE_TODO:
        return {...state,
          isFetching: false,
          items: action.todos.filter(todo => todo._id !== action._id),
        }
      case COMPLETE_TODO:
        const { _id, completion, todos} = action
        return { ...state, items: 
          todos.map(item => item._id === _id ? 
            {...item,done: completion} : item)
        }
        case REQUEST_ADD_TODO:
          return { ...state, isSubmitting: true}
          case RECEIVE_TODO:
            return { ...state, isSubmitting: false, items: [...action.todos,action.todo]}
    default:
      return state
  }
}

export default todos