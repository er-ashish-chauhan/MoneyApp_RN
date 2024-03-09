/**
 * @file PasswordField.tsx
 * @author Ashish Chauhan
 */

import React from 'react';
import { View } from 'react-native';
import { FieldProps } from '../../constants/types';
import TextInput from '../atoms/TextInput';
import Label from '../atoms/Label';
import translations from '../../locals';
import { styles } from './styles';
import { Text } from '../atoms';

const PasswordField = ({
    label,
    onChangeHandler,
    value,
    placeholder,
    isError = ""
}: FieldProps): JSX.Element => {
    const [isFocused, setIsFocused] = React.useState<boolean>(false);
    return (
        <View style={styles.wrapper}>
            <View style={[styles.inputContainer,
            (isFocused || value) ?
                styles.focused : null,
            isError.trim().length > 0 ?
                styles.errorContainer : null]}>
                {(value) && (<Label>{label}</Label>)}
                <TextInput
                    onChangeText={onChangeHandler}
                    placeholder={placeholder ?? translations.PASSWORD_PLACEHOLDER}
                    value={value}
                    secureTextEntry={true}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                />
            </View>
            {isError.trim().length > 0 && (
                <Text style={styles.errorText}>{isError}</Text>
            )}
        </View>
    );
};

export default PasswordField;