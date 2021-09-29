import {createStore,compose,applyMiddleware} from 'redux'
import rootReducer from './reducers/rootReducer'
import thunk from 'redux-thunk'

const middleware=[thunk]

const store=createStore(rootReducer,compose(
    applyMiddleware(...middleware)
))

export default store