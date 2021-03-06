import { applyMiddleware, createStore } from 'redux';
// import logger from 'redux-logger'
import { promiseMiddleware, localStorageMiddleware } from './middleware';
import reducer from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension';

const getMiddleware = () => {
    if (process.env.NODE_ENV === 'production') {
        return applyMiddleware(promiseMiddleware, localStorageMiddleware);
    } else {
        // Enable additional logging in non-production environments.
        // return composeWithDevTools(applyMiddleware(promiseMiddleware, localStorageMiddleware, logger));
        return composeWithDevTools(applyMiddleware(promiseMiddleware, localStorageMiddleware));
    }
}

// const initialState = { auth: {
// } };

//const store = createStore(reducer, initialState, getMiddleware());
const store = createStore(reducer, getMiddleware());

export default store;
