/**
 * @file loginServices.ts
 * @author Ashish Chauhan
 */

import { endpoints } from "../../constants";
import { LoginBody } from "../../constants/types";
import { getRequest, postRequest } from "../../libs/Api";

export const loginService = async (params: LoginBody) => {
    return postRequest({
        API: `${endpoints.Login}`,
        data: params,
    });
};

export const signUpService = async (params: any) => {
    return postRequest({
        API: `${endpoints.Register}`,
        data: params,
    });
};

export const getUserService = async () => {
    return getRequest({
        API: `${endpoints.UserDetails}`,
    });
};

export const forgotPasswordService = async (params: any) => {
    return postRequest({
        API: `${endpoints.forgotPassword}`,
        data: params,
    });
};