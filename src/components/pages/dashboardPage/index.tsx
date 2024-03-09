/**
 * @file DashboardPage/index.tsx
 * @author Ashish Chauhan
 */

import React, { useState } from "react";
import {
    Flatlist,
    Text,
} from "../../atoms";
import translations from "../../../locals";
import { styles } from "./styles";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AddCategoryNoteType, RootStackParamList, Routes } from "../../../constants/types";
import ContainerWithHeader from "../../templates/ContainerWithHeader";
import ListItem from "../../organisms/ListItem";
import { Divider, Spacer } from "native-base";
import { useFocusEffect } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { getCategoriesAction } from "../../../store/actions/categoryAction";
import { RootState } from "../../../store/reducers";
import { View } from "react-native";
import { CategoryItems } from "../../../constants/types";

type Props = NativeStackScreenProps<RootStackParamList>;


const DashboardPage = ({
    navigation
}: Props): JSX.Element => {
    const dispatch = useDispatch();
    const userProfileData = useSelector((state: RootState) => state.login.userData);
    const isLoading = useSelector((state: RootState) => state.login.loading);
    const [categoriesList, setCategoriesList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [refreshing, setRefreshing] = useState<boolean>(false);
    const [totalPages, setTotalPages] = useState(1);

    const navigateToManageExpenses = (selectedItem: any) => {
        navigation.navigate(Routes.MANAGE_EXPENSES, {
            item: selectedItem
        })
    }

    const getCategories = async (pageNumber: number = 1) => {
        const params = {
            page: pageNumber,
            size: 20
        }
        await dispatch(getCategoriesAction(params, onSuccess));
    }

    const onSuccess = (result: any) => {
        console.log("result...", JSON.stringify(result, null, 1));
        if (result.data.length > 0) {
            setCategoriesList(result.currentPage === 1 ? result.data :
                [...categoriesList,
                ...result.data]);
            setTotalPages(result.totalPages);
            setCurrentPage(result.currentPage);
        }
    }

    const handlerLoadMore = () => {
        if (currentPage < totalPages) {
            getCategories(currentPage + 1)
        }
    }

    const actionButtonsHandler = (type: AddCategoryNoteType, listItem: CategoryItems) => {
        if(type){
            navigation.navigate(Routes.MANAGE_EXPENSES, {
                item: listItem,
                type
            })
        }
    }

    useFocusEffect(
        React.useCallback(() => {
            getCategories();
        }, [])
    )

    const _renderItems = (item: any): JSX.Element => {
        return (
            <ListItem
                name={item.name}
                amount={item.amount}
                onClick={() => navigateToManageExpenses(item)}
                setAddNoteType={type => actionButtonsHandler(type as AddCategoryNoteType, item)} />
        )
    }

    return (
        <ContainerWithHeader>
            {/* <Text style={styles.nameHeading}>{`${translations.HI} ${userProfileData?.name || ""}!`}</Text> */}
            {/* <Spacer size={2} /> */}
            {/* <Divider /> */}
            {/* <Spacer size={7} /> */}
            <View style={styles.wrapper}>
                {categoriesList.length > 0 && (
                    <Flatlist
                        refreshing={refreshing}
                        onRefresh={() => getCategories(1)}
                        data={categoriesList}
                        renderItem={({ item }) => _renderItems(item)}
                        style={styles.listStyle}
                        keyExtractor={(item) => String(item?.id)}
                        contentContainerStyle={styles.listContainer}
                        onEndReachedThreshold={0.5}
                        maxToRenderPerBatch={20}
                        onEndReached={() => handlerLoadMore()}
                    />
                )}

                {!isLoading && categoriesList.length === 0 ? (
                    <View style={{
                        justifyContent: "center",
                        marginTop: 100
                    }}>
                        <Text style={styles.emptyText}>{translations.NO_CATEGORY_MESSAGE}</Text>
                    </View>
                ) : null}
            </View>
        </ContainerWithHeader>

    )
};

export default DashboardPage;