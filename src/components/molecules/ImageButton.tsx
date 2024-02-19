/**
 * @file ImageButton.tsx
 * @author Ashish Chauhan
 */

import React from 'react';
import { ImageTextButtonProps } from '../../constants/types';
import { Image, PressableText, Text } from '../atoms';
import { normalize } from '../../utils/normalizeHeightwidth';

const ImageButton = ({
    imageSource,
    imageStyle = {},
    containerStyle = {},
    onClick = () => { },
}: ImageTextButtonProps): JSX.Element => {
    return (
        <PressableText
            onPress={() => onClick()}
            style={[containerStyle]}>
            <Image
                source={imageSource}
                style={[{
                    width: normalize(20),
                    height: normalize(20)
                }, imageStyle]}
            />
        </PressableText>
    );
};


export default ImageButton;