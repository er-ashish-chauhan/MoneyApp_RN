/**
 * @file InputFieldWithText.tsx
 * @author Ashish Chauhan
 */
import React from "react";
import { Platform, StyleSheet, View } from "react-native";
import { styles } from "./styles";
import { AddCategoryNoteType, FieldProps } from "../../constants/types";
import { Button, Text, TextInput } from "../atoms";
import { Divider, Spacer } from "native-base";
import translations from "../../locals";
import { normalize } from "../../utils/normalizeHeightwidth";
import { colors } from "../../constants";
import assets from "../../assets";


const InputFieldWithText: React.FC<FieldProps> = ({
    onChangeHandler = () => { },
    value = "",
    placeholder = translations.AMOUNT,
    isError = "",
    type = null,
    onAction = () => { },
    setText = () => { },
    text = ""
}): JSX.Element => {
    return (
        <View style={styles.wrapper}>
            <View style={[styles.inputContainer,
            {
                paddingVertical: 0,
                height: Platform.OS === "android" ? normalize(100) : normalize(100),
                borderWidth: 2.5,
                borderColor: type === AddCategoryNoteType.MINUS ? colors.danger : colors.primaryColor
            },
            isError.trim().length > 0 ?
                styles.errorContainer : null]}>
                {value.trim().length > 0 && (<Text style={customStyle.currencyText}>$</Text>)}
                <TextInput
                    onChangeText={(val) => onChangeHandler(val)}
                    placeholder={placeholder || ""}
                    value={`${value}`}
                    style={[customStyle.primaryInput, value.trim().length > 0 && {
                        paddingLeft: normalize(13),

                    }]}
                    keyboardType="phone-pad"
                />
                <Divider />

                <TextInput
                    onChangeText={(val) => setText(val)}
                    placeholder={type === AddCategoryNoteType.MINUS ? translations.MINUS_DESCRIPTION :
                        translations.DESCRIPTION}
                    value={text}
                    style={customStyle.secondaryInput}
                />
            </View>

            <Spacer size={4} />
            <View style={styles.flexRowWithSpace}>
                <Button
                    style={[customStyle.submitButton, {
                        backgroundColor:
                            type === AddCategoryNoteType.MINUS ? colors.danger : colors.primaryColor
                    }]}
                    onPress={() => onAction(type)}>
                    <Text style={customStyle.buttonText}>{
                        type === AddCategoryNoteType.PLUS ? translations.ADD_MONEY :
                            translations.SPEND_MONEY}</Text>
                </Button>
                <Button
                    style={customStyle.cancelButton}
                    onPress={() => onAction(null)}>
                    <Text style={customStyle.buttonText}>{translations.CANCEL}</Text>
                </Button>
            </View>
        </View>
    )
}

const customStyle = StyleSheet.create({
    primaryInput: {
        fontSize: normalize(19),
        lineHeight: normalize(22),
        textAlignVertical:"bottom"
    },
    secondaryInput: {
        fontSize: normalize(17),
        lineHeight: normalize(19),
        marginTop: 5,
        fontFamily: assets.fonts.REGULAR
    },
    buttonText: {
        color: colors.white,
        fontSize: normalize(16),
        fontFamily: assets.fonts.SEMI_BOLD
    },
    cancelButton: {
        backgroundColor: colors.lightGrey,
        flex: 0.3
    },
    submitButton: {
        flex: 0.6
    },
    currencyText: {
        position: "absolute",
        fontSize: normalize(19),
        lineHeight: normalize(22),
        left: normalize(10),
        top: Platform.OS === "android" ? normalize(16) : normalize(9.6)
    }
})

export default InputFieldWithText;