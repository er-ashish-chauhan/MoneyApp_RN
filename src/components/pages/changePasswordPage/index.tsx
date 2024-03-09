/**
 * @file changePasswordPage/index.tsx
 * @author Ashish Chauhan
 */

import React, { useEffect } from "react";
import {
    BackButton,
    Text
} from "../../atoms";
import Container from "../../templates/Container";
import translations from "../../../locals";
import { styles } from "./styles";
import { View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../constants/types";
import { Spacer } from "native-base";
import ForgotPasswordForm from "../../organisms/ForgotPasswordForm";
import { emailRegex } from "../../../utils/utility";
import ChangePasswordForm from "../../organisms/ChangePasswordForm";
import { useDispatch } from "react-redux";
import { changePasswordAction } from "../../../store/actions/profileAction";
type Props = NativeStackScreenProps<RootStackParamList>;

const ChangePassword = ({
    navigation
}: Props): JSX.Element => { 
    const dispatch = useDispatch();
    const [currentpassword, setcurrentpassword] = React.useState<string>("");
    const [newpassword, setnewpassword] = React.useState<string>("");
    const [confirmnewpassword, setconfirmnewpassword] = React.useState<string>("");
    const [passwordValidationError, setpasswordValidationError] = React.useState<string>("");
    const [newPasswordValidationError, setnewPasswordValidationError] = React.useState<string>("");
    const [confirmNewValidationError, setconfirmNewValidationError] = React.useState<string>("");

    const isValidForm = (): boolean => {
        let flag = true;
        setpasswordValidationError("");
        setnewPasswordValidationError("");
        setconfirmNewValidationError("");
        if (currentpassword.trim().length === 0) {
            setpasswordValidationError(translations.CURRENT_PASSWORD_VALIDATION);
            flag = false;
        }

        if (newpassword.trim().length === 0) {
            setnewPasswordValidationError(translations.NEW_PASSWORD_VALIDATION);
            flag = false;
        }

        if (confirmnewpassword.trim().length === 0) {
            setconfirmNewValidationError(translations.CONFIRM_NEW_PASSWORD_VALIDATION);
            flag = false;
        }

        if (newpassword.trim() !== confirmnewpassword.trim()) {
            setconfirmNewValidationError(translations.PASSWORD_NOT_MATCHED);
            flag = false;
        }
        return flag
    }

    const submitHandler = async () => {
        if (!isValidForm()) return;
        const params = {
            current_password: currentpassword,
            new_password: newpassword,
            password_confirmation: confirmnewpassword
        }
        console.log("forgotparams >>", params);

        await dispatch(changePasswordAction(params, onSuccess))
    }

    const onSuccess = (result: any) => {
        console.log(result, "res...");
        if(result){
            navigation.goBack();
        }
    }

    const navigateBack = (): void => navigation.pop();

    return (
        <Container>
            <View style={styles.wrapper}>
                <BackButton
                    onPress={navigateBack} />
                <Spacer size={5} />
                <Text style={styles.pageTitle}>{translations.CHANGE_PASSWORD}</Text>
                <ChangePasswordForm
                    currentpassword={currentpassword}
                    setCurrentPassword={setcurrentpassword}
                    setConfirmPassword={setconfirmnewpassword}
                    setNewPassword={setnewpassword}
                    onSubmit={submitHandler}
                    currentPwdValidationError={passwordValidationError}
                    newpassword={newpassword}
                    newPwdValidationError={newPasswordValidationError}
                    confirmPwdValidationError={confirmNewValidationError}
                    confirmpassword={confirmnewpassword}
                    onCancel={() => navigation.goBack()}
                />
            </View>
        </Container>
    )
}

export default ChangePassword;