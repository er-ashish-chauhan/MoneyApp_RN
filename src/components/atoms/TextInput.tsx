/**
 * @file TextInput.tsx
 * @author Ashish Chauhan
 */

import React from 'react';
import { TextInput as RNTextInput, StyleSheet, TextInputProps } from 'react-native';
import assets from '../../assets';
import { normalize } from '../../utils/normalizeHeightwidth';
import { colors } from '../../constants';

const TextInput: React.FC<TextInputProps> = ({
    style,
    value,
    placeholder,
    autoCapitalize,
    onChangeText,
    secureTextEntry,
    editable,
    returnKeyType,
    ...rest
}) => {
    return (
        <RNTextInput
            style={[styles.input, style]}
            onChangeText={onChangeText}
            value={value}
            placeholderTextColor={colors.labelGrey}
            placeholder={placeholder || ""}
            autoCapitalize={autoCapitalize}
            secureTextEntry={secureTextEntry}
            editable={editable}
            returnKeyType={returnKeyType}
            {...rest}
        />
    );
};

const styles = StyleSheet.create({
    input: {
        height: normalize(40),
        paddingLeft: 10,
        flex: 1,
        fontFamily: assets.fonts.MEDIUM,
        fontSize: normalize(14),
        lineHeight: normalize(20)
    },
});

export default TextInput;