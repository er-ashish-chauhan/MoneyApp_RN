import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./loginReducer";

export const rootReducer = configureStore({
    reducer: loginReducer,
});