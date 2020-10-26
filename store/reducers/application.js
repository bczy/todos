
import {
    SET_SERVER_ERROR
} from '../actions/application'
  
function application(
  state = {
    serverError: false
  },
  action
) {
  switch (action.type) {
    case SET_SERVER_ERROR:
      return  {...state, 
          serverError: action.serverError
      }
    default:
      return state
  }
}

export default application