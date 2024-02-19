import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginPage from '../components/pages/loginPage';
import SignupPage from '../components/pages/signupPage';
import { RootStackParamList, Routes } from '../constants/types';
import ForgotPassword from '../components/pages/forgotPasswordPage';
import TabNavigator from './tabnavigator';
import ManageExpensesPage from '../components/pages/manageExpensesPage';
import { useSelector } from 'react-redux';
import { RootState } from '../store/reducers';
import ChangePassword from '../components/pages/changePasswordPage';

const Stack = createNativeStackNavigator<RootStackParamList>();

const StackNavigator = () => {

  const isAuthenticated = useSelector((state: RootState) => state.login.isAuthenticated);

  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerLargeTitle: true,
        headerShown: false
      }}>
      {!isAuthenticated ? (
        <>
          <Stack.Screen name={Routes.LOGIN} component={LoginPage} />
          <Stack.Screen name={Routes.SIGNUP} component={SignupPage} />
          <Stack.Screen name={Routes.FORGOT_PASSWORD} component={ForgotPassword} />
        </>
      ) : (
        <>
          <Stack.Screen name={Routes.DASHBOARD} component={TabNavigator} />
          <Stack.Screen name={Routes.MANAGE_EXPENSES} component={ManageExpensesPage} />
          <Stack.Screen name={Routes.CHANGE_PASSWORD} component={ChangePassword} />
        </>
      )}
    </Stack.Navigator>
  )
}

export default StackNavigator;