/**
 * @file tabnavigator.tsx
 * @description Manages the bottom tabs of the app 
 * @author Ashish Chauhan
 */

import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import DashboardPage from "../components/pages/dashboardPage";
import { Routes } from "../constants/types";
import AddCategoryPage from "../components/pages/addCategoryPage";
import SettingsPage from "../components/pages/settingsPage";
import TabBar from "./tabBar";

const Tab = createBottomTabNavigator();
const TabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false
            }}
            initialRouteName={Routes.HOME}
            tabBar={props => <TabBar {...props} />}>
            <Tab.Screen name={Routes.ADD_CATEGORY} component={AddCategoryPage} />
            <Tab.Screen name={Routes.HOME} component={DashboardPage} />
            <Tab.Screen name={Routes.SETTINGS} component={SettingsPage} />
        </Tab.Navigator>
    )
}

export default TabNavigator;