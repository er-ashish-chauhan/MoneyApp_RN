/**
 * @file EditCategoryForm.tsx
 * @author Ashish Chauhan
 */
import React from "react";
import { EditCategoryFormProps } from "../../constants/types";
import { StyleSheet, View } from "react-native";
import { InputField } from "../molecules";
import translations from "../../locals";
import { Button, PressableText, Text } from "../atoms";
import { Spacer } from "native-base";
import colors from "../../constants/colors";
import { normalize } from "../../utils/normalizeHeightwidth";
import assets from "../../assets";


const EditCategoryForm: React.FC<EditCategoryFormProps> = ({
    onChangeHandler,
    category,
    onSubmit,
    onCancel,
    isError
}): JSX.Element => {

    return (
        <View>
            <InputField
                label={translations.CATEGORY}
                onChangeHandler={onChangeHandler}
                value={category}
                placeholder={translations.CATEGORY_PLACEHOLDER}
                isError={isError}
            />
            <Spacer size={5} />
            <Button 
                onPress={() => onSubmit()}>
                <Text style={styles.buttonText}>{translations.SUBMIT}</Text>
            </Button>
            <Spacer size={5} />
            <PressableText
                onPress={() => onCancel()}
                style={{
                    alignItems: "center"
                }}>
                <Text style={styles.cancelText}>{translations.CANCEL}</Text>
            </PressableText>
        </View>
    )
}

const styles = StyleSheet.create({
    buttonText: {
        color: colors.white,
        fontSize: normalize(16),
        lineHeight: normalize(18),
        fontFamily: assets.fonts.MEDIUM
    },
    cancelText: {
        color: colors.danger,
        textDecorationLine: "underline",
        fontSize: normalize(15),
        lineHeight: normalize(17),
        fontFamily: assets.fonts.MEDIUM
    }
});

export default EditCategoryForm;