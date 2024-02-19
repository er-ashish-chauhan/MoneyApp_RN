/**
 * @file LoginPage/index.tsx
 * @author Ashish Chauhan
 */

import React, { } from "react";
import {
    Text
} from "../../atoms";
import Container from "../../templates/Container";
import LoginForm from "../../organisms/LoginForm";
import translations from "../../../locals";
import { styles } from "./styles";
import { View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { LoginBody, RootStackParamList, RouteType, Routes } from "../../../constants/types";
import { useDispatch } from "react-redux";
import { loginUsingEmail } from "../../../store/actions/loginAction";

type Props = NativeStackScreenProps<RootStackParamList>;

const LoginPage = ({
    navigation
}: Props): JSX.Element => {
    const dispatch = useDispatch();
    const [email, setEmail] = React.useState<string>("");
    const [password, setPassword] = React.useState<string>("");
    const [emailValidationError, setEmailValidationError] = React.useState<string>("");
    const [passwordError, setPasswordError] = React.useState<string>("");

    const isValidForm = (): boolean => {
        let flag = true;
        setEmailValidationError("");
        setPasswordError("");
        if (email.trim().length === 0) {
            setEmailValidationError(translations.EMAIL_LOGIN_VALIDATION);
            flag = false;
        }
        if (password.trim().length === 0) {
            setPasswordError(translations.PASSWORD_VALIDATION);
            flag = false;
        }
        return flag
    }

    const loginHandler = () => {
        if (!isValidForm()) return;
        const params: LoginBody = {
            email,
            password
        }
        console.log("loginparams >>", params);
        dispatch(loginUsingEmail(params))
    }

    const navigateHandler = (page: RouteType): void => {
        navigation.navigate(page);
    }

    return (
        <Container>
            <View style={styles.wrapper}>
                <Text style={styles.pageTitle}>{translations.LOGIN}</Text>
                <LoginForm
                    email={email}
                    password={password}
                    setEmail={setEmail}
                    setPassword={setPassword}
                    onSubmit={loginHandler}
                    navigateHandler={navigateHandler}
                    emailValidationError={emailValidationError}
                    passwordError={passwordError}
                />
            </View>
        </Container>
    )
}

export default LoginPage;