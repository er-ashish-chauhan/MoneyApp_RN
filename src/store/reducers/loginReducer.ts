/**
 * @file loginReducer.ts
 * @author Ashish Chauhan
 */

import { Reducer } from "redux";
import {
  DO_LOGOUT,
  LOGIN_SUCCESS,
  START_LOADING,
  STOP_LOADING,
  STORE_TOKEN,
  USER_AUTHENTICATE
} from "../actions/actionTypes";
import { userDataProps } from "../../constants/types";

interface InitialStateTypes {
  authToken: string | null | undefined;
  userData: any | null;
  loading: boolean;
  isAuthenticated: boolean;
}

const initialState = {
  authToken: null,
  userData: null,
  loading: false,
  isAuthenticated: false,
};

const loginReducer: Reducer<InitialStateTypes> =
  (state = initialState, action: { type: string; payload?: userDataProps }) => {
    switch (action.type) {
      case START_LOADING:
        return {
          ...state,
          loading: true
        };
      case STOP_LOADING:
        return {
          ...state,
          loading: false
        };
      case LOGIN_SUCCESS:
        return {
          ...state,
          userData: action.payload,
          isAuthenticated: action.payload ? true : false
        };
      case DO_LOGOUT:
        return {
          ...state,
          userData: null,
          isAuthenticated: false
        }
      case STORE_TOKEN:
        return { ...state };
      case USER_AUTHENTICATE:
        return {
          ...state,
          isAuthenticated: false
        }
      default:
        return state;
    }
  };

export default loginReducer;