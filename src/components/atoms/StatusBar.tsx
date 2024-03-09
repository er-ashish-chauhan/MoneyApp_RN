/**
 * @file StatusBar.tsx
 * @author Ashish Chauhan
 */

import React from "react";
import {
    StatusBar as RNStatusBar,
    useColorScheme
} from "react-native";
import constants, { colors } from "../../constants";

const StatusBar = (): JSX.Element => {
    const isDarkMode = useColorScheme() === "dark";
    return (
        <RNStatusBar
            barStyle={isDarkMode ? 'light-content' : 'dark-content'}
            backgroundColor={colors.primaryColor}
            networkActivityIndicatorVisible={true}
            animated={true}
            translucent={true}
        />
    )
}

export default StatusBar;