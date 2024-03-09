/**
 * @file categoryServices.ts
 * @author Ashish Chauhan
 */

import { endpoints } from "../../constants";
import { AddCategoryBody, AddCategoryNoteBody, PaginationProps } from "../../constants/types";
import { deleteRequest, getRequest, postRequest, putRequest } from "../../libs/Api";

export const addCategoryService = async (params: AddCategoryBody) => {
    return postRequest({
        API: `${endpoints.addCategory}`,
        data: params
    });
};

export const getCategoryByIdService = async (params: {id: number}) => {
    return getRequest({
        API: `${endpoints.GetCategoryById(params.id)}`,
    });
};

export const getCategoriesService = async (params: PaginationProps) => {
    return getRequest({
        API: `${endpoints.getCategories(params.page, params.size)}`,
    });
};

export const addCategoryNoteService = async (params: AddCategoryNoteBody) => {
    return postRequest({
        API: `${endpoints.addCategoryNote(params?.id)}`,
        data: params
    });
};

export const updateCategoryService = async (params: AddCategoryBody) => {
    return putRequest({
        API: `${endpoints.updateCategory(params?.id || 0)}`,
        data: params
    });
};

export const deleteCategoryService = async (params: AddCategoryBody) => {
    return deleteRequest({
        API: `${endpoints.deleteCategory(params?.id || 0)}`
    });
};

export const deleteTransactionService = async (params: AddCategoryBody) => {
    return deleteRequest({
        API: `${endpoints.deleteTransaction(params?.id || 0)}`
    });
};

export const updateTransactionService = async (params: AddCategoryBody) => {
    return putRequest({
        API: `${endpoints.updateTransaction(params?.id || 0)}`,
        data: params
    });
};