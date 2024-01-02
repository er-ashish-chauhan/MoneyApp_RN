import React, { memo, PropsWithChildren } from "react";
import { Text as RNText } from "react-native";

const Text: React.FC<
    PropsWithChildren<{
        children: Element;
        style: object;
        selectable: boolean
    }>
> = ({
    children,
    style,
    selectable,
    ...rest
}) => {
        return (
            <RNText
                style={[{}, style]}
                selectable={selectable}
                {...rest}>
                {children}
            </RNText>
        )
    }

export default memo(Text);