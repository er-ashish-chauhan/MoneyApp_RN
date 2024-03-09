/**
 * @file PrivacyTermsModal.tsx
 * @author Ashish Chauhan
 */

import React, { useState } from "react";
import { Modal, ScrollView, Text } from "../atoms"
import { Dimensions, StyleSheet } from "react-native";
import { normalize } from "../../utils/normalizeHeightwidth";
import { ImageButton } from "../molecules";
import assets from "../../assets";
import colors from "../../constants/colors";
import WebView from 'react-native-webview';
interface PrivacyTermsModalProps {
    showModal?: boolean
    setShowModal: (val: boolean) => void;
    content: string,
    heading: string,
}

const {
    height,
    width
} = Dimensions.get("screen");

const PrivacyTermsModal: React.FC<PrivacyTermsModalProps> = ({
    showModal,
    setShowModal,
    content,
    heading
}) => {
    const [loadingWeb, setLoadingWeb] = useState(false);
    return (
        <Modal
            visible={showModal}
            onRequestClose={() => setShowModal(false)}>
            <ImageButton
                imageSource={assets.images.crossIcon}
                onClick={() => setShowModal(false)}
                imageStyle={styles.crossIconStyle}
            />
            <Text style={styles.headingText}>{heading}</Text>

            <ScrollView
                contentContainerStyle={{
                    height: height * 0.75
                }}
                style={styles.subWrapper}>
                {/* <Text>{content}</Text> */}
                <WebView
                  style={{
                    // height: 120
                  }}
                  focusable
                  minimumFontSize={38}
                  setDisplayZoomControls={true}
                  originWhitelist={['*']}
                  nestedScrollEnabled={true}
                  scrollEnabled={true}
                  onLoadStart={() => setLoadingWeb(true)}
                  onLoadEnd={() => setLoadingWeb(false)}
                  source={{
                    html: content,
                  }}
                />
            </ScrollView>
        </Modal>
    )
}

const styles = StyleSheet.create({
    subWrapper: {
        paddingVertical: normalize(20),
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
        fontFamily: assets.fonts.SEMI_BOLD
    }
})

export default PrivacyTermsModal;