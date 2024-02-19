/**
 * @file profileAction.ts
 * @author Ashish Chauhan
 */

import { CHANGE_PASSWORD, DELETE_USER, PRIVACY_POLICY, TERMS_CONDITIONS, UPLOAD_IMAGE } from "./actionTypes";

export const privacyPolicyAction = (success: (res: any) => void) => {
    return {
        type: PRIVACY_POLICY,
        success
    };
};

export const termsAction = (success: (res: any) => void) => {
    return {
        type: TERMS_CONDITIONS,
        success
    };
};

export const uploadImageAction = (params: any, success: (res: any) => void) => {
    return {
        type: UPLOAD_IMAGE,
        params,
        success
    };
};

export const changePasswordAction = (params: any, success: (res: any) => void) => {
    return {
        type: CHANGE_PASSWORD,
        params,
        success
    };
};

export const deleteUserAction = (success: (res: any) => void) => {
    return {
        type: DELETE_USER,
        success
    };
};