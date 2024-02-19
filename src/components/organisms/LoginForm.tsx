/**
 * @file LoginForm.tsx
 * @author Ashish Chauhan
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import translations from '../../locals';
import PasswordField from '../molecules/PasswordField';
import InputField from '../molecules/InputField';
import { normalize } from '../../utils/normalizeHeightwidth';
import { Text, PressableText, Spacer, Button } from '../atoms';
import constants, { colors } from '../../constants';
import assets from '../../assets';
import { RouteType, Routes } from '../../constants/types';

const LoginForm = ({
    onSubmit,
    navigateHandler,
    setEmail,
    setPassword,
    email,
    password,
    emailValidationError,
    passwordError
}: {
    onSubmit: () => void
    navigateHandler: (page: RouteType) => void,
    setEmail: (val: string) => void,
    setPassword: (val: string) => void,
    email: string,
    password: string,
    emailValidationError: string,
    passwordError: string
}): JSX.Element => {

    const navigate = (page: RouteType) => navigateHandler(page);


    return (
        <View style={styles.container}>
            <InputField
                onChangeHandler={text => setEmail(String(text))}
                placeholder={translations.EMAIL_PLACEHOLDER}
                value={email}
                label={translations.EMAIL_USERNAME}
                isError={emailValidationError}
            />
            <PasswordField
                onChangeHandler={text => setPassword(String(text))}
                placeholder={translations.PASSWORD_VALIDATION}
                value={password}
                label={translations.PASSWORD}
                isError={passwordError}
            />
            <PressableText
                onPress={(): void => navigate(Routes.FORGOT_PASSWORD)}
                style={styles.forgotPasswordWrapper}>
                <Text style={styles.forgotText}>{`${translations.FORGOT_PASSWORD}?`}</Text>
            </PressableText>
            <Spacer size={30} />
            <Button
                onPress={onSubmit}>
                <Text style={styles.buttonText}>{translations.LOGIN_BUTTON}</Text>
            </Button>
            <Spacer size={30} />
            <Text style={styles.singupText}>{`${translations.SIGNUP_TEXT}`}</Text>
            <PressableText
                onPress={(): void => navigate(Routes.SIGNUP)}
                style={styles.signupwrapper}>
                <Text style={[styles.singupText, { fontFamily: assets.fonts.SEMI_BOLD }]}>{`${translations.CLICK_SIGNUP}`}</Text>
            </PressableText>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: normalize(40),
    },
    forgotPasswordWrapper: {
        alignItems: "flex-end",
        marginTop: normalize(10)
    },
    buttonText: {
        color: colors.white,
        fontSize: normalize(16),
        fontFamily: assets.fonts.SEMI_BOLD
    },
    signupwrapper: {
        alignItems: "center"
    },
    singupText: {
        textAlign: "center",
        fontSize: normalize(14)
    },
    forgotText: {
        fontSize: normalize(15),
        fontFamily: assets.fonts.SEMI_BOLD
    }
});

export default LoginForm;