/**
 * @file Container/index.tsx
 * @author Ashish Chauhan
 */

import React, { PropsWithChildren } from "react";
import {
    StyleSheet
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import constants, { colors } from "../../constants";
import { StatusBar } from "../atoms";

interface ContainerProps {
    children: React.ReactNode;
}

const Container: React.FC<PropsWithChildren<ContainerProps>> = ({
    children
}): JSX.Element => {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar />
            {children}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: colors.bgColor
    },
});

export default Container;