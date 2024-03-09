/**
 * @file EditCategoryModal.tsx
 * @author Ashish Chauhan
 */

import React from "react";
import { Modal, Text } from "../atoms"
import EditCategoryForm from "./EditCategoryForm"
import { StyleSheet, View } from "react-native";
import { normalize } from "../../utils/normalizeHeightwidth";
import { ImageButton } from "../molecules";
import assets from "../../assets";
import translations from "../../locals";
import colors from "../../constants/colors";

interface EditCategoryModalProps {
    showEditModal?: boolean
    setShowEditModal: (val: boolean) => void;
    categoryValue: string,
    setCategoryValue: (val: string) => void;
    onSubmit: () => void;
    error?: string
}

const EditCategoryModal: React.FC<EditCategoryModalProps> = ({
    showEditModal,
    setShowEditModal,
    categoryValue,
    setCategoryValue,
    onSubmit,
    error
}) => {

    return (
        <Modal
            visible={showEditModal}
            onRequestClose={() => setShowEditModal(false)}>
            <ImageButton
                imageSource={assets.images.crossIcon}
                onClick={() => setShowEditModal(false)}
                imageStyle={styles.crossIconStyle}
            />
            <Text style={styles.headingText}>{translations.EDIT_CATEGORY}</Text>
            <View style={styles.subWrapper}>
                <EditCategoryForm
                    category={categoryValue}
                    onChangeHandler={(text) => setCategoryValue(String(text))}
                    onSubmit={() => onSubmit()}
                    onCancel={() => setShowEditModal(false)}
                    isError={error}
                />
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
        textAlign:"center",
        fontFamily: assets.fonts.SEMI_BOLD,
        fontSize: normalize(15.5)
    }
})

export default EditCategoryModal;