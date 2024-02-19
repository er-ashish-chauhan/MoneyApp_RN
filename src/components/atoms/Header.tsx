/**
 * @file Header.tsx
 * @author Ashish Chauhan
 */

import React from "react";
import { HStack, IconButton } from "native-base";
import Icon from "react-native-vector-icons/MaterialIcons";
import { BackButton } from ".";
import { colors } from '../../constants';
const Header: React.FC<{
    isShowHeader: boolean,
    navigateBack: () => void
}> = ({
    isShowHeader,
    navigateBack
}): JSX.Element => {
        return (
            <HStack
                px="1" py="2"
                justifyContent="space-between"
                alignItems="center" w="100%" >
                {isShowHeader ? (
                    <HStack px="1">
                        <BackButton
                            onPress={() => navigateBack()} />
                    </HStack>
                ) : (<HStack px="5" />)}
                <HStack alignItems="center" alignSelf="center">
                    <IconButton icon={<Icon name="attach-money"
                        color={colors.primaryColor} size={30} />} />
                </HStack>
                <HStack px="5" />
                {/* <HStack>
                <IconButton icon={<Icon name="logout" color={colors.danger} size={26} />} />
            </HStack> */}
            </HStack>
        )
    }

export default Header;