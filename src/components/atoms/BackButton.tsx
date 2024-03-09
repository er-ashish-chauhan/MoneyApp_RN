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

// Define the type for your custom props
interface BackButtonProps extends TouchableOpacityProps {
    iconColor?: string;
}

const BackButton: React.FC<BackButtonProps> = ({
    style,
    iconColor = colors.labelGrey,
    ...rest
}) => {
    return (
        <TouchableOpacity
            activeOpacity={0.6}
            hitSlop={hitSlop}
            style={[styles.buttonWrapper, style]}
            {...rest}>
            <Icon name='chevron-back' color={iconColor} size={normalize(25)} />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    buttonWrapper: {
        width: normalize(40)
    },
});

export default BackButton;