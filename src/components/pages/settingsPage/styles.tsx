import { Dimensions, Platform, StyleSheet } from "react-native";

const {
    height,
    width
} = Dimensions.get("window");

export const styles = StyleSheet.create({
    bottomContentContainer: {
        position: "absolute",
        top: height / 1.7,
        width: width
    }
});