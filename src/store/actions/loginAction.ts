/**
 * @file loginActions.ts
 * @author Ashish Chauhan
 */

import { LoginBody, SignUpBody } from "../../constants/types";
import {
    DO_LOGOUT,
    FORGOT_PASSWORD,
    GET_USER_DETAILS,
    LOGIN, LOGIN_SUCCESS, REGISTRATION,
    START_LOADING, STOP_LOADING,
    STORE_TOKEN,
    USER_AUTHENTICATE
} from "./actionTypes";

export const startLoading = () => {
    return {
        type: START_LOADING
    };
};

export const stopLoading = () => {
    return {
        type: STOP_LOADING
    };
};

export const storeUserData = (payload: any) => {
    return {
        type: LOGIN_SUCCESS,
        payload
    };
};

export const authenticateUser = (payload: any) => {
    return {
        type: USER_AUTHENTICATE,
        payload
    };
};

// ACTION FOR STORE PUSH NOTIFICATION TOKEN
export const storeToken = (token: string) => {
    return async (dispatch: (arg0: { type: string; payload: string; }) => void) => {
        dispatch({
            type: STORE_TOKEN,
            payload: token
        });
    };
};

export const loginUsingEmail = (params: LoginBody) => {
    return {
        type: LOGIN,
        params
    };
};


export const getUserDetails = () => {
    return {
        type: GET_USER_DETAILS,
    };
};

export const registeration = (params: SignUpBody, success: (res: any) => void) => {
    return {
        type: REGISTRATION,
        params,
        success
    };
};


export const forgotPwdRequest = (params: any, success: (res: any) => void) => {
    return {
        type: FORGOT_PASSWORD,
        params,
        success
    };
};

export const logoutUser = () => {
    return {
        type: DO_LOGOUT,
    };
};