/**
 * @file manageExpensesPage/index.tsx
 * @author Ashish Chauhan
 */

import React, { useEffect, useState } from "react";
import {
    Flatlist,
    ListItem,
    ScrollView,
    Text
} from "../../atoms";
import translations from "../../../locals";
import { styles } from "./styles";
import { Alert, Keyboard, TouchableNativeFeedback, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AddCategoryNoteType, CategoryItems, CategoryPayInfoItem, RootStackParamList, TextInputVal, ToastType } from "../../../constants/types";
import ContainerWithHeader from "../../templates/ContainerWithHeader";
import EditCategoryModal from "../../organisms/EditCategoryModal";
import { useDispatch, useSelector } from "react-redux";
import { addCategoryNoteAction, deleteCategoryAction, getCategoryByIdAction, updateCategoryAction } from "../../../store/actions/categoryAction";
import { showToast } from "../../../utils/utility";
import CategorySubItem from "../../organisms/CategorySubItem";
import { RootState } from "../../../store/reducers";

type Props = NativeStackScreenProps<RootStackParamList>;

interface CategoryItemProp {
    item: CategoryItems; // Replace YourItemType with the actual type of 'item'
    type: AddCategoryNoteType
}

const ManageExpensesPage = ({
    navigation,
    route
}: Props): JSX.Element => {
    const dispatch = useDispatch();
    const navigateBack = () => navigation.goBack();
    const isLoading = useSelector((state: RootState) => state.login.loading);

    const [showEditModal, setShowEditModal] = useState(false);
    const [addNoteType, setAddNoteType] = React.useState<AddCategoryNoteType | null>(null);
    const [categoryItem, setCategoryItem] = useState<CategoryItems | null>(null);
    const [categoryPayInfo, setCategoryPayInfo] = useState<CategoryPayInfoItem[] | null>(null);
    const [categoryValue, setCategoryValue] = useState("");
    const [categoryAmount, setCategoryAmount] = useState<TextInputVal>("");
    const [categoryDescription, setCategoryDescription] = useState<TextInputVal>("");
    const [categoryError, setCategoryError] = useState("");
    const { item, type } = route.params as CategoryItemProp;


    const editCategoryHandler = async () => {
        setCategoryError("");
        if (categoryValue.trim().length === 0) {
            setCategoryError(translations.CATEGORY_VALIDATION);
            return;
        }

        setShowEditModal(false);

        const params = {
            name: categoryValue,
            id: categoryItem?.id
        }
        console.log(params);
        const action = updateCategoryAction(params, onAddSuccess);
        await dispatch(action);
    }

    const getCategoryDetails = async () => {
        const params = {
            id: item.id
        }

        const action = getCategoryByIdAction(params, onGetSuccess);
        await dispatch(action);
    }

    const onGetSuccess = (result: CategoryItems) => {
        console.log("result >>>>", result);
        if (result) {
            setCategoryValue(result.name);
            setCategoryItem(result);
            if (Array.isArray(result.payInfo)) {
                setCategoryPayInfo(result.payInfo);
            }
        }
    }

    const addNoteHandler = async (type: AddCategoryNoteType) => {
        if (!checkIfValidated()) return;
        const params = {
            amount: categoryAmount,
            title: categoryDescription,
            type: type,
            id: item?.id
        }

        const action = addCategoryNoteAction(params, onAddSuccess);
        await dispatch(action);
    }

    const onAddSuccess = (result: any) => {
        console.log("result Add >>>>", result);
        if (result) {
            setCategoryAmount("");
            setCategoryDescription("");
            getCategoryDetails();
            setAddNoteType(null);
        }
    }

    const checkIfValidated = () => {
        if (String(categoryAmount).trim().length === 0) {
            showToast(translations.AMOUNT_ERROR, ToastType.ERROR);
            return false;
        }

        if (String(categoryDescription).trim().length === 0) {
            showToast(translations.DESCRIPTION_ERROR, ToastType.ERROR);
            return false;
        }

        return true;
    }

    const deleteActionHandler = async () => {
        const params = {
            id: item.id
        }

        await dispatch(deleteCategoryAction(params, onDeleteAccess))
    }

    const onDeleteAccess = (res : any) => {
        if(res){
            navigation.pop();
        }
    }

    const onDeleteCategory = () => {
        Alert.alert(
            translations.DELETE_CATEGORY,
            translations.DELETE_CATEGORY_MESSAGE,
            [
                {
                    text: translations.DELETE,
                    style: "destructive",
                    onPress: () => deleteActionHandler(),
                },
                {
                    text: translations.CANCEL,
                    style: 'cancel',
                },
            ]
        )
    }

    useEffect(() => {
        getCategoryDetails();
        if (type) {
            setAddNoteType(type);
        }
    }, []);

    const _renderItems = (
        item: any
    ) => (
        <CategorySubItem
            item={item}
        />
    )


    return (
        <ContainerWithHeader
            isShowHeader={true}
            showFooter={true}
            onDeleteCategory={onDeleteCategory}
            navigateBack={navigateBack}>
            {showEditModal && (
                <EditCategoryModal
                    setShowEditModal={(val) => setShowEditModal(val)}
                    setCategoryValue={(text) => setCategoryValue(text)}
                    categoryValue={categoryValue}
                    onSubmit={editCategoryHandler}
                    error={categoryError}
                />
            )}
            <ScrollView
                onRefresh={() => getCategoryDetails()}
                style={{
                    marginHorizontal: -20
                }}>
                {categoryItem && (
                    <View style={{
                        marginHorizontal: 20
                    }}>
                        <ListItem
                            name={categoryItem.name}
                            amount={categoryItem.totalAmt}
                            isClickable={false}
                            isShowEdit={true}
                            onEditClick={() => setShowEditModal(true)}
                            amountDescription={categoryDescription}
                            amountForNote={`${categoryAmount}`}
                            setAmountDescription={(val) => setCategoryDescription(val)}
                            setAmountForNote={(val) => setCategoryAmount(`${val}`)}
                            onClick={(type) => type ? addNoteHandler(type) : {}}
                            setAddNoteType={(val) => setAddNoteType(val)}
                            addNoteType={addNoteType}
                        />
                        <View style={styles.sepatorWrapper}>
                            <Text style={styles.transactionText}>{translations.ALL_TRANSACTIONS}</Text>
                        </View>

                        <View style={styles.transactionsWrapper}>
                            {categoryPayInfo ? (
                                <Flatlist
                                    data={categoryPayInfo}
                                    renderItem={({ item }) => _renderItems(item)}
                                    scrollEnabled={true}
                                    keyExtractor={(item) => String(item.id)}
                                />
                            ) : (
                                <Text style={styles.emptyText}>{translations.NO_TRANSACTIONS_MESSAGE}</Text>
                            )}
                        </View>
                    </View>
                )}
            </ScrollView>
        </ContainerWithHeader>

    )
};

export default ManageExpensesPage;