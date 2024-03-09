/**
 * @file Text.tsx
 * @author Ashish Chauhan
 */

import React, { memo, PropsWithChildren } from "react";
import { Text as RNText, StyleSheet, TextProps } from "react-native";
import { normalize } from "../../utils/normalizeHeightwidth";
import assets from "../../assets";
import constants, { colors } from "../../constants";

const Text: React.FC<
    PropsWithChildren<TextProps>
> = ({
    children,
    style,
    selectable,
    ...rest
}) => {
        return (
            <RNText
                style={[styles.textStyle, style]}
                selectable={selectable}
                {...rest}>
                {children}
            </RNText>
        )
    }

const styles = StyleSheet.create({
    textStyle: {
        fontSize: normalize(14),
        fontFamily: assets.fonts.REGULAR,
        color: colors.black,
        // lineHeight: normalize(16)
    }
});

export default memo(Text);