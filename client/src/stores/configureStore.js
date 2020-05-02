import { createStore, combineReducers } from 'redux';
import navigation from '../reducers/navigation';
import forms from '../reducers/forms';
import serviceCall from '../reducers/serviceCall';
import filters from '../reducers/filters';

const rootReducer = combineReducers({
    navigation,
    serviceCall,
    forms,
    filters
})

const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;
