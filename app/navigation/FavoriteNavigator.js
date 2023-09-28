import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FavoriteScreen from "../screens/FavoriteScreen";
import ProductDetailScreen from "../screens/ProductDetailScreen";

const Stack = createNativeStackNavigator();

export default function HomeNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="FavoriteScreen" component={FavoriteScreen} />
            <Stack.Screen
                name="ProductDetailScreen"
                component={ProductDetailScreen}
            />
        </Stack.Navigator>
    );
}
