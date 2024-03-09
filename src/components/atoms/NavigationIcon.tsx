/**
 * @file NavigationIcon.tsx
 * @author Ashish Chauhan
 */
import React from "react";
import { View } from "react-native";
import { RouteType, Routes } from "../../constants/types";
import { Image } from ".";
import assets from "../../assets";
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
                <Image
                    source={assets.images.homeIcon}
                    style={{
                        height: isFocused ? 28 : 25,
                        width: isFocused ? 28 : 25,
                        resizeMode: "contain"
                    }}
                />
            )}
            {route === Routes.SETTINGS && (
                <Image
                    source={assets.images.settingIcon}
                    style={{
                        height: isFocused ? 28 : 25,
                        width: isFocused ? 28 : 25,
                        resizeMode: "contain"
                    }}
                />
            )}
            {route === Routes.ADD_CATEGORY && (
                <Image
                    source={assets.images.addIcon}
                    style={{
                        height: isFocused ? 28 : 25,
                        width: isFocused ? 28 : 25,
                        resizeMode: "contain"
                    }}
                />
            )}
            {/* {route === Routes.HOME && (
                <Icon name="home" size={26} color={colors.white} />
            )}
            {route === Routes.SETTINGS && (
                <Icon name="settings" size={26} color={colors.white} />
            )}
            {route === Routes.ADD_CATEGORY && (
                <MIcon name="wallet-plus" size={32} color={colors.white} />
            )} */}
        </View>
    )
}

export default NavigationIcon;