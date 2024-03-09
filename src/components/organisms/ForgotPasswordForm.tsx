/**
 * @file LoginForm.tsx
 * @author Ashish Chauhan
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import translations from '../../locals';
import InputField from '../molecules/InputField';
import { normalize } from '../../utils/normalizeHeightwidth';
import { Text, Spacer, Button } from '../atoms';
import constants, { colors } from '../../constants';
import assets from '../../assets';

const ForgotPasswordForm = ({
    onSubmit,
    setEmail,
    email,
    emailValidationError,
}: {
    onSubmit: () => void
    setEmail: (val: string) => void,
    email: string,
    emailValidationError: string,
}): JSX.Element => {

    return (
        <View style={styles.container}>
            <Text style={styles.infoText}>{translations.FORGOT_INFO_TEXT}</Text>
            <Spacer size={30} />
            <InputField
                onChangeHandler={text => setEmail(String(text))}
                placeholder={translations.EMAIL_PLACEHOLDER}
                value={email}
                label={translations.EMAIL_USERNAME}
                isError={emailValidationError}
            />
            <Spacer size={30} />
            <Button
                onPress={onSubmit}>
                <Text style={styles.buttonText}>{translations.SEND}</Text>
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
    },
    signupwrapper: {
        alignItems: "center"
    },
    singupText: {
        textAlign: "center",
        fontSize: normalize(12)
    },
    infoText: {
        fontSize: normalize(14)
    }
});

export default ForgotPasswordForm;