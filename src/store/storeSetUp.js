import {configureStore,combineReducers} from '@reduxjs/toolkit'
import { applyMiddleware } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import userReducer from '../reducers/userReducer'

const reducers = combineReducers({
    user : userReducer
})
const storeSetUp = () => 
{
    const store = configureStore(({
        reducer : reducers
    }),applyMiddleware(thunk))
    return store

}
export default storeSetUp