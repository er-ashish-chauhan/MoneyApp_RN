/**
 * @file addCategoryPage/index.tsx
 * @author Ashish Chauhan
 */

import React from "react";
import translations from "../../../locals";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList, Routes } from "../../../constants/types";
import ContainerWithHeader from "../../templates/ContainerWithHeader";
import AddCategoryForm from "../../organisms/AddCategoryForm";
import { addCategoryAction } from "../../../store/actions/categoryAction";
import { useDispatch } from "react-redux";
import { CommonActions } from "@react-navigation/native";

type Props = NativeStackScreenProps<RootStackParamList>;

const AddCategoryPage = ({
    navigation
}: Props): JSX.Element => {
    const dispatch = useDispatch();
    const [category, setCategory] = React.useState("");
    const [validationErr, setValidationErr] = React.useState("");

    const addCategoryHandler = () => {
        setValidationErr("");
        if (category.trim().length === 0) {
            setValidationErr(translations.ADD_CATEGORY_VALIDATION);
            return;
        }

        const params = {
            name: category
        }

        dispatch(addCategoryAction(params, onSuccess));
    }

    const onSuccess = (result: any) => {
        console.log(result);
        setCategory("");
        navigation.navigate(Routes.HOME);
    }

    return (
        <ContainerWithHeader>
            <AddCategoryForm
                category={category}
                setCategoryValue={setCategory}
                onSubmit={() => addCategoryHandler()}
                categoryValidationError={validationErr}
            />
        </ContainerWithHeader>

    )
};

export default AddCategoryPage;