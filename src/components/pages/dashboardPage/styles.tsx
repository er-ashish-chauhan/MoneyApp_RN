import { Dimensions, StyleSheet } from "react-native";
import { normalize } from "../../../utils/normalizeHeightwidth";
import { colors } from "../../../constants";

const {
    height
} = Dimensions.get("window");

export const styles = StyleSheet.create({
    wrapper: {
        marginTop: normalize(20)
    },
    nameHeading: {
        fontSize: normalize(20),
        marginBottom: normalize(5)
    },
    listContainer: {
        paddingBottom: height * 0.2,
    },
    listStyle: {
        marginBottom: normalize(10)
    },
    emptyText: {
        fontSize: normalize(18),
        color: colors.labelGrey,
        textAlign: "center",
        lineHeight: normalize(22)
    }
})