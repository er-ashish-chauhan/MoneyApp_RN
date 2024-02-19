/**
 * 
 * @file categorySaga.ts
 * @author Ashish Chauhan
 */

import { call, put, takeLatest } from "redux-saga/effects";
import { startLoading, stopLoading } from "../actions/loginAction";
import translations from "../../locals";
import { showToast } from "../../utils/utility";
import { ToastType } from "../../constants/types";
import { addCategoryNoteService, addCategoryService, deleteCategoryService, getCategoriesService, getCategoryByIdService, updateCategoryService } from "../services/categoryServices";
import { ADD_CATEGORY, ADD_CATEGORY_NOTE, DELETE_CATEGORY, GET_CATEGORIES, GET_CATEGORY_BY_ID, UPDATE_CATEGORY } from "../actions/actionTypes";

function* addCategorySaga(action: any): any {
    try {
        yield put(startLoading());
        const { data = {} } = yield call(addCategoryService, action.params);
        console.log("addCategory result...", JSON.stringify(data, null, 1));
        if (data?.success) {
            showToast(data.message, ToastType.SUCCESS);
            action.success(data.data);
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


function* getCategoriesSaga(action: any): any {
    try {
        yield put(startLoading());
        const { data = {} } = yield call(getCategoriesService, action.params);
        // console.log("getCategory result...", JSON.stringify(data, null, 1));
        if (data?.status) {
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

function* getCategoryByIdSaga(action: any): any {
    try {
        yield put(startLoading());
        const { data = {} } = yield call(getCategoryByIdService, action.params);
        console.log("getCategoryBy result...", JSON.stringify(data, null, 1));
        if (data?.success) {
            action.success(data.data);
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

function* addCategoryNoteSaga(action: any): any {
    try {
        yield put(startLoading());
        const { data = {} } = yield call(addCategoryNoteService, action.params);
        console.log("addCategoryNote result...", JSON.stringify(data, null, 1));
        if (data?.status) {
            showToast(data.message, ToastType.SUCCESS);
            action.success(data.data);
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

function* updateCategorySaga(action: any): any {
    try {
        yield put(startLoading());
        const { data = {} } = yield call(updateCategoryService, action.params);
        console.log("updateCategory result...", JSON.stringify(data, null, 1));
        if (data?.status) {
            showToast(data.message, ToastType.SUCCESS);
            action.success(data.data);
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

function* deleteCategorySaga(action: any): any {
    try {
        yield put(startLoading());
        const { data = {} } = yield call(deleteCategoryService, action.params);
        console.log("deleteCategory result...", JSON.stringify(data, null, 1));
        if (data?.success) {
            showToast(data.message, ToastType.SUCCESS);
            action.success(data.success);
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

function* watchCategorySaga() {
    yield takeLatest(ADD_CATEGORY, addCategorySaga);
    yield takeLatest(GET_CATEGORY_BY_ID, getCategoryByIdSaga);
    yield takeLatest(GET_CATEGORIES, getCategoriesSaga);
    yield takeLatest(ADD_CATEGORY_NOTE, addCategoryNoteSaga);
    yield takeLatest(UPDATE_CATEGORY, updateCategorySaga);
    yield takeLatest(DELETE_CATEGORY, deleteCategorySaga);
}

export default watchCategorySaga;