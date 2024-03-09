/**
 * @file tabBar.tsx
 * @description Manage the styling of bottom tabs
 * @author Ashish Chauhan
 */
import React from "react"
import {
    Dimensions, StyleSheet, View,
} from "react-native";
import { NavigationIcon, PressableText } from "../components/atoms";
import constants, { colors } from "../constants";
import { Routes } from "../constants/types";

const {
    width
} = Dimensions.get("window");

const TabBar = ({ state, descriptors, navigation }: any): JSX.Element => {

    return (
        <View style={styles.mainContainer}>
            {state.routes.map((route: any, index: number) => {
                const { options } = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                            ? options.title
                            : route.name;

                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }
                };

                return (
                    <View key={index} style={[styles.mainItemContainer,
                    { borderRightWidth: label == "notes" ? 3 : 0 }]}>
                        <PressableText
                            onPress={onPress}
                            style={[{
                                backgroundColor: isFocused ?
                                    "#53b569" :
                                    colors.primaryColor, borderRadius: 20,
                            }, route.name === Routes.ADD_CATEGORY ? styles.plusIconStyle : null]}>
                            <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1, padding: 15 }}>
                                <NavigationIcon
                                    route={route.name}
                                    uniqueKey={index}
                                    isFocused={isFocused}
                                />
                            </View>
                        </PressableText>
                    </View>
                );
            })}
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 20,
        backgroundColor: colors.primaryColor,
        borderRadius: 25,
        marginHorizontal: width * 0.1
    },
    mainItemContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
        borderRadius: 1,
        borderColor: colors.primaryColor
    },
    plusIconStyle: {

    }
})

export default TabBar;