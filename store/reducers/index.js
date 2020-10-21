import { combineReducers } from 'redux'

import todos from './todos'
import application from './application'

const rootReducer = combineReducers({
    todos, application
})

export default rootReducer