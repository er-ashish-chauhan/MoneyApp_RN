/**
 * @file EditTransactionModal.tsx
 * @author Ashish Chauhan
 */

import React from "react";
import { Modal, Text } from "../atoms";
import { StyleSheet, View } from "react-native";
import { normalize } from "../../utils/normalizeHeightwidth";
import { ImageButton } from "../molecules";
import assets from "../../assets";
import translations from "../../locals";
import colors from "../../constants/colors";
import EditTransactionForm from "./EditTransactionForm";

interface EditTransactionModalProps {
    showEditModal?: boolean
    setShowEditModal: (val: boolean) => void;
    categoryValue: string,
    setCategoryValue: (val: string) => void;
    setTransactionValue: (val: string) => void;
    onSubmit: () => void;
    transaction: string;
    error?: string;
    transactionError?: string;
}

const EditTransactionModal: React.FC<EditTransactionModalProps> = ({
    showEditModal,
    setShowEditModal,
    categoryValue,
    setCategoryValue,
    transaction,
    setTransactionValue,
    onSubmit,
    transactionError,
    error
}) => {

    return (
        <Modal
            visible={showEditModal}
            onRequestClose={() => setShowEditModal(false)}>
            <View>
                <ImageButton
                    imageSource={assets.images.crossIcon}
                    onClick={() => setShowEditModal(false)}
                    imageStyle={styles.crossIconStyle}
                />
                <Text style={styles.headingText}>{translations.EDIT_TRANSACTION}</Text>
                <View style={styles.subWrapper}>
                    <EditTransactionForm
                        note={categoryValue}
                        onNoteChangeHandler={(text) => setCategoryValue(String(text))}
                        onSubmit={() => onSubmit()}
                        onCancel={() => setShowEditModal(false)}
                        noteError={error}
                        transaction={transaction}
                        transactionError={transactionError}
                        onTransactionChangeHandler={(text) => setTransactionValue(String(text))}
                    />
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    subWrapper: {
        paddingVertical: normalize(20)
    },
    crossIconStyle: {
        width: normalize(14),
        height: normalize(14),
        alignSelf: "flex-end",
        marginTop: normalize(10)
    },
    headingText: {
        color: colors.black,
        textAlign: "center",
        fontFamily: assets.fonts.SEMI_BOLD,
        fontSize: normalize(15.5)
    }
})

export default EditTransactionModal;