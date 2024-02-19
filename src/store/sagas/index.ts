import { all, fork } from 'redux-saga/effects';
import watchLoginSaga from './loginSaga';
import watchProfileSaga from './profileSaga';
import watchCategorySaga from './categorySaga';


export function* rootSaga(): any {
    yield all([
        fork(watchLoginSaga),
        fork(watchCategorySaga),
        fork(watchProfileSaga)]);
}

export default rootSaga;