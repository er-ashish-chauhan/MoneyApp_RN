/**
 * @file CategorySubItem.tsx
 * @author Ashish Chauhan
 */

import React from "react";
import { StyleSheet, View } from "react-native";
import { AddCategoryNoteType, CategoryPayInfoItem } from "../../constants/types";
import { normalize } from "../../utils/normalizeHeightwidth";
import { Text } from "../atoms";
import constants, { colors } from "../../constants";
import assets from "../../assets";
import { Divider, Spacer } from "native-base";
import moment from "moment";
import { getAmount, getColorByAmount } from "../../utils/utility";


const CategorySubItem: React.FC<{
    item: CategoryPayInfoItem
}> = ({
    item: categoryItem
}): JSX.Element => {

        const {
            created_at: date,
            amount,
            title,
            type
        } = categoryItem;

        return (
            <View style={styles.wrapper}>
                <Text style={styles.dateText}>{moment(date).format(constants.TIMESHEETDATEFORMAT)}</Text>
                <Spacer size={2} />
                <View style={[styles.flexRow]}>
                    <Text style={styles.titleText}>{title}</Text>
                    <Text style={[styles.amountText, {
                        color: type === AddCategoryNoteType.MINUS
                            ? colors.danger : colors.primaryColor
                    }]}>
                        {getAmount(type === AddCategoryNoteType.MINUS ? `-${amount}` : amount)}</Text>
                </View>
                <Spacer size={2} />
                <Divider />
            </View>
        )
    }

const styles = StyleSheet.create({
    flexRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    wrapper: {
        marginBottom: normalize(12)
    },
    titleText: {
        fontSize: normalize(15),
        fontFamily: assets.fonts.REGULAR,
        color: colors.black,
        lineHeight: normalize(16)
    },
    dateText: {
        fontSize: normalize(12),
        fontFamily: assets.fonts.REGULAR,
        color: colors.labelGrey,
        lineHeight: normalize(13)
    },
    amountText: {
        color: colors.primaryColor,
        fontFamily: assets.fonts.MEDIUM,
        fontSize: normalize(18),
        lineHeight: normalize(20)
    },
});

export default CategorySubItem;