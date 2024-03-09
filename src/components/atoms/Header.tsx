/**
 * @file Header.tsx
 * @author Ashish Chauhan
 */

import React from "react";
import { HStack, IconButton } from "native-base";
import Icon from "react-native-vector-icons/MaterialIcons";
import { BackButton } from ".";
import { colors } from '../../constants';
import { ImageButton } from "../molecules";
import assets from "../../assets";
const Header: React.FC<{
    isShowHeader: boolean,
    navigateBack: () => void,
    iconColor?: string
}> = ({
    isShowHeader,
    navigateBack,
    iconColor
}): JSX.Element => {
        return (
            <HStack
                px="1"
                style={{
                    paddingTop: 48,
                    paddingBottom: 10
                }}
                marginBottom={"-5"}
                bg={colors.primaryColor}
                justifyContent="space-between"
                alignItems="center" w="100%" >
                {isShowHeader ? (
                    <HStack px="1">
                        <BackButton
                            iconColor={iconColor}
                            onPress={() => navigateBack()} />
                    </HStack>
                ) : (<HStack px="5" />)}
                <HStack alignItems="center" alignSelf="center">
                    <ImageButton
                        onClick={() => { }}
                        imageSource={assets.images.moneyappicon}
                        imageStyle={{
                            width: 45,
                            height: 45,
                            borderRadius: 5
                        }}
                    />
                </HStack>
                <HStack px="5" />
                {/* <HStack>
                <IconButton icon={<Icon name="logout" color={colors.danger} size={26} />} />
            </HStack> */}
            </HStack>
        )
    }

export default Header;