import { StyleSheet } from "react-native";
import { normalize } from "../../../utils/normalizeHeightwidth";

export const styles = StyleSheet.create({
    wrapper: {
        marginTop: normalize(40)
    },
    pageTitle: {
        fontSize: normalize(28)
    }
})