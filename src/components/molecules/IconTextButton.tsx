/**
 * @file IconTextButton.tsx
 * @author Ashish Chauhan
 */

import React from 'react';
import { View } from 'react-native';
import { IconTextButtonProps } from '../../constants/types';
import { styles } from './styles';
import { PressableText, Text } from '../atoms';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors } from '../../constants';

const IconTextButton = ({
    name,
    buttonText,
    textStyle = {},
    size = 20,
    color = colors.primaryColor
}: IconTextButtonProps): JSX.Element => {
    return (
        <View style={styles.wrapper}>
            <PressableText style={styles.flexRowWithStart}>
                <Icon
                    name={name}
                    size={size}
                    color={color}
                />
                <Text style={[styles.imageButtonText, textStyle]}>{buttonText}</Text>
            </PressableText>
        </View>
    );
};


export default IconTextButton;