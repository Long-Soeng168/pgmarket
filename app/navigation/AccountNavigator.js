import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AccountScreen from "../screens/AccountScreen";
import LoginScreen from "../screens/LoginScreen";

const Stack = createNativeStackNavigator();

export default function HomeNavigator() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="AccountScreen" component={AccountScreen} />
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
        </Stack.Navigator>
    );
}
