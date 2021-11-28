import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import usersReducer from "./reducers/users";

let reducers = combineReducers({
    users: usersReducer
})
const store = createStore(reducers, applyMiddleware(thunk))

window.store = store;

export default store
