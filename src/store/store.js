
import { combineReducers, legacy_createStore as createStore } from 'redux'

import { toyReducer } from './toy.reducer.js'
import { userReducer } from './user.reducer.js'

const rootReducer = combineReducers({
    toyModule: toyReducer,
    userModule: userReducer
})


export const store = createStore(rootReducer)

// For debug
store.subscribe(() => {
    // console.log('Current state is:', store.getState())
})
