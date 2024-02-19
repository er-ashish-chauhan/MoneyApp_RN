/**
 * @file NavigationIcon.tsx
 * @author Ashish Chauhan
 */
import React from "react";
import { View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { RouteType, Routes } from "../../constants/types";
import constants, { colors } from "../../constants";
import MIcon from "react-native-vector-icons/MaterialCommunityIcons"
const NavigationIcon = ({
    uniqueKey,
    route,
    isFocused
}: {
    uniqueKey: number,
    route: RouteType,
    isFocused: boolean
}): JSX.Element => {
    return (
        <View key={uniqueKey}>
            {route === Routes.HOME && (
                <Icon name="home" size={26} color={colors.white} />
            )}
            {route === Routes.SETTINGS && (
                <Icon name="settings" size={26} color={colors.white} />
            )}
            {route === Routes.ADD_CATEGORY && (
                <MIcon name="wallet-plus" size={32} color={colors.white} />
            )}
        </View>
    )
}

export default NavigationIcon;