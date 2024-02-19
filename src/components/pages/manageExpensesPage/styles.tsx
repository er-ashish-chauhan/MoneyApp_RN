import { Dimensions, StyleSheet } from "react-native";
import colors from "../../../constants/colors";
import { normalize } from "../../../utils/normalizeHeightwidth";
import assets from "../../../assets";

const {
    width
} = Dimensions.get("window");

export const styles = StyleSheet.create({
    sepatorWrapper: {
        backgroundColor: colors.lightGrey,
        padding: 7,
        borderRadius: 2,
        marginHorizontal: -20,
        paddingLeft: width * 0.05,
    },
    transactionsWrapper: {
        marginTop: normalize(20)
    },
    emptyText: {
        fontSize: normalize(18),
        color: colors.labelGrey,
        textAlign: "center",
        lineHeight: normalize(22)
    },
    transactionText: {
        fontSize: normalize(16),
        fontFamily: assets.fonts.SEMI_BOLD
    }
});
