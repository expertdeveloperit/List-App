import reducers from './reducers';
import thunk from 'redux-thunk';

import { createLogger } from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';


const middleware = applyMiddleware(thunk,createLogger());

const store  = createStore(reducers, middleware);

export default store;