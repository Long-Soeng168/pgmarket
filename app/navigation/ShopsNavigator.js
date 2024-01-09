import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FavoriteScreen from "../screens/FavoriteScreen";
import ProductDetailScreen from "../screens/ProductDetailScreen";
import AllCategoryScreen from "../screens/AllCategoryScreen";
import ShopScreen from "../screens/ShopScreen";
import ProductsByBrandScreen from "../screens/ProductsByBrandScreen";

const Stack = createNativeStackNavigator();

export default function ShopsNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="ShopsByCategory"
                component={AllCategoryScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="ShopScreen"
                component={ShopScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="ProductDetailScreen"
                options={{ 
                    title: "Product Detail", 
                    headerTitleAlign: "center" ,
                    headerTitleStyle: {color: "tomato"},
                }}

                component={ProductDetailScreen}
            />
            <Stack.Screen
                name="ProductsByBrandScreen"
                component={ProductsByBrandScreen}
                options={{
                    // headerShown: false
                    title: "Products",
                    headerTitleStyle: {color: "tomato"},
                    headerTitleAlign: "center",
                }}
            />
        </Stack.Navigator>
    );
}
