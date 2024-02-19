/**
 * @file - Modal.tsx
 * @author Ashish Chauhan
 */

import React, { PropsWithChildren, memo } from "react";
import {
    Dimensions,
    ModalProps,
    Modal as RNModal,
    StyleSheet,
    View
} from "react-native";
import colors from "../../constants/colors";

const {
    width,
} = Dimensions.get("window");

const Modal: React.FC<PropsWithChildren<ModalProps>> =
    ({
        children,
        visible: modalVisible,
        onRequestClose
    }): JSX.Element => {
        return (
            <RNModal
                animationType="slide"
                transparent={true}
                onRequestClose={onRequestClose}>
                <View
                    style={styles.wrapper}>
                    <View style={styles.roundedview}>
                        {children}
                    </View>
                </View>
            </RNModal>
        )
    }

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    roundedview: {
        paddingTop: 10,
        paddingBottom: 20,
        paddingLeft: 20,
        paddingRight: 20,
        borderRadius: 20,
        width: width - 40,
        backgroundColor: '#fff',
    },
    wrapper: {
        flex: 1,
        alignContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.transparentGrey,
        justifyContent: 'center',
    }
});

export default memo(Modal);