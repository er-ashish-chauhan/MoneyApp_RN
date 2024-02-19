/**
 * @file categoryAction.ts
 * @author Ashish Chauhan
 */

import { AddCategoryBody, PaginationProps } from "../../constants/types";
import { ADD_CATEGORY, ADD_CATEGORY_NOTE, DELETE_CATEGORY, GET_CATEGORIES, GET_CATEGORY_BY_ID, UPDATE_CATEGORY } from "./actionTypes";

export const addCategoryAction = (params: AddCategoryBody, success: (res: any) => void) => {
    return {
        type: ADD_CATEGORY,
        params,
        success
    };
};

export const getCategoriesAction = (params: PaginationProps,success: (res: any) => void) => {
    return {
        type: GET_CATEGORIES,
        params,
        success
    };
};

export const getCategoryByIdAction = (params: { id: number | string }, success: (res: any) => void) => {
    return {
        type: GET_CATEGORY_BY_ID,
        params,
        success
    };
};

export const addCategoryNoteAction = (params: { id: number | string }, success: (res: any) => void) => {
    return {
        type: ADD_CATEGORY_NOTE,
        params,
        success
    };
};

export const updateCategoryAction = (params: AddCategoryBody, success: (res: any) => void) => {
    return {
        type: UPDATE_CATEGORY,
        params,
        success
    };
};

export const deleteCategoryAction = (params: { id: number | string }, success: (res: any) => void) => {
    return {
        type: DELETE_CATEGORY,
        params,
        success
    };
};