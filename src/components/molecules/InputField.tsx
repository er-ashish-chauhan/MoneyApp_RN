import React from 'react';
import { View, StyleSheet } from 'react-native';
import { FieldProps } from '../../constants/types';
import TextInput from '../atoms/TextInput';
import Label from '../atoms/Label';

const InputField = ({
    label,
    onChangeHandler,
    value
}: FieldProps): JSX.Element => {
    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <Label>{label}</Label>
                <TextInput
                    onChangeText={onChangeHandler}
                    placeholder=''
                    value={value}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});

export default InputField;