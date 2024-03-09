/**
 * @file InputField.tsx
 * @author Ashish Chauhan
 */

import React from 'react';
import { View } from 'react-native';
import { FieldProps } from '../../constants/types';
import TextInput from '../atoms/TextInput';
import Label from '../atoms/Label';
import { styles } from './styles';
import { Text } from '../atoms';
import translations from '../../locals';

const InputField = ({
    label,
    onChangeHandler,
    value,
    placeholder,
    isError = "",
    secureEntry = false,
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
                    placeholder={placeholder || ""}
                    value={value}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    secureTextEntry={secureEntry}
                    autoCapitalize= {label === translations.EMAIL ? "none": "words"}
                />
                
            </View>
            {isError.trim().length > 0 && (
                <Text style={styles.errorText}>{isError}</Text>
            )}
        </View>
    );
};


export default InputField;