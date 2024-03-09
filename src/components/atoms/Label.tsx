/**
 * @file Label.tsx
 * @author Ashish Chauhan
 */

import React, { PropsWithChildren } from 'react';
import { Text, StyleSheet, TextProps } from 'react-native';
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
        fontFamily: fonts.REGULAR,
        fontSize: normalize(11),
        lineHeight: normalize(13),
        color: colors.labelGrey,
        marginLeft: normalize(10)
    }
});

export default Label;