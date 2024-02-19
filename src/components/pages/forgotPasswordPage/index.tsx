/**
 * @file LoginPage/index.tsx
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
import { useDispatch } from "react-redux";
import { forgotPwdRequest } from "../../../store/actions/loginAction";
type Props = NativeStackScreenProps<RootStackParamList>;

const ForgotPassword = ({
    navigation
}: Props): JSX.Element => {
    const dispatch = useDispatch();
    const [email, setEmail] = React.useState<string>("");
    const [emailValidationError, setEmailValidationError] = React.useState<string>("");

    const isValidForm = (): boolean => {
        let flag = true;
        setEmailValidationError("");
        if (email.trim().length === 0) {
            setEmailValidationError(translations.EMAIL_LOGIN_VALIDATION);
            flag = false;
        }
        return flag
    }

    const submitHandler = async () => {
        if (!isValidForm()) return;
        const params = {
            email
        }
        console.log("forgotparams >>", params)

        await dispatch(forgotPwdRequest(params, onSuccess));
    }

    const onSuccess = (result: any) => {
        console.log("Res..", result);
        if(result){
            navigation.goBack();
        }
    }

    const navigateBack = (): void => navigation.pop();

    useEffect(() => {
        if (email.trim().length > 0 && !emailRegex.test(email)) {
            setEmailValidationError(translations.EMAIL_VALIDATION)
        } else setEmailValidationError("");
    }, [email]);

    return (
        <Container>
            <View style={styles.wrapper}>
                <BackButton
                    onPress={navigateBack} />
                <Spacer size={5} />
                <Text style={styles.pageTitle}>{translations.FORGOT_PASSWORD}</Text>
                <ForgotPasswordForm
                    email={email}
                    setEmail={setEmail}
                    onSubmit={submitHandler}
                    emailValidationError={emailValidationError}
                />
            </View>
        </Container>
    )
}

export default ForgotPassword;