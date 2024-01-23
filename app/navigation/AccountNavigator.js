import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AccountScreen from "../screens/AccountScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import ProfileScreen from "../screens/ProfileScreen";
import PurchaseHistoryScreen from "../screens/PurchaseHistoryScreen";
import AccountDetailScreen from "../screens/AccountDetailScreen";
import ShopProfile from "../screens/ShopProfile";
import AddProductScreen from "../screens/AddProductScreen";

const Stack = createNativeStackNavigator();

export default function HomeNavigator() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="AccountScreen" component={AccountScreen} />
            <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
            <Stack.Screen name="PurchaseHistoryScreen" component={PurchaseHistoryScreen} />
            <Stack.Screen name="AccountDetailScreen" component={AccountDetailScreen} />
            <Stack.Screen name="ShopProfile" component={ShopProfile} />
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
            <Stack.Screen name="AddProductScreen" component={AddProductScreen} />
        </Stack.Navigator>
    );
}
