/**
 * @file settings/index.tsx
 * @author Ashish Chauhan
 */

import React, { useState } from "react";
import {
    Image,
    PressableText,
    ScrollView,
    Spacer
} from "../../atoms";
import translations from "../../../locals";
import { styles } from "./styles";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList, Routes } from "../../../constants/types";
import ContainerWithHeader from "../../templates/ContainerWithHeader";
import { Alert, View } from "react-native";
import { IconTextButton, ImageTextButton } from "../../molecules";
import assets from "../../../assets";
import { Divider } from "native-base";
import { colors } from "../../../constants";
import { normalize } from "../../../utils/normalizeHeightwidth";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/reducers";
import { useFocusEffect } from "@react-navigation/native";
import { clearStorage } from "../../../utils/utility";
import { getUserDetails, logoutUser } from "../../../store/actions/loginAction";
import { deleteUserAction, privacyPolicyAction, termsAction, uploadImageAction } from "../../../store/actions/profileAction";
import { OptionsCommon, launchImageLibrary } from 'react-native-image-picker';
import { updateAuthToken } from "../../../libs/Api";
import PrivacyTermsModal from "../../organisms/PrivacyTermsModal";

type Props = NativeStackScreenProps<RootStackParamList>;

const SettingsPage = ({
    navigation
}: Props): JSX.Element => {
    const dispatch = useDispatch();
    const userProfile = useSelector((state: RootState) => state.login.userData);
    const [name, setname] = useState<String>("");
    const [email, setemail] = useState<String>("");
    const [number, setnumber] = useState<String>("");
    const [userImage, setuserImage] = useState<String>("");
    const [modalHeading, setmodalHeading] = useState<String>("");
    const [modalContent, setmodalContent] = useState<String>("");
    const [imageURI, setimageURI] = useState<{
        uri: string
    } | null>(null);
    const [showModal, setShowModal] = useState<boolean>(false);

    const logoutUserHandler = async () => {
        await clearStorage();
        await dispatch(logoutUser());
        await updateAuthToken("");
    }

    const getPrivacyPolicy = async () => {
        await dispatch(privacyPolicyAction((res) => onSuccess(res, translations.PRIVACY)))
    }

    const getTermsConditions = async () => {
        await dispatch(termsAction((res) => onSuccess(res, translations.TERMS)))
    }

    const onSuccess = (result: any, type = "") => {
        console.log(result);

        if (result) {
            if (type === translations.PRIVACY) {
                setmodalHeading(type);
                setmodalContent(result.privacy_policy);
                setShowModal(true);
            }

            if (type === translations.TERMS) {
                setmodalHeading(type);
                setmodalContent(result.terms_conditions);
                setShowModal(true);
            }
        }
    }

    const imageUploadSuccess = async (res: any) => {
        if (res) {
            await dispatch(getUserDetails());
        }
    }

    const selectImageHandler = async () => {

        const options: OptionsCommon = {
            mediaType: "photo",
            presentationStyle: "popover",
            quality: 0.3
        }

        await launchImageLibrary(options, async res => {
            console.log("res >>>", res);
            if (res.assets) {
                setimageURI({ uri: String(res.assets[0].uri) });
                const formData = new FormData();
                formData.append("user_image", {
                    uri: res.assets[0].uri,
                    type: res.assets[0].type,
                    name: res.assets[0].fileName,
                });

                await dispatch(uploadImageAction(formData, imageUploadSuccess));
            }
        });
    }

    const onDeleteSuccess = (result: any) => {
        console.log("Delete result", result)
    }

    const deleteUserHandler = async () => {
        Alert.alert(
            translations.DELETE_ACCOUNT_CONFIRMATION_HEADING,
            translations.DELETE_ACCOUNT_CONFIRMATION_MESSAGE,
            [
                {
                    text: translations.DELETE,
                    style: "destructive",
                    onPress: async () => {
                        const action = deleteUserAction(onDeleteSuccess);
                        await dispatch(action);
                    },
                },
                {
                    text: translations.CANCEL,
                    style: 'cancel',
                },
            ]
        )
    }

    useFocusEffect(
        React.useCallback(() => {
            const username = `${userProfile?.name || "--"} ${userProfile?.last_name || ""}`;
            setname(username);
            setemail(userProfile?.email);
            setnumber(userProfile?.phone_num);
            if (userProfile?.profile_img && userProfile?.profile_img.trim().length > 0) {
                setimageURI({ uri: userProfile?.profile_img });
            }
            console.log(JSON.stringify(userProfile, null, 1));
        }, [userProfile])
    );

    return (
        <ContainerWithHeader>
            {showModal && (
                <PrivacyTermsModal
                    setShowModal={setShowModal}
                    showModal={showModal}
                    heading={String(modalHeading)}
                    content={String(modalContent)}
                />
            )}
            <ScrollView
                contentContainerStyle={{
                    flex: 1
                }}
                style={{
                    // flex: 1,
                }}>
                <View style={{
                }}>
                    <PressableText
                        onPress={selectImageHandler}
                        style={{
                            alignItems: "center"
                        }}>
                        <Image
                            source={imageURI ?? assets.images.user}
                            style={{
                                width: normalize(80),
                                height: normalize(80),
                                resizeMode: "cover",
                                borderRadius: normalize(15),
                                backgroundColor: colors.transparentGrey
                            }}
                        />
                        <Image
                            source={assets.images.upload}
                            style={{
                                width: normalize(20),
                                height: normalize(20),
                                tintColor: colors.primaryColor,
                                position: "absolute",
                                bottom: -10
                            }}
                        />
                    </PressableText>
                    <Spacer size={30} />
                    <ImageTextButton
                        imageSource={assets.images.userNameIcon}
                        buttonText={String(name)}
                        onClick={() => { }}
                        imageStyle={{
                            height: normalize(20),
                            width: normalize(20)
                        }}
                    />
                    <ImageTextButton
                        imageSource={assets.images.emailIcon}
                        buttonText={String(email)}
                        onClick={() => { }}
                        imageStyle={{
                            height: normalize(20),
                            width: normalize(20)
                        }}
                    />
                    <ImageTextButton
                        imageSource={assets.images.phoneIcon}
                        buttonText={`+1-${number}`}
                        onClick={() => { }}
                        imageStyle={{
                            height: normalize(20),
                            width: normalize(20)
                        }}
                    />
                </View>
                <Divider style={{
                    marginTop: 5
                }} />
                <Spacer size={15} />
                <ImageTextButton
                    buttonText={translations.CHANGE_PASSWORD}
                    imageSource={assets.images.privacy}
                    imageStyle={{
                        tintColor: colors.primaryColor
                    }}
                    onClick={() => navigation.navigate(Routes.CHANGE_PASSWORD)}
                />
                <Divider style={{
                    marginTop: 5
                }} />
                <Spacer size={15} />
                <ImageTextButton
                    buttonText={translations.PRIVACY}
                    imageSource={assets.images.privacy}
                    imageStyle={{
                        tintColor: colors.primaryColor
                    }}
                    onClick={getPrivacyPolicy}
                />
                <Divider style={{
                    marginTop: 5
                }} />
                <Spacer size={15} />
                <ImageTextButton
                    buttonText={translations.TERMS}
                    imageSource={assets.images.terms}
                    imageStyle={{
                        tintColor: colors.primaryColor
                    }}
                    onClick={getTermsConditions}
                />
                <View style={styles.bottomContentContainer}>
                    <Divider style={{
                        marginVertical: 10
                    }} />
                    <ImageTextButton
                        buttonText={translations.DELETE_ACCOUNT}
                        imageSource={assets.images.deleteIcon}
                        imageStyle={{
                            // tintColor: colors.danger
                        }}
                        onClick={deleteUserHandler}
                    />
                    <Divider style={{
                        marginVertical: 10
                    }} />
                    <ImageTextButton
                        buttonText={translations.LOGOUT}
                        imageSource={assets.images.logout}
                        onClick={logoutUserHandler}
                    />
                </View>
            </ScrollView>
        </ContainerWithHeader>

    )
};

export default SettingsPage;