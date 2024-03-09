/**
 * @file ImageButton.tsx
 * @author Ashish Chauhan
 */

import React from 'react';
import { ImageTextButtonProps } from '../../constants/types';
import { Image, PressableText, Text } from '../atoms';
import { normalize } from '../../utils/normalizeHeightwidth';
import { hitSlop } from '../../utils/utility';

const ImageButton = ({
    imageSource,
    imageStyle = {},
    containerStyle = {},
    onClick = () => { },
    hit_slop = hitSlop
}: ImageTextButtonProps): JSX.Element => {
    return (
        <PressableText
            hitSlop={hit_slop}
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