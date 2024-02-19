import { ImageSourcePropType, ImageStyle, StyleProp, TextStyle, ViewStyle } from "react-native/types";

export interface FieldProps {
    label?: string;
    onChangeHandler?: (val: TextInputVal) => void;
    value?: string;
    placeholder?: string;
    isError?: string | undefined;
    text?: string;
    setText?: (value: TextInputVal) => void,
    type?: AddCategoryNoteType,
    onAction?: (value: AddCategoryNoteType | null) => void,
    secureEntry?: boolean
}

export type RootStackParamList = {
    Login: undefined;
    Signup: undefined;
    ForgotPassword: undefined;
    Dashboard: undefined;
    Settings: undefined;
    AddCategory: undefined;
    ManageExpenses: {
        item: CategoryItems,
        type?: AddCategoryNoteType
    } | undefined;
    Home: undefined;
    ChangePassword: undefined;
};

export enum Routes {
    LOGIN = "Login",
    SIGNUP = "Signup",
    FORGOT_PASSWORD = "ForgotPassword",
    DASHBOARD = "Dashboard",
    SETTINGS = "Settings",
    ADD_CATEGORY = "AddCategory",
    MANAGE_EXPENSES = "ManageExpenses",
    CHANGE_PASSWORD= "ChangePassword",
    HOME = "Home"
}


export type RouteType = Routes.LOGIN |
    Routes.SIGNUP |
    Routes.FORGOT_PASSWORD |
    Routes.DASHBOARD |
    Routes.ADD_CATEGORY |
    Routes.SETTINGS |
    Routes.MANAGE_EXPENSES |
    Routes.HOME |
    Routes.CHANGE_PASSWORD;

export type TextInputVal = string | number | undefined;

export interface ImageTextButtonProps {
    imageSource: ImageSourcePropType,
    containerStyle?: StyleProp<ViewStyle>,
    buttonText?: string,
    imageStyle?: StyleProp<ImageStyle>,
    textStyle?: StyleProp<TextStyle>
    onClick: () => void
}
export interface IconTextButtonProps {
    name: string,
    buttonText: string,
    size?: number,
    color?: string,
    textStyle?: StyleProp<TextStyle>
    onClick: () => void
}

export interface CategoryItems {
    name: string;
    amount: string | number,
    totalAmt?: string | number,
    id: number,
    payInfo?: string | CategoryPayInfoItem[],
    user_id?: string | number
}

export interface EditCategoryFormProps {
    category: string;
    onChangeHandler?: (val: TextInputVal) => void;
    placeholder?: string;
    isError?: string | undefined;
    onSubmit: () => void;
    onCancel: () => void;
}

export interface LoginBody {
    email: string,
    password: string
}

export interface SignUpBody {
    name: string,
    last_name: string,
    email: string,
    phone_num: string | number,
    password: string,
    c_password: string
}

export enum ToastType {
    SUCCESS = "success",
    ERROR = "error",
    INFO = "info"
}

export interface userDataProps {
    id: number,
    name?: string,
    last_name?: string,
    email?: string,
    email_verified_at?: null,
    phone_num?: number | string,
    user_role?: string,
    created_at?: string,
    updated_at?: string,
    api_token?: null
}

export interface AddCategoryBody {
    name: string;
    id?: number;
}

export interface AddCategoryNoteBody {
    id: number,
    amount: number | string,
    title: string,
    type: string
}

export enum AddCategoryNoteType {
    PLUS = "plus",
    MINUS = "minus"
}

export interface PaginationProps {
    page: number,
    size: number
}

export interface CategoryPayInfoItem {
    id: number,
    amount: string,
    title: string,
    type: AddCategoryNoteType,
    user_id: number,
    cat_id: number,
    created_at: string,
    updated_at: string,
    onDelete?: (id: number) => void;
}