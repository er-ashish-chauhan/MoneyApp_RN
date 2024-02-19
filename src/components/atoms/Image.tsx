/**
 * @file Image.tsx
 * @author Ashish Chauhan
 */

import React from 'react';
import {
    ImageProps,
    Image as RNImage,
    StyleSheet
} from 'react-native';

const Image: React.FC<ImageProps> = ({
    ...rest
}) => {
    return (
        <RNImage
            resizeMode="contain"
            {...rest}
        />
    );
};

const styles = StyleSheet.create({

});

export default Image;