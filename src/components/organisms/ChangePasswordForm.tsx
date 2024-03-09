/**
 * @file ChangePasswordForm.tsx
 * @author Ashish Chauhan
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import translations from '../../locals';
import { normalize } from '../../utils/normalizeHeightwidth';
import { Text, Spacer, Button, PressableText } from '../atoms';
import { colors } from '../../constants';
import assets from '../../assets';
import PasswordField from '../molecules/PasswordField';

const ChangePasswordForm = ({
    onSubmit,
    setCurrentPassword,
    setNewPassword,
    setConfirmPassword,
    currentpassword,
    newpassword,
    confirmpassword,
    currentPwdValidationError,
    newPwdValidationError,
    confirmPwdValidationError,
    onCancel
}: {
    onSubmit: () => void,
    onCancel: () => void,
    setCurrentPassword: (val: string) => void,
    setNewPassword: (val: string) => void,
    setConfirmPassword: (val: string) => void,
    currentpassword: string,
    newpassword: string,
    confirmpassword: string,
    currentPwdValidationError: string,
    newPwdValidationError: string,
    confirmPwdValidationError: string,
}): JSX.Element => {

    return (
        <View style={styles.container}>
            <PasswordField
                onChangeHandler={text => setCurrentPassword(String(text))}
                placeholder={translations.CURRENT_PASSWORD}
                value={currentpassword}
                label={translations.CURRENT_PASSWORD}
                isError={currentPwdValidationError}
            />
            {/* <Spacer size={2} /> */}
            <PasswordField
                onChangeHandler={text => setNewPassword(String(text))}
                placeholder={translations.NEW_PASSWORD}
                value={newpassword}
                label={translations.NEW_PASSWORD}
                isError={newPwdValidationError}
            />
            <PasswordField
                onChangeHandler={text => setConfirmPassword(String(text))}
                placeholder={translations.CONFIRM_NEW_PASSWORD}
                value={confirmpassword}
                label={translations.CONFIRM_NEW_PASSWORD}
                isError={confirmPwdValidationError}
            />
            <Spacer size={30} />
            <Button
                onPress={onSubmit}>
                <Text style={styles.buttonText}>{translations.CHANGE_PASSWORD}</Text>
            </Button>
            <Spacer size={15} />
            <PressableText
                onPress={() => onCancel()}
                style={{
                    alignItems: "center"
                }}>
                <Text style={styles.cancelText}>{translations.CANCEL}</Text>
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
        fontSize: normalize(11)
    },
    infoText: {
        fontSize: normalize(11)
    },
    cancelText: {
        color: colors.danger,
        textDecorationLine: "underline",
        fontSize: normalize(15),
        lineHeight: normalize(17),
        fontFamily: assets.fonts.MEDIUM
    }
});

export default ChangePasswordForm;