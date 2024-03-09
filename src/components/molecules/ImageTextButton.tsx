/**
 * @file ImageTextButton.tsx
 * @author Ashish Chauhan
 */

import React from 'react';
import { View } from 'react-native';
import { ImageTextButtonProps } from '../../constants/types';
import { styles } from './styles';
import { Image, PressableText, Text } from '../atoms';
import { normalize } from '../../utils/normalizeHeightwidth';

const ImageTextButton = ({
    imageSource,
    buttonText,
    imageStyle = {},
    textStyle = {},
    onClick = () => { }
}: ImageTextButtonProps): JSX.Element => {
    return (
        <View style={styles.wrapper}>
            <PressableText
                onPress={onClick}
                style={styles.flexRowWithStart}>
                <Image
                    source={imageSource}
                    style={[{
                        width: normalize(20),
                        height: normalize(20)
                    }, imageStyle]}
                />
                <Text style={[styles.imageButtonText, textStyle]}>{buttonText}</Text>
            </PressableText>
        </View>
    );
};


export default ImageTextButton;