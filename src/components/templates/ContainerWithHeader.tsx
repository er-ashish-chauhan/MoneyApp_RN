/**
 * @file Container/index.tsx
 * @author Ashish Chauhan
 */

import React, { PropsWithChildren } from "react";
import {
    Dimensions,
    StyleSheet,
    View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../../constants";
import { StatusBar } from "../atoms";
import Header from "../atoms/Header";
import { Box, Divider, HStack } from "native-base";
import { ImageButton } from "../molecules";
import assets from "../../assets";

const {
    height,
} = Dimensions.get("window");

interface ContainerWithHeaderProps {
    children: React.ReactNode;
    isShowHeader?: boolean;
    navigateBack?: () => void,
    onDeleteCategory?: () => void,
    showFooter?: boolean
}

const ContainerWithHeader: React.FC<PropsWithChildren<ContainerWithHeaderProps>> = ({
    children,
    isShowHeader = false,
    showFooter = false,
    navigateBack = () => { },
    onDeleteCategory = () => {}
}): JSX.Element => {

    return (
        <>
            <SafeAreaView
                style={styles.container}>
                <StatusBar />
                <Header
                    isShowHeader={isShowHeader}
                    navigateBack={() => navigateBack()}
                />
                <Divider />
                <View style={styles.subContainer}>
                    {children}
                </View>
            </SafeAreaView>
            {showFooter && (
                <HStack bg={colors.primaryColor} alignItems="center" safeAreaBottom shadow={6}>
                    <View style={styles.rowContainer}>
                        <View />
                        <ImageButton
                            imageSource={assets.images.delete}
                            imageStyle={{
                                tintColor: colors.white
                            }}
                            containerStyle={{
                                alignSelf: "flex-end"
                            }}
                            onClick={onDeleteCategory}
                        />
                    </View>
                </HStack>
            )}
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: -15,
        paddingBottom: - height * 0.1,
        backgroundColor: colors.bgColor,
    },
    subContainer: {
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 20
    },
    rowContainer: {
        flex: 1,
        margin: 20,
        marginVertical: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    }
});

export default ContainerWithHeader;