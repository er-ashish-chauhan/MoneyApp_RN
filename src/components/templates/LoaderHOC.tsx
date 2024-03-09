/**
 * @file LoaderHOC.tsx
 * @author Ashish Chauhan
 */

import React, { PropsWithChildren, memo } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useSelector } from 'react-redux';
import { colors } from '../../constants';
import { RootState } from '../../store/reducers';

const LoaderHOC: React.FC<PropsWithChildren> = ({
    children
}) => {
    const isLoading = useSelector((state: RootState) => state.login.loading);
    return (
        <>
            {children}
            {!!isLoading && <View style={{
                zIndex: 9999999, position: 'absolute', top: 0, bottom: 0, justifyContent: 'center', alignContent: 'center', left: 0, right: 0, backgroundColor:
                    'rgba(0,0,0,0.5)',
            }}>
                <ActivityIndicator color={colors.black} size='large' />
            </View>}
        </>
    )
};

export default memo(LoaderHOC);