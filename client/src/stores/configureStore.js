import { createStore, combineReducers } from 'redux';
import navigation from '../reducers/navigation'
import addFaultReport from '../reducers/addFaultReport'
import serviceCall from '../reducers/serviceCall'

const rootReducer = combineReducers({
    navigation,
    serviceCall,
    addFaultReport
})

const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;
