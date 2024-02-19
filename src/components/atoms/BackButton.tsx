/**
 * @file BackButton.tsx
 * @author Ashish Chauhan
 */

import React, {  } from 'react';
import { TouchableOpacity, StyleSheet, TouchableOpacityProps } from 'react-native';
import { normalize } from '../../utils/normalizeHeightwidth';
import { hitSlop } from '../../utils/utility';
import { colors } from '../../constants';
import Icon from 'react-native-vector-icons/Ionicons';

const BackButton: React.FC<TouchableOpacityProps> = ({
    style,
    ...rest
}) => {
    return (
        <TouchableOpacity
            activeOpacity={0.6}
            hitSlop={hitSlop}
            style={[styles.buttonWrapper, style]}
            {...rest}>
            <Icon name='chevron-back' color={colors.labelGrey} size={normalize(25)} />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    buttonWrapper: {
        width: normalize(40)
    },
});

export default BackButton;