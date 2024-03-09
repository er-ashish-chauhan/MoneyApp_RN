/**
 * @file AddCategoryForm.tsx
 * @author Ashish Chauhan
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import translations from '../../locals';
import InputField from '../molecules/InputField';
import { normalize } from '../../utils/normalizeHeightwidth';
import { Text, Spacer, Button } from '../atoms';
import constants, { colors } from '../../constants';
import assets from '../../assets';

const AddCategoryForm = ({
    onSubmit,
    setCategoryValue,
    category,
    categoryValidationError,
}: {
    onSubmit: () => void
    setCategoryValue: (val: string) => void,
    category: string,
    categoryValidationError: string,
}): JSX.Element => {

    return (
        <View style={styles.container}>
            <Text style={styles.headingText}>{translations.NEW_CATEGORY}</Text>
            <Spacer size={10} />
            <View style={{}}>
                <Text style={[styles.exampletextStyle, {
                }]}><Text style={[{
                    fontFamily: assets.fonts.MEDIUM
                }]}>{`${translations.EXAMPLE}: `}</Text>
                    {translations.CATEGORY_EXAMPLE}</Text>
            </View>
            <Spacer size={20} />
            <InputField
                onChangeHandler={text => setCategoryValue(String(text))}
                placeholder={translations.CATEGORY_PLACEHOLDER}
                value={category}
                label={translations.CATEGORY}
                isError={categoryValidationError}
            />
            <Spacer size={30} />
            <Button
                onPress={onSubmit}>
                <Text style={styles.buttonText}>{translations.ADD_CATEGORY}</Text>
            </Button>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: normalize(10),
    },
    flexRow: {
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "flex-start",
    },
    buttonText: {
        color: colors.white,
        fontSize: normalize(16),
        fontFamily: assets.fonts.SEMI_BOLD
    },
    exampletextStyle: {
        fontSize: normalize(12),
    },
    singupText: {
        textAlign: "center",
        fontSize: normalize(11)
    },
    headingText: {
        fontSize: normalize(19),
        fontFamily: assets.fonts.MEDIUM
    }
});

export default AddCategoryForm;