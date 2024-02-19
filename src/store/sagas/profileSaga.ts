/**
 * 
 * @file profileSaga.ts
 * @author Ashish Chauhan
 */

import { call, put, takeLatest } from "redux-saga/effects";
import { startLoading, stopLoading } from "../actions/loginAction";
import { changePasswordService, deleteUserService, privacyPolicyService, termsConditionsService, uploadImageService } from "../services/profileServices";
import { CHANGE_PASSWORD, DELETE_USER, LOGIN_SUCCESS, PRIVACY_POLICY, TERMS_CONDITIONS, UPLOAD_IMAGE } from "../actions/actionTypes";
import translations from "../../locals";
import { clearStorage, showToast } from "../../utils/utility";
import { ToastType } from "../../constants/types";
import { setContentType } from "../../libs/Api";
import { CONTENT_TYPE, CONTENT_TYPE_FORMDATA } from "../../libs/AxiosConfig";

function* privacyPolicySaga(action: any): any {
    try {
        yield put(startLoading());
        const { data = {} } = yield call(privacyPolicyService);
        console.log("privacyPolicy result...", JSON.stringify(data, null, 1));
        if (data?.statusCode) {
            action.success(data);
            return;
        }
        showToast(translations.API_ERROR_MESSAGE, ToastType.ERROR);
    }
    catch (error) {
        console.log("error >>", error);
    }
    finally {
        yield put(stopLoading());
    }
}

function* termsConditionsSaga(action: any): any {
    try {
        yield put(startLoading());
        const { data = {} } = yield call(termsConditionsService);
        console.log("privacyPolicy result...", JSON.stringify(data, null, 1));
        if (data?.statusCode) {
            action.success(data);
            return;
        }
        showToast(translations.API_ERROR_MESSAGE, ToastType.ERROR);
    }
    catch (error) {
        console.log("error >>", error);
    }
    finally {
        yield put(stopLoading());
    }
}

function* uploadImageSaga(action: any): any {
    try {
        yield put(startLoading());
        yield setContentType(CONTENT_TYPE_FORMDATA);
        const { data = {} } = yield call(uploadImageService, action.params);
        // console.log("image result...", JSON.stringify(data, null, 1));
        yield setContentType(CONTENT_TYPE);
        if (data?.statusCode) {
            showToast(data?.message, ToastType.SUCCESS);
            action.success(data);
            return;
        }
        showToast(translations.API_ERROR_MESSAGE, ToastType.ERROR);
    }
    catch (error) {
        console.log("error >>", error);
    }
    finally {
        yield put(stopLoading());
    }
}

function* changePasswordSaga(action: any): any {
    try {
        yield put(startLoading());
        const { data = {} } = yield call(changePasswordService, action.params);
        console.log("result...", JSON.stringify(data, null, 1));
        if (data?.status) {
            showToast(data?.message, ToastType.SUCCESS);
            action.success(data);
            return;
        }
        showToast(translations.API_ERROR_MESSAGE, ToastType.ERROR);
    }
    catch (error) {
        console.log("error >>", error);
    }
    finally {
        yield put(stopLoading());
    }
}

function* deleteUserSaga(action: any): any {
    try {
        yield put(startLoading());
        const { data = {} } = yield call(deleteUserService);
        console.log("result...", JSON.stringify(data, null, 1));
        if (data?.statusCode) {
            yield clearStorage();
            yield put({ type: LOGIN_SUCCESS, payload: null });
            action.success(data);
            return;
        }
        showToast(translations.API_ERROR_MESSAGE, ToastType.ERROR);
    }
    catch (error) {
        console.log("error >>", error);
    }
    finally {
        yield put(stopLoading());
    }
}

function* watchProfileSaga() {
    yield takeLatest(PRIVACY_POLICY, privacyPolicySaga);
    yield takeLatest(TERMS_CONDITIONS, termsConditionsSaga);
    yield takeLatest(UPLOAD_IMAGE, uploadImageSaga);
    yield takeLatest(CHANGE_PASSWORD, changePasswordSaga);
    yield takeLatest(DELETE_USER, deleteUserSaga);
}

export default watchProfileSaga;