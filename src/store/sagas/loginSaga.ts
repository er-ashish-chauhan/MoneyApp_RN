import { call, put, take, takeLatest } from 'redux-saga/effects'
import { forgotPasswordService, getUserService, loginService } from '../services/loginServices';
import { FORGOT_PASSWORD, GET_USER_DETAILS, LOGIN, LOGIN_SUCCESS, REGISTRATION } from '../actions/actionTypes';
import { LoginBody, SignUpBody, ToastType } from '../../constants/types';
import { showToast, storeDataInStorage } from '../../utils/utility';
import constants from '../../constants';
import { getUserDetails, startLoading, stopLoading } from '../actions/loginAction';
import { signUpService } from '../services/loginServices';
import axiosConfig from '../../libs/AxiosConfig';


function* signinSaga(action: { params: LoginBody; type: string }): any {
    try {
        yield put(startLoading());
        const { data = {} } = yield call(loginService, action.params);
        if (data?.success) {
            storeDataInStorage(constants.USER_ACCESS_TOKEN, JSON.stringify(data.data.token));
            const instance = axiosConfig;
            instance.defaults.headers.common['Authorization'] = `Bearer ${data.data.token}`;
            yield put(getUserDetails());
            showToast(data.message, ToastType.SUCCESS);
            return;
        }
        showToast(data.message, ToastType.ERROR);

    }
    catch (error) {
        console.log("error >>", JSON.stringify(error, null, 1));
    }
    finally {
        yield put(stopLoading());
    }
}


function* signupSaga(action: {
    success(data: any): unknown; params: SignUpBody; type: string
}): any {
    try {
        yield put(startLoading());
        const { data = {} } = yield call(signUpService, action.params);
        console.log(JSON.stringify(data, null, 1), "sign up data")
        if (data?.success) {
            storeDataInStorage(constants.USER_ACCESS_TOKEN, JSON.stringify(data.data.token));
            // axiosConfig.defaults.headers.common['Authorization'] = `${data.data.token}`;
            // yield put(getUserDetails());
            action.success(data.data);
            showToast(data.message, ToastType.SUCCESS);
            return;
        }
        showToast(data.message, ToastType.ERROR);

    }
    catch (error) {
        console.log("error >>", error);
    }
    finally {
        yield put(stopLoading());
    }
}

function* getUserSaga(): any {
    try {
        yield put(startLoading());
        const { data = {} } = yield call(getUserService);
        console.log("getUser result...", JSON.stringify(data, null, 1));
        if (data?.success) {
            yield put({ type: LOGIN_SUCCESS, payload: data.data });
            return;
        }
    }
    catch (error) {
        console.log("get user error >>", error);
    }
    finally {
        yield put(stopLoading());
    }
}

function* forgotPasswordSaga(action: {
    success(data: any): unknown; params: any; type: string
}): any {
    try {
        yield put(startLoading());
        const { data = {} } = yield call(forgotPasswordService, action.params);
        console.log("forgot result...", JSON.stringify(data, null, 1));
        if (data?.status) {
            action.success(data);
            showToast(data.message, ToastType.SUCCESS);
            return;
        }
        showToast(data.message, ToastType.ERROR);

    }
    catch (error) {
        console.log("error >>", error);
    }
    finally {
        yield put(stopLoading());
    }
}


function* watchLoginSaga() {
    yield takeLatest(LOGIN, signinSaga);
    yield takeLatest(REGISTRATION, signupSaga);
    yield takeLatest(GET_USER_DETAILS, getUserSaga);
    yield takeLatest(FORGOT_PASSWORD, forgotPasswordSaga);
}

export default watchLoginSaga;