import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger'
import { promiseMiddleware, localStorageMiddleware } from './middleware';
import reducer from './reducer';

const getMiddleware = () => {
    if (process.env.NODE_ENV === 'production') {
        return applyMiddleware(promiseMiddleware, localStorageMiddleware);
    } else {
        // Enable additional logging in non-production environments.
        return applyMiddleware(promiseMiddleware, localStorageMiddleware, logger)
    }
}

const initialState = { auth: {} };

const store = createStore(reducer, initialState, getMiddleware(), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

export default store;
