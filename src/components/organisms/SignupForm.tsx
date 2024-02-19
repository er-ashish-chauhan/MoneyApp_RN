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
import NumberField from '../molecules/NumberField';

const SignupForm = ({
    onSubmit,
    setEmail,
    setPassword,
    setName,
    setContact,
    setConfirmPassword,
    email,
    name,
    contact,
    confirmPassword,
    password,
    emailValidationError,
    confirmPasswordError,
    nameValidationError,
    contactValidationError,
    passwordError
}: {
    onSubmit: () => void
    setEmail: (val: string) => void,
    setPassword: (val: string) => void,
    setName: (val: string) => void,
    setContact: (val: string) => void,
    setConfirmPassword: (val: string) => void,
    email: string,
    password: string,
    emailValidationError: string,
    passwordError: string,
    confirmPasswordError: string,
    nameValidationError: string,
    contactValidationError: string,
    name: string,
    contact: string,
    confirmPassword: string,
}): JSX.Element => {
    return (
        <View style={styles.container}>
            <InputField
                onChangeHandler={text => setName(String(text))}
                placeholder={translations.FULL_NAME}
                value={name}
                label={translations.FULL_NAME}
                isError={nameValidationError}
            />
            <InputField
                onChangeHandler={text => setEmail(String(text))}
                placeholder={translations.EMAIL}
                value={email}
                label={translations.EMAIL}
                isError={emailValidationError}
            />
            <NumberField
                onChangeHandler={text => setContact(String(text))}
                placeholder={translations.PHONE_NUMBER}
                value={contact}
                label={translations.PHONE_NUMBER}
                isError={contactValidationError}
            />
            <PasswordField
                onChangeHandler={text => setPassword(String(text))}
                placeholder={translations.PASSWORD_PLACEHOLDER}
                value={password}
                label={translations.PASSWORD}
                isError={passwordError}
            />
            <PasswordField
                onChangeHandler={text => setConfirmPassword(String(text))}
                placeholder={translations.CONFIRM_PASSWORD_PLACEHOLDER}
                value={confirmPassword}
                label={translations.CONFIRM_PASSWORD}
                isError={confirmPasswordError}
            />
            <Spacer size={30} />
            <Button onPress={onSubmit}>
                <Text style={styles.buttonText}>{translations.SIGNUP_BUTTON}</Text>
            </Button>
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
    }
});

export default SignupForm;