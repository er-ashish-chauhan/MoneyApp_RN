/**
 * @file Flatlist.tsx
 * @author Ashish Chauhan
 */

import React, { memo } from "react";
import {
    FlatListProps,
    FlatList as RNFlatList
} from "react-native";
import { CategoryItems, CategoryPayInfoItem } from "../../constants/types";

const FlatList : React.FC<FlatListProps<CategoryItems | CategoryPayInfoItem>> = ({
    data,
    renderItem,
    refreshing,
    ...rest
}) : JSX.Element => {
    return (
        <RNFlatList 
            data={data}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            refreshing={refreshing}
            initialNumToRender={2}
            maxToRenderPerBatch={2}
            {...rest}
        />
    )
}

export default memo(FlatList);