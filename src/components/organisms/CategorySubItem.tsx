/**
 * @file CategorySubItem.tsx
 * @author Ashish Chauhan
 */

import React from "react";
import { StyleSheet, View } from "react-native";
import { AddCategoryNoteType, CategoryPayInfoItem, ListActions } from "../../constants/types";
import { normalize } from "../../utils/normalizeHeightwidth";
import { Icon, Text } from "../atoms";
import constants, { colors } from "../../constants";
import assets from "../../assets";
import { Divider, HamburgerIcon, Menu, Pressable, Spacer } from "native-base";
import moment from "moment";
import { getAmount, getColorByAmount, hitSlop } from "../../utils/utility";
import { IconButton } from "../molecules";
import translations from "../../locals";


const CategorySubItem: React.FC<{
    item: CategoryPayInfoItem,
    onClick: (type: number, transaction: CategoryPayInfoItem) => void
}> = ({
    item: categoryItem,
    onClick
}): JSX.Element => {
        const {
            created_at: date,
            amount,
            title,
            type,
            id
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

                    <Menu w="130"
                        marginTop={2}
                        marginRight={7}
                        trigger={triggerProps => {
                            return (
                                <Pressable
                                    hitSlop={hitSlop}
                                    style={styles.menuIcon}
                                    {...triggerProps}>
                                    <Icon
                                        name={"ellipsis-vertical-sharp"}
                                        size={20}
                                        color={colors.labelGrey}
                                    />
                                </Pressable>
                            );
                        }}>
                        <Menu.Item onPress={() => onClick(ListActions.EDIT, categoryItem)}>{translations.EDIT}</Menu.Item>
                        <Divider />
                        <Menu.Item onPress={() => onClick(ListActions.DELETE, categoryItem)}>{translations.DELETE_TITLE}</Menu.Item>
                    </Menu>
                </View>
                <Spacer size={2} />
                <Divider />
            </View>
        )
    }

const styles = StyleSheet.create({
    flexRow: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center"
    },
    wrapper: {
        marginBottom: normalize(12)
    },
    titleText: {
        fontSize: normalize(15),
        fontFamily: assets.fonts.REGULAR,
        color: colors.black,
        lineHeight: normalize(16),
        flex: 0.8
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
        lineHeight: normalize(20),
        flex: 0.3
    },
    menuIcon: {
        marginLeft: -20,
        marginRight: -5,
        marginBottom: 2,
        zIndex: 999
    }
});

export default CategorySubItem;