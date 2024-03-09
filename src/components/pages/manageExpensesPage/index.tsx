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
import { Alert, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AddCategoryNoteType, CategoryItems, CategoryPayInfoItem, ListActions, RootStackParamList, TextInputVal, ToastType } from "../../../constants/types";
import ContainerWithHeader from "../../templates/ContainerWithHeader";
import EditCategoryModal from "../../organisms/EditCategoryModal";
import { useDispatch } from "react-redux";
import { addCategoryNoteAction, deleteCategoryAction, deleteTransctionAction, getCategoryByIdAction, updateCategoryAction, updateTransactionAction } from "../../../store/actions/categoryAction";
import { showToast } from "../../../utils/utility";
import CategorySubItem from "../../organisms/CategorySubItem";
import EditTransactionModal from "../../organisms/EditTransactionModal";

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
    // const isLoading = useSelector((state: RootState) => state.login.loading);

    const [showEditModal, setShowEditModal] = useState(false);
    const [showEditTransactionModal, setShowEditTransactionModal] = useState(false);
    const [addNoteType, setAddNoteType] = React.useState<AddCategoryNoteType | null>(null);
    const [categoryItem, setCategoryItem] = useState<CategoryItems | null>(null);
    const [categoryPayInfo, setCategoryPayInfo] = useState<CategoryPayInfoItem[] | null>(null);
    const [selectedTransaction, setSelecteTransaction] = useState<CategoryPayInfoItem | null>(null);
    const [transaction, setTransaction] = useState<TextInputVal>("");
    const [note, setNote] = useState<TextInputVal>("");
    const [categoryValue, setCategoryValue] = useState("");
    const [categoryAmount, setCategoryAmount] = useState<TextInputVal>("");
    const [categoryDescription, setCategoryDescription] = useState<TextInputVal>("");
    const [categoryError, setCategoryError] = useState("");
    const [noteError, setNoteError] = useState("");
    const [transactionError, setTransactionError] = useState("");
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
        // console.log("result Add >>>>", result);
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

    const deleteTransactionHandler = async (transactionId: number) => {
        const params = {
            id: transactionId
        }

        await dispatch(deleteTransctionAction(params, onDeleteTransctionAccess))
    }

    const onDeleteAccess = (res: any) => {
        if (res) {
            navigation.pop();
        }
    }

    const onDeleteTransctionAccess = (res: any) => {
        if (res) {
            getCategoryDetails();
        }
    }

    const onUpdateTransactionSuccess = (res: any) => {
        if (res) {
            getCategoryDetails();
        }
    }

    const editTransactionHandler = async () => {
        setNoteError("");
        setTransactionError("");
        if (String(note).trim().length === 0 && String(transaction).trim().length === 0) {
            setNoteError(translations.NOTE_VALIDATION);
            setTransactionError(translations.TRANSACTION_VALIDATION);
            return;
        }

        if (String(note).trim().length === 0) {
            setNoteError(translations.NOTE_VALIDATION);
            return;
        }

        if (String(transaction).trim().length === 0) {
            setTransactionError(translations.TRANSACTION_VALIDATION);
            return;
        }

        setShowEditTransactionModal(false);

        const params = {
            amount: transaction,
            title: note,
            type: selectedTransaction?.type,
            id: selectedTransaction?.id
        }
        // console.log(params);
        const action = updateTransactionAction(params, onUpdateTransactionSuccess);
        await dispatch(action);
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

    const onDeleteSubCategory = (transactionId: number) => {
        Alert.alert(
            translations.DELETE_TRANSACTION,
            translations.DELETE_TRANSACTION_MESSAGE,
            [
                {
                    text: translations.DELETE,
                    style: "destructive",
                    onPress: () => deleteTransactionHandler(transactionId),
                },
                {
                    text: translations.CANCEL,
                    style: 'cancel',
                },
            ]
        )
    }

    const onListClickHandler = async (type: number, transaction: CategoryPayInfoItem) => {
        if (type == ListActions.EDIT) {
            await setSelecteTransaction(transaction);
            await setTransaction(transaction.amount);
            await setNote(transaction.title);
            setShowEditTransactionModal(true);
        } else {
            onDeleteSubCategory(transaction?.id)
        }

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
            onClick={onListClickHandler}
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
            {showEditTransactionModal && (
                <EditTransactionModal
                    setShowEditModal={(val) => setShowEditTransactionModal(val)}
                    setCategoryValue={(text) => setNote(text)}
                    categoryValue={String(note)}
                    onSubmit={editTransactionHandler}
                    transaction={String(transaction)}
                    error={noteError}
                    transactionError={transactionError}
                    setTransactionValue={(text) => setTransaction(text)}
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