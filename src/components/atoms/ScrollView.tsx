/**
 * @file ScrollView.tsx
 * @author Ashish Chauhan
 */

import React, { PropsWithChildren } from "react";
import {
    ScrollView as RNScrollView, RefreshControl, ScrollViewProps
} from "react-native";
import constants, { colors } from "../../constants";
import { HStack, IconButton } from "native-base";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Text } from ".";

interface Props extends ScrollViewProps {
    // Your additional props go here
    refreshing?: boolean;
    onRefresh?: () => void
}
const ScrollView: React.FC<PropsWithChildren<Props>> = ({
    children,
    refreshing = false,
    onRefresh,
    ...rest
}): JSX.Element => {
    return (
        <RNScrollView
            showsVerticalScrollIndicator={false}
            keyboardDismissMode="interactive"
            automaticallyAdjustKeyboardInsets={true}
            keyboardShouldPersistTaps="handled"
            alwaysBounceVertical={true}
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    colors={[colors.bgColor, colors.primaryColor]}
                    progressBackgroundColor={colors.bgColor}
                />}
            {...rest}>
            {children}
        </RNScrollView>
    )
}

export default ScrollView;