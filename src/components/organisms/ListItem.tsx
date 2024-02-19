/**
 * @file ListItem.tsx
 * @author Ashish Chauhan
 */

import React from "react";
import { Alert, StyleSheet, View } from "react-native";
import { PressableText, Text } from "../atoms";
import { Divider, Spacer } from "native-base";
import { ImageButton } from "../molecules";
import assets from "../../assets";
import { normalize } from "../../utils/normalizeHeightwidth";
import colors from "../../constants/colors";
import InputFieldWithText from "../molecules/InputFieldWithText";
import { AddCategoryNoteType, TextInputVal } from "../../constants/types";
import { getAmount, getColorByAmount } from "../../utils/utility";

const ListItem: React.FC<{
    name: TextInputVal,
    amount: TextInputVal
    isShowEdit?: boolean,
    onEditClick?: () => void,
    onClick?: (val?: AddCategoryNoteType) => void,
    isClickable?: boolean,
    onPlusClick?: () => void,
    amountForNote?: TextInputVal,
    setAmountForNote?: (val: TextInputVal) => void,
    amountDescription?: TextInputVal,
    setAmountDescription?: (val: TextInputVal) => void,
    setAddNoteType?: (val: AddCategoryNoteType | null) => void,
    addNoteType?: AddCategoryNoteType | null
}> = ({
    name,
    amount,
    isShowEdit = false,
    onEditClick = () => { },
    onClick = () => { },
    isClickable = true,
    amountForNote = "",
    setAmountForNote = () => { },
    amountDescription = "",
    setAmountDescription = () => { },
    setAddNoteType = () => { },
    addNoteType = null
}): JSX.Element => {

        return (
            <View style={styles.wrapper}>
                <View style={[styles.flexRow]}>
                    <Text style={styles.titleText}>{name}</Text>
                    {isShowEdit && (
                        <ImageButton
                            imageSource={assets.images.editIcon}
                            onClick={() => onEditClick()}
                            imageStyle={styles.editButtonStyle}
                        />)}
                </View>

                <Spacer size={1} />
                <Divider />
                <Spacer size={2} />
                <PressableText
                    disabled={!isClickable}
                    onPress={() => onClick()}>
                    <View style={[styles.flexRow]}>
                        <View style={[styles.flexRow, { justifyContent: "flex-start" }]}>
                            <ImageButton
                                imageSource={assets.images.plusIcon}
                                onClick={() => setAddNoteType(AddCategoryNoteType.PLUS)}
                                imageStyle={styles.imageStyle}
                            />
                            <ImageButton
                                imageSource={assets.images.minusIcon}
                                onClick={() => {
                                    setAddNoteType(AddCategoryNoteType.MINUS);
                                }}
                                imageStyle={[styles.imageStyle, {
                                    marginLeft: normalize(15)
                                }]}
                            />
                        </View>

                        <View style={[styles.flexRow, { justifyContent: "flex-start" }]}>
                            <Text style={[styles.amountText, { color: getColorByAmount(String(amount)) }]}>{getAmount(String(amount))}</Text>
                            {isClickable && (
                                <ImageButton
                                    imageSource={assets.images.rightArrow}
                                    onClick={() => { }}
                                    imageStyle={styles.arrowStyle}
                                />
                            )}
                        </View>
                    </View>
                    {addNoteType && (
                        <View>
                            <Spacer size={3} />
                            <InputFieldWithText
                                type={addNoteType}
                                onAction={val => {
                                    setAddNoteType(val);
                                    if (val) onClick(val);
                                }}
                                text={String(amountDescription)}
                                setText={val => setAmountDescription(val)}
                                value={String(amountForNote)}
                                onChangeHandler={val => setAmountForNote(String(val))}
                            />
                        </View>
                    )}

                </PressableText>
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
        marginBottom: normalize(22)
    },
    imageStyle: {
        width: normalize(40),
        height: normalize(40),
        resizeMode: "cover"
    },
    arrowStyle: {
        width: normalize(20),
        height: normalize(20),
        resizeMode: "contain"
    },
    amountText: {
        color: colors.primaryColor,
        fontFamily: assets.fonts.SEMI_BOLD,
        fontSize: normalize(27),
        lineHeight: normalize(32)
    },
    titleText: {
        fontSize: normalize(18),
        fontFamily: assets.fonts.MEDIUM,
        color: colors.black,
        lineHeight: normalize(20)
    },
    editButtonStyle: {
        width: normalize(16),
        height: normalize(16),
        resizeMode: "contain"
    }
});

export default ListItem;