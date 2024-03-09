/**
 * @file PressableText.tsx
 * @author Ashish Chauhan
 */

import React, { memo, PropsWithChildren } from "react";
import { TouchableOpacity, TouchableOpacityProps, } from "react-native";
import { hitSlop } from "../../utils/utility";

const PressableText: React.FC<
    PropsWithChildren<TouchableOpacityProps>
> = ({
    children,
    style = {},
    ...rest
}) => {
        return (
            <TouchableOpacity
                activeOpacity={0.7}
                hitSlop={hitSlop}
                style={[style, {}]}
                {...rest}>
                {children}
            </TouchableOpacity>
        )
    }

export default memo(PressableText);