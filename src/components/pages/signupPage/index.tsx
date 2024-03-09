/**
 * @file LoginPage/index.tsx
 * @author Ashish Chauhan
 */

import React, { useEffect } from "react";
import {
    BackButton,
    Text
} from "../../atoms";
import Container from "../../templates/Container";
import translations from "../../../locals";
import { styles } from "./styles";
import SignupForm from "../../organisms/SignupForm";
import { Spacer } from "native-base";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList, SignUpBody } from "../../../constants/types";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { emailRegex, phoneNumberRegex } from "../../../utils/utility";
import { useDispatch } from "react-redux";
import { registeration } from "../../../store/actions/loginAction";

type Props = NativeStackScreenProps<RootStackParamList>;

const SignupPage = ({
    navigation
}: Props): JSX.Element => {
    const dispatch = useDispatch();
    const [email, setEmail] = React.useState<string>("");
    const [name, setName] = React.useState<string>("");
    const [contact, setContact] = React.useState<string>("");
    const [password, setPassword] = React.useState<string>("");
    const [confirmPassword, setConfirmPassword] = React.useState<string>("");
    const [nameValidationError, setNameValidationError] = React.useState<string>("");
    const [contactValidationError, setContactValidationError] = React.useState<string>("");
    const [emailValidationError, setEmailValidationError] = React.useState<string>("");
    const [passwordError, setPasswordError] = React.useState<string>("");
    const [confirmPasswordError, setConfirmPasswordError] = React.useState<string>("");

    const isValidForm = (): boolean => {
        let flag = true;
        setNameValidationError("");
        setEmailValidationError("");
        setContactValidationError("");
        setPasswordError("");
        setConfirmPasswordError("");
        if (name.trim().length === 0) {
            setNameValidationError(translations.FULL_NAME_VALIDATION);
            flag = false;
        }
        if (contact.trim().length === 0 || (contact.trim().length && !phoneNumberRegex.test(contact))) {
            setContactValidationError(translations.PHONE_NUMBER_VALIDATION);
            flag = false;
        }
        if (email.trim().length === 0 || (email.trim().length && !emailRegex.test(email))) {
            setEmailValidationError(translations.EMAIL_LOGIN_VALIDATION);
            flag = false;
        }
        if (password.trim().length === 0) {
            setPasswordError(translations.PASSWORD_VALIDATION);
            flag = false;
        }
        if (confirmPassword.trim().length === 0) {
            setConfirmPasswordError(translations.CONFIRM_PASSWORD_VALIDATION);
            flag = false;
        }

        if (confirmPassword.trim() !== password.trim()) {
            setConfirmPasswordError(translations.PASSWORD_NOT_MATCHED);
            flag = false;
        }
        return flag
    }

    const signUpHandler = async () => {
        if (!isValidForm()) return;

        // Split the full name into an array of parts
        const nameParts = name.split(" ");

        const params: SignUpBody = {
            name: nameParts[0],
            last_name: nameParts.slice(1).join(" "),
            email,
            phone_num: contact,
            password,
            c_password: confirmPassword
        }
        const action = registeration(params, onSuccess);
        await dispatch(action);
    }

    const onSuccess = (result: any) => {
        navigation.goBack();
    }

    const navigateBack = (): void => navigation.pop();

    return (
        <Container>
            <KeyboardAwareScrollView
                showsVerticalScrollIndicator={false}
                style={styles.wrapper}>
                <BackButton
                    onPress={navigateBack} />
                <Spacer size={5} />
                <Text style={styles.pageTitle}>{translations.SIGNUP}</Text>
                <SignupForm
                    email={email}
                    name={name}
                    setName={setName}
                    contact={contact}
                    setContact={setContact}
                    password={password}
                    confirmPassword={confirmPassword}
                    setConfirmPassword={setConfirmPassword}
                    setEmail={setEmail}
                    setPassword={setPassword}
                    onSubmit={signUpHandler}
                    emailValidationError={emailValidationError}
                    passwordError={passwordError}
                    nameValidationError={nameValidationError}
                    contactValidationError={contactValidationError}
                    confirmPasswordError={confirmPasswordError}
                />
            </KeyboardAwareScrollView>
        </Container>
    )
}

export default SignupPage;