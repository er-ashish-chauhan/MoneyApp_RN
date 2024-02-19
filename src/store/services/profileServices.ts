/**
 * @file profileServices.ts
 * @author Ashish Chauhan
 */

import { endpoints } from "../../constants";
import { deleteRequest, getRequest, postRequest } from "../../libs/Api";

export const privacyPolicyService = async () => {
    return getRequest({
        API: `${endpoints.privacy}`,
    });
};

export const termsConditionsService = async () => {
    return getRequest({
        API: `${endpoints.terms}`,
    });
};

export const uploadImageService = async (params: any) => {
    return postRequest({
        API: `${endpoints.uploadMedia}`,
        data: params
    });
};

export const changePasswordService = async (params: any) => {
    return postRequest({
        API: `${endpoints.changePassword}`,
        data: params
    });
};

export const deleteUserService = async () => {
    return deleteRequest({
        API: `${endpoints.deleteAccount}`,
    });
};