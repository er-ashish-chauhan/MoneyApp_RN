/**
 * @file utility.ts
 */
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import { colors } from '../constants';

export const hitSlop = { top: 20, left: 20, right: 20, bottom: 20 };
export const hitSlopWithZeroLeftRight = { top: 20, left: 0, right: 0, bottom: 20 };

export const phoneNumberRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;

export const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

export const API_BASE_URL = __DEV__ ?
    "https://usemoneyapp.com" :
    "https://usemoneyapp.com";

//=========================================================================//

export const storeDataInStorage = async (key: string, data: string) => {
    try {
        await AsyncStorage.setItem(key, data);
    }
    catch (error) {
        console.log(error, "error from EncryptedStorage");
    }
};

export const getDataFromStorage = async (key: string) => {
    try {
        const jsonValue = await AsyncStorage.getItem(key);
        if (jsonValue) {
            return JSON.parse(jsonValue);
        }
        return false;
    }
    catch (e) {
        console.log("error from get storage " + e);
    }
};

export const clearStorage = async () => {
    try {
        await AsyncStorage.clear();
    }
    catch (error) {
        console.log("error from clear storage " + error);
    }
};

export const deleteDataInStorage = async (key: string) => {
    await AsyncStorage.removeItem(key)
};

export const showToast = (message: string, type: string) => {
    Toast.show({
        type: type,
        text1: message,
        position: "bottom",
        swipeable: true
    });
}

export const getAmount = (amount: string) => {
    let valueInt = amount.trim().length > 0 ? parseInt(amount) : 0;
    if (valueInt) {
        const result = valueInt > 0 ? `$${parseInt(amount).toLocaleString()}` : `-$${Math.abs(valueInt).toLocaleString()}`;
        return String(result)
    }
    return `$${valueInt}`
}

export const getColorByAmount = (amount: string): string => {
    let valueInt = amount.trim().length > 0 ? parseInt(amount) : 0;
    if (valueInt) {
        return valueInt >= 0 ? colors.primaryColor : colors.danger;
    }
    return colors.primaryColor;
}