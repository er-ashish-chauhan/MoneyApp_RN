import { Platform, StyleSheet } from "react-native";
import { normalize } from "../../utils/normalizeHeightwidth";
import constants, { colors } from "../../constants";
import assets from "../../assets";

export const styles = StyleSheet.create({
    wrapper: {
        marginBottom: normalize(10),
    },
    inputContainer: {
        flexDirection: 'column',
        backgroundColor: colors.white,
        height: Platform.OS === "android" ? normalize(68) : normalize(60),
        borderRadius: normalize(8),
        padding: normalize(10),
        // Shadow properties for iOS
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        // Elevation for Android
        elevation: 2,
    },
    focused: {
        borderColor: colors.primaryColor,
        borderWidth: 1
    },
    errorText: {
        fontSize: normalize(10),
        color: colors.danger,
        marginLeft: normalize(10),
        marginTop: 1
    },
    errorContainer: {
        borderColor: colors.danger,
        borderWidth: 1
    },
    flexRowWithStart: {
        justifyContent: "flex-start",
        flexDirection: "row",
        alignContent: "center"
    },
    imageButtonText: {
        marginLeft: normalize(10),
        fontSize: normalize(15),
        fontFamily: assets.fonts.SEMI_BOLD
    },
    flexRowWithSpace: {
        justifyContent: "space-between",
        flexDirection: "row",
        alignContent: "center"
    },
});