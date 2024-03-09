/**
 * @file IconButton.tsx
 * @author Ashish Chauhan
 */

import React from 'react';
import { View } from 'react-native';
import { IconButtonProps } from '../../constants/types';
import { styles } from './styles';
import { Icon, PressableText } from '../atoms';
import { colors } from '../../constants';

const IconButton = ({
    name,
    size = 20,
    color = colors.primaryColor,
    ...rest
}: IconButtonProps): JSX.Element => {
    return (
        <View style={styles.wrapper}>
            <PressableText
                style={styles.flexRowWithStart} {...rest}>
                <Icon
                    name={name}
                    size={size}
                    color={color}
                />
            </PressableText>
        </View>
    );
};


export default IconButton;