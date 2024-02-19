/**
 * @file Button.tsx
 * @author Ashish Chauhan
 */

import React, { PropsWithChildren } from 'react';
import { TouchableOpacity, StyleSheet, TouchableOpacityProps } from 'react-native';
import { normalize } from '../../utils/normalizeHeightwidth';
import { hitSlop } from '../../utils/utility';
import { colors } from '../../constants';

const Button: React.FC<PropsWithChildren<TouchableOpacityProps>> = ({
    style,
    children,
    ...rest
}) => {
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            hitSlop={hitSlop}
            style={[styles.buttonWrapper, style]}
            {...rest}>
            {children}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    buttonWrapper: {
        minHeight: normalize(40),
        paddingLeft: 10,
        alignItems: "center",
        backgroundColor: colors.primaryColor,
        justifyContent: "center",
        borderRadius: normalize(8)
    },
});

export default Button;