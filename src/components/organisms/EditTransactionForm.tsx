/**
 * @file EditTransactionForm.tsx
 * @author Ashish Chauhan
 */
import React from "react";
import { EditTransactionFormProps } from "../../constants/types";
import { Platform, StyleSheet, View } from "react-native";
import { InputField } from "../molecules";
import translations from "../../locals";
import { Button, PressableText, Text } from "../atoms";
import { Spacer } from "native-base";
import colors from "../../constants/colors";
import { normalize } from "../../utils/normalizeHeightwidth";
import assets from "../../assets";
import NumberField from "../molecules/NumberField";


const EditTransactionForm: React.FC<EditTransactionFormProps> = ({
    onNoteChangeHandler,
    onTransactionChangeHandler,
    note,
    transaction,
    onSubmit,
    onCancel,
    noteError,
    transactionError
}): JSX.Element => {

    return (
        <View>
            <InputField
                label={translations.NOTE}
                onChangeHandler={onNoteChangeHandler}
                value={note}
                placeholder={translations.NOTE}
                isError={noteError}
            />
            <View style={{}}>
                {transaction.trim().length > 0 && (<Text style={styles.currencyText}>$</Text>)}
                <NumberField
                    label={translations.AMOUNT}
                    onChangeHandler={onTransactionChangeHandler}
                    value={transaction}
                    placeholder={translations.AMOUNT}
                    isError={transactionError}
                    fieldStyle={transaction.trim().length > 0 ? {
                        marginLeft: 12
                    } : {}}
                />
            </View>
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
    },
    currencyText: {
        position: "absolute",
        fontSize: normalize(16),
        lineHeight: normalize(22),
        left: normalize(19),
        top: Platform.OS === "android" ? normalize(30) : normalize(26),
        zIndex: 9999
    }
});

export default EditTransactionForm;