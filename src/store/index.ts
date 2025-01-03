import { Tuple, configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';
import { rootReducer } from './reducers';
import logger from 'redux-logger';

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();
// mount it on the Store
const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            thunk: false,
            serializableCheck: false,
        }).concat(sagaMiddleware, logger),
    devTools: __DEV__,
});

// Run the saga
sagaMiddleware.run(rootSaga);

export default store;
// render the application