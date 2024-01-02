import React, { PropsWithChildren, useState } from 'react';
import { View, TextInput, Text, StyleSheet, TextProps } from 'react-native';
import fonts from '../../assets/fonts';
import { normalize } from '../../utils/normalizeHeightwidth';
import colors from '../../constants/colors';

const Label: React.FC<PropsWithChildren<TextProps>> = ({
    children,
    ...rest
}) => {
    return (
        <Text
            style={styles.label}
            {...rest}>
            {children}
        </Text>
    );
};

const styles = StyleSheet.create({
    label: {
        marginRight: 10,
        fontFamily: fonts.REGULAR,
        fontSize: normalize(11),
        lineHeight: normalize(13),
        color: colors.labelGrey
    }
});

export default Label;