import { all } from 'redux-saga/effects';
import watchLoginSaga from './loginSaga';

function* rootSaga() {
    yield all([
        watchLoginSaga
    ])
}

export default rootSaga;