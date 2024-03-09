/**
 * @file RNIcon.tsx
 * @author Ashish Chauhan
 */

import React from 'react';
import { StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { IconProps } from 'react-native-vector-icons/Icon';

const RNIcon: React.FC<IconProps> = ({
    ...rest
}) => {
    return (
        <Icon
           {...rest}
        />
    );
};

const styles = StyleSheet.create({

});

export default RNIcon;